const Employee = require('../models/Employee');
const User = require('../models/User');
const Manager = require('../models/Manager');
const Attendance = require('../models/Attendance');

// @desc    Get all employees with pagination & search
// @route   GET /api/employees
// @access  Private (Manager, HR)
const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.department) filter.department = req.query.department;

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      const matchingUsers = await User.find({
        $or: [{ name: searchRegex }, { email: searchRegex }],
      }).select('_id');
      filter.$or = [
        { user: { $in: matchingUsers.map((u) => u._id) } },
        { employeeId: searchRegex },
        { designation: searchRegex },
      ];
    }

    const total = await Employee.countDocuments(filter);
    const employees = await Employee.find(filter)
      .populate('user', 'name email role status')
      .populate('reportingManager')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      employees,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single employee details
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('user', 'name email role status')
      .populate('reportingManager');

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Recent 10 attendance records
    const recentAttendance = await Attendance.find({ employee: employee._id })
      .sort({ date: -1 })
      .limit(10);

    res.json({
      success: true,
      employee,
      recentAttendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new employee (HR only)
// @route   POST /api/employees
// @access  Private (HR)
const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, designation, phone, address, managerId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const user = await User.create({
      name,
      email,
      password: password || 'Welcome123!',
      role: 'employee',
    });

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const employee = await Employee.create({
      user: user._id,
      employeeId: `EMP-${randomNum}`,
      department: department || 'General',
      designation: designation || 'Associate',
      phone: phone || '',
      address: address || '',
      reportingManager: managerId || null,
    });

    user.employeeProfile = employee._id;
    await user.save();

    // If manager assigned, add to manager's teamMembers
    if (managerId) {
      await Manager.findByIdAndUpdate(managerId, {
        $addToSet: { teamMembers: employee._id },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update employee info (HR only)
// @route   PUT /api/employees/:id
// @access  Private (HR)
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const { department, designation, phone, address, status, reportingManager, salary } = req.body;

    if (department) employee.department = department;
    if (designation) employee.designation = designation;
    if (phone !== undefined) employee.phone = phone;
    if (address !== undefined) employee.address = address;
    if (reportingManager !== undefined) employee.reportingManager = reportingManager;
    if (salary !== undefined) employee.salary = salary;

    await employee.save();

    if (status && employee.user) {
      await User.findByIdAndUpdate(employee.user, { status });
    }

    const updated = await Employee.findById(employee._id)
      .populate('user', 'name email role status')
      .populate('reportingManager');

    res.json({
      success: true,
      message: 'Employee updated successfully',
      employee: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update employee performance review (Manager & HR)
// @route   PUT /api/employees/:id/performance
// @access  Private (Manager, HR)
const updatePerformance = async (req, res) => {
  try {
    const { performanceRating, performanceNotes } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (performanceRating) employee.performanceRating = performanceRating;
    if (performanceNotes) employee.performanceNotes = performanceNotes;

    await employee.save();

    res.json({
      success: true,
      message: 'Performance review updated successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Deactivate employee (HR only)
// @route   DELETE /api/employees/:id
// @access  Private (HR)
const deactivateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    await User.findByIdAndUpdate(employee.user, { status: 'inactive' });

    res.json({
      success: true,
      message: 'Employee deactivated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all managers list for dropdown assignment
// @route   GET /api/employees/managers-list
// @access  Private (HR)
const getManagersList = async (req, res) => {
  try {
    const managers = await Manager.find().populate('user', 'name email');
    res.json({ success: true, managers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updatePerformance,
  deactivateEmployee,
  getManagersList,
};
