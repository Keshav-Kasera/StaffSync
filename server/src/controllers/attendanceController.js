const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');

// Helper to get local date string YYYY-MM-DD
const getTodayDateString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// @desc    Clock-in for today
// @route   POST /api/attendance/clock-in
// @access  Private (Employee, Manager, HR)
const clockIn = async (req, res) => {
  try {
    const today = getTodayDateString();

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(400).json({ success: false, message: 'Employee profile not found' });
    }

    // Check if already clocked in today
    let record = await Attendance.findOne({ employee: employee._id, date: today });
    if (record) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked in for today',
        attendance: record,
      });
    }

    // Determine status (e.g. if after 9:30 AM mark Late)
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    let status = 'Present';
    if (hours > 9 || (hours === 9 && minutes > 30)) {
      status = 'Late';
    }

    record = await Attendance.create({
      user: req.user._id,
      employee: employee._id,
      date: today,
      clockIn: now,
      status,
      notes: req.body.notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Clocked in successfully',
      attendance: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clock-out for today
// @route   POST /api/attendance/clock-out
// @access  Private
const clockOut = async (req, res) => {
  try {
    const today = getTodayDateString();

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(400).json({ success: false, message: 'Employee profile not found' });
    }

    const record = await Attendance.findOne({ employee: employee._id, date: today });
    if (!record) {
      return res.status(400).json({ success: false, message: 'No clock-in record found for today' });
    }

    if (record.clockOut) {
      return res.status(400).json({ success: false, message: 'Already clocked out for today', attendance: record });
    }

    const clockOutTime = new Date();
    record.clockOut = clockOutTime;

    // Calculate total hours
    const diffMs = clockOutTime - new Date(record.clockIn);
    const totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10;
    record.totalHours = totalHours;

    if (totalHours < 4 && record.status !== 'Absent') {
      record.status = 'Half-day';
    }

    await record.save();

    res.json({
      success: true,
      message: 'Clocked out successfully',
      attendance: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get today's attendance status for logged-in user
// @route   GET /api/attendance/today
// @access  Private
const getTodayAttendance = async (req, res) => {
  try {
    const today = getTodayDateString();
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.json({ success: true, attendance: null });
    }

    const record = await Attendance.findOne({ employee: employee._id, date: today });
    res.json({ success: true, attendance: record || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get attendance history for logged-in user
// @route   GET /api/attendance/my-history
// @access  Private
const getMyHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.json({ success: true, records: [], total: 0 });
    }

    const total = await Attendance.countDocuments({ employee: employee._id });
    const records = await Attendance.find({ employee: employee._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      records,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get team attendance (Manager only)
// @route   GET /api/attendance/team
// @access  Private (Manager, HR)
const getTeamAttendance = async (req, res) => {
  try {
    const manager = await Manager.findOne({ user: req.user._id });
    let teamMemberIds = [];

    if (manager && manager.teamMembers.length > 0) {
      teamMemberIds = manager.teamMembers;
    } else {
      // Find all employees reporting to this manager
      const teamEmployees = await Employee.find({ reportingManager: manager ? manager._id : null });
      teamMemberIds = teamEmployees.map((e) => e._id);
    }

    const records = await Attendance.find({ employee: { $in: teamMemberIds } })
      .populate('user', 'name email')
      .populate('employee', 'employeeId department designation')
      .sort({ date: -1 })
      .limit(50);

    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all organization attendance records (HR only)
// @route   GET /api/attendance/all
// @access  Private (HR)
const getAllAttendance = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.status) filter.status = req.query.status;

    const total = await Attendance.countDocuments(filter);
    const records = await Attendance.find(filter)
      .populate('user', 'name email')
      .populate('employee', 'employeeId department designation')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      records,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getTodayAttendance,
  getMyHistory,
  getTeamAttendance,
  getAllAttendance,
};
