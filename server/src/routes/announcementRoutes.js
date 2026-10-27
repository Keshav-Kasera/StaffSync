const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getAnnouncements);
router.post('/', protect, authorize('hr'), createAnnouncement);
router.put('/:id', protect, authorize('hr'), updateAnnouncement);
router.delete('/:id', protect, authorize('hr'), deleteAnnouncement);

module.exports = router;
