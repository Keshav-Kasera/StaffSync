const User = require('../models/User');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Announcement = require('../models/Announcement');
const Training = require('../models/Training');

const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

// @desc    Get role-specific dashboard metrics & summary
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = async (req, res) => {
  try {
    const today = getTodayDateString();
    const role = req.user.role;

    // Common data
    const announcements = await Announcement.find()
      .populate('author', 'name role')
      .sort({ pinned: -1, createdAt: -1 })
      .limit(5);

    if (role === 'hr') {
      const totalEmployees = await Employee.countDocuments();
      const totalManagers = await Manager.countDocuments();
      const pendingLeavesCount = await Leave.countDocuments({ status: 'Pending' });

      // Today's attendance numbers
      const todayPresent = await Attendance.countDocuments({
        date: today,
        status: { $in: ['Present', 'Late'] },
      });
      const attendanceRate = totalEmployees > 0 ? Math.round((todayPresent / totalEmployees) * 100) : 0;

      // Department breakdown
      const departmentStats = await Employee.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      // Recent 5 leave requests
      const recentLeaves = await Leave.find()
        .populate('user', 'name email')
        .populate('employee', 'employeeId department')
        .sort({ createdAt: -1 })
        .limit(5);

      return res.json({
        success: true,
        role: 'hr',
        metrics: {
          totalEmployees,
          totalManagers,
          pendingLeavesCount,
          todayPresent,
          attendanceRate,
          departmentStats,
        },
        recentLeaves,
        announcements,
      });
    }

    if (role === 'manager') {
      const manager = await Manager.findOne({ user: req.user._id });
      let teamMemberIds = [];

      if (manager && manager.teamMembers.length > 0) {
        teamMemberIds = manager.teamMembers;
      } else {
        const teamEmployees = await Employee.find({ reportingManager: manager ? manager._id : null });
        teamMemberIds = teamEmployees.map((e) => e._id);
      }

      const teamCount = teamMemberIds.length;
      const pendingLeavesCount = await Leave.countDocuments({
        employee: { $in: teamMemberIds },
        status: 'Pending',
      });

      const todayTeamPresent = await Attendance.countDocuments({
        date: today,
        employee: { $in: teamMemberIds },
        status: { $in: ['Present', 'Late'] },
      });

      const recentTeamLeaves = await Leave.find({ employee: { $in: teamMemberIds } })
        .populate('user', 'name')
        .populate('employee', 'employeeId designation')
        .sort({ createdAt: -1 })
        .limit(5);

      const activeTrainings = await Training.countDocuments({ assignedBy: req.user._id });

      return res.json({
        success: true,
        role: 'manager',
        metrics: {
          teamCount,
          todayTeamPresent,
          pendingLeavesCount,
          activeTrainings,
        },
        recentTeamLeaves,
        announcements,
      });
    }

    // Default: Employee
    const employee = await Employee.findOne({ user: req.user._id });
    const todayAttendance = await Attendance.findOne({
      employee: employee ? employee._id : null,
      date: today,
    });

    // Attendance stats for current month
    const startOfMonth = today.substring(0, 7) + '-01';
    const monthPresentCount = await Attendance.countDocuments({
      employee: employee ? employee._id : null,
      date: { $gte: startOfMonth },
      status: { $in: ['Present', 'Late'] },
    });

    const myRecentLeaves = await Leave.find({ employee: employee ? employee._id : null })
      .sort({ createdAt: -1 })
      .limit(5);

    const pendingLeavesCount = await Leave.countDocuments({
      employee: employee ? employee._id : null,
      status: 'Pending',
    });

    return res.json({
      success: true,
      role: 'employee',
      metrics: {
        todayAttendance: todayAttendance ? todayAttendance.status : 'Not Clocked In',
        isClockedIn: !!todayAttendance,
        isClockedOut: todayAttendance ? !!todayAttendance.clockOut : false,
        monthPresentCount,
        pendingLeavesCount,
        leaveBalance: employee ? employee.leaveBalance : { casual: 0, sick: 0, earned: 0 },
      },
      todayAttendanceRecord: todayAttendance,
      recentLeaves: myRecentLeaves,
      announcements,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardSummary };
