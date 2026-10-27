const express = require('express');
const router = express.Router();
const {
  clockIn,
  clockOut,
  getTodayAttendance,
  getMyHistory,
  getTeamAttendance,
  getAllAttendance,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/clock-in', protect, clockIn);
router.post('/clock-out', protect, clockOut);
router.get('/today', protect, getTodayAttendance);
router.get('/my-history', protect, getMyHistory);
router.get('/team', protect, authorize('manager', 'hr'), getTeamAttendance);
router.get('/all', protect, authorize('hr'), getAllAttendance);

module.exports = router;
