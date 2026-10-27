const Announcement = require('../models/Announcement');
const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Private (All roles)
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('author', 'name role')
      .sort({ pinned: -1, createdAt: -1 });

    res.json({ success: true, announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new announcement (HR only)
// @route   POST /api/announcements
// @access  Private (HR)
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, priority, pinned, targetAudience } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const announcement = await Announcement.create({
      title,
      content,
      category: category || 'General',
      priority: priority || 'Medium',
      pinned: pinned || false,
      targetAudience: targetAudience || 'All',
      author: req.user._id,
    });

    // Broadcast notification to all active users
    const users = await User.find({ status: 'active', _id: { $ne: req.user._id } });
    const notificationDocs = users.map((u) => ({
      recipient: u._id,
      sender: req.user._id,
      title: `Company Announcement: ${title}`,
      message: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      type: 'announcement',
      link: '/announcements',
    }));

    if (notificationDocs.length > 0) {
      await Notification.insertMany(notificationDocs);
    }

    res.status(201).json({
      success: true,
      message: 'Announcement published successfully',
      announcement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update announcement (HR only)
// @route   PUT /api/announcements/:id
// @access  Private (HR)
const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    const { title, content, category, priority, pinned } = req.body;
    if (title) announcement.title = title;
    if (content) announcement.content = content;
    if (category) announcement.category = category;
    if (priority) announcement.priority = priority;
    if (pinned !== undefined) announcement.pinned = pinned;

    await announcement.save();

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      announcement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete announcement (HR only)
// @route   DELETE /api/announcements/:id
// @access  Private (HR)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await announcement.deleteOne();

    res.json({ success: true, message: 'Announcement removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
