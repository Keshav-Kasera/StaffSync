const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getPendingLeaves,
  updateLeaveStatus,
  getAllLeaves,
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, applyLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/pending', protect, authorize('manager', 'hr'), getPendingLeaves);
router.put('/:id/status', protect, authorize('manager', 'hr'), updateLeaveStatus);
router.get('/all', protect, authorize('hr'), getAllLeaves);

module.exports = router;
