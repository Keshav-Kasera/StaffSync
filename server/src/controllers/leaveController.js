const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Notification = require('../models/Notification');

// @desc    Apply for a leave
// @route   POST /api/leaves
// @access  Private (Employee, Manager, HR)
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(400).json({ success: false, message: 'Employee profile not found' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({ success: false, message: 'End date cannot be earlier than start date' });
    }

    // Calculate business/calendar days
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Check balance if applicable
    const typeKey = leaveType.toLowerCase();
    if (employee.leaveBalance && employee.leaveBalance[typeKey] !== undefined) {
      if (employee.leaveBalance[typeKey] < diffDays) {
        return res.status(400).json({
          success: false,
          message: `Insufficient ${leaveType} leave balance. Available: ${employee.leaveBalance[typeKey]} days, requested: ${diffDays} days.`,
        });
      }
    }

    const leave = await Leave.create({
      user: req.user._id,
      employee: employee._id,
      leaveType,
      startDate: start,
      endDate: end,
      totalDays: diffDays,
      reason,
      status: 'Pending',
    });

    // Notify Manager or HR
    if (employee.reportingManager) {
      const manager = await Manager.findById(employee.reportingManager);
      if (manager) {
        await Notification.create({
          recipient: manager.user,
          sender: req.user._id,
          title: 'New Leave Request',
          message: `${req.user.name} submitted a ${leaveType} leave request for ${diffDays} days.`,
          type: 'leave_request',
          link: '/leaves',
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      leave,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my leave history
// @route   GET /api/leaves/my-leaves
// @access  Private
const getMyLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.json({ success: true, leaves: [], leaveBalance: {} });
    }

    const leaves = await Leave.find({ employee: employee._id })
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      leaves,
      leaveBalance: employee.leaveBalance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get pending leaves for Manager / HR review
// @route   GET /api/leaves/pending
// @access  Private (Manager, HR)
const getPendingLeaves = async (req, res) => {
  try {
    let query = { status: 'Pending' };

    if (req.user.role === 'manager') {
      const manager = await Manager.findOne({ user: req.user._id });
      if (manager && manager.teamMembers.length > 0) {
        query.employee = { $in: manager.teamMembers };
      } else {
        const teamEmployees = await Employee.find({ reportingManager: manager ? manager._id : null });
        query.employee = { $in: teamEmployees.map((e) => e._id) };
      }
    }

    const pendingLeaves = await Leave.find(query)
      .populate('user', 'name email')
      .populate('employee', 'employeeId department designation')
      .sort({ createdAt: -1 });

    res.json({ success: true, leaves: pendingLeaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or Reject leave request
// @route   PUT /api/leaves/:id/status
// @access  Private (Manager, HR)
const updateLeaveStatus = async (req, res) => {
  try {
    const { status, reviewComment } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be Approved or Rejected' });
    }

    const leave = await Leave.findById(req.params.id)
      .populate('user', 'name email')
      .populate('employee');

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Leave request has already been ${leave.status.toLowerCase()}`,
      });
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    leave.reviewComment = reviewComment || '';
    leave.reviewDate = new Date();
    await leave.save();

    // Deduct leave balance if approved
    if (status === 'Approved' && leave.employee) {
      const employee = await Employee.findById(leave.employee._id);
      const typeKey = leave.leaveType.toLowerCase();
      if (employee && employee.leaveBalance && employee.leaveBalance[typeKey] !== undefined) {
        employee.leaveBalance[typeKey] = Math.max(0, employee.leaveBalance[typeKey] - leave.totalDays);
        await employee.save();
      }
    }

    // Send notification to the employee
    await Notification.create({
      recipient: leave.user._id,
      sender: req.user._id,
      title: `Leave Request ${status}`,
      message: `Your ${leave.leaveType} leave request for ${leave.totalDays} day(s) was ${status.toLowerCase()} by ${req.user.name}.`,
      type: 'leave_update',
      link: '/leaves',
    });

    res.json({
      success: true,
      message: `Leave request marked as ${status}`,
      leave,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all leave requests across organization (HR only)
// @route   GET /api/leaves/all
// @access  Private (HR)
const getAllLeaves = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.leaveType) filter.leaveType = req.query.leaveType;

    const total = await Leave.countDocuments(filter);
    const leaves = await Leave.find(filter)
      .populate('user', 'name email')
      .populate('employee', 'employeeId department designation')
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      leaves,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getPendingLeaves,
  updateLeaveStatus,
  getAllLeaves,
};
