const express = require('express');
const router = express.Router();
const {
  getTrainings,
  createTraining,
  updateProgress,
} = require('../controllers/trainingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getTrainings);
router.post('/', protect, authorize('manager', 'hr'), createTraining);
router.put('/:id/progress', protect, updateProgress);

module.exports = router;
