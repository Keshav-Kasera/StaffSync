const Training = require('../models/Training');
const Employee = require('../models/Employee');
const Notification = require('../models/Notification');

// @desc    Get training programs
// @route   GET /api/trainings
// @access  Private
const getTrainings = async (req, res) => {
  try {
    let trainings;

    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ user: req.user._id });
      // Find trainings where employee is enrolled or all available trainings
      trainings = await Training.find({
        $or: [
          { 'enrolledEmployees.employee': employee ? employee._id : null },
          { enrolledEmployees: { $size: 0 } }, // Open to all
        ],
      }).populate('assignedBy', 'name role');
    } else {
      trainings = await Training.find()
        .populate('assignedBy', 'name role')
        .populate('enrolledEmployees.employee')
        .populate('enrolledEmployees.user', 'name email');
    }

    res.json({ success: true, trainings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a training program
// @route   POST /api/trainings
// @access  Private (Manager, HR)
const createTraining = async (req, res) => {
  try {
    const { title, description, category, duration, materialsUrl, employeeIds } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    let enrolled = [];
    if (employeeIds && Array.isArray(employeeIds) && employeeIds.length > 0) {
      const employees = await Employee.find({ _id: { $in: employeeIds } }).populate('user');
      enrolled = employees.map((emp) => ({
        employee: emp._id,
        user: emp.user._id,
        status: 'Not Started',
        progressPercentage: 0,
      }));
    }

    const training = await Training.create({
      title,
      description,
      category: category || 'General Skills',
      duration: duration || '2 Weeks',
      materialsUrl: materialsUrl || '',
      assignedBy: req.user._id,
      enrolledEmployees: enrolled,
    });

    // Notify enrolled employees
    if (enrolled.length > 0) {
      const notificationDocs = enrolled.map((e) => ({
        recipient: e.user,
        sender: req.user._id,
        title: 'New Training Assigned',
        message: `You have been enrolled in the training program: "${title}".`,
        type: 'training_assigned',
        link: '/training',
      }));
      await Notification.insertMany(notificationDocs);
    }

    res.status(201).json({
      success: true,
      message: 'Training program created successfully',
      training,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update employee training progress
// @route   PUT /api/trainings/:id/progress
// @access  Private (Employee)
const updateProgress = async (req, res) => {
  try {
    const { progressPercentage, status } = req.body;
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ success: false, message: 'Training not found' });
    }

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(400).json({ success: false, message: 'Employee record not found' });
    }

    // Find enrollment entry
    let enrollment = training.enrolledEmployees.find(
      (e) => e.employee && e.employee.toString() === employee._id.toString()
    );

    if (!enrollment) {
      // Auto-enroll if open training
      training.enrolledEmployees.push({
        employee: employee._id,
        user: req.user._id,
        status: status || 'In Progress',
        progressPercentage: progressPercentage || 0,
      });
      enrollment = training.enrolledEmployees[training.enrolledEmployees.length - 1];
    } else {
      if (progressPercentage !== undefined) enrollment.progressPercentage = progressPercentage;
      if (status) enrollment.status = status;
      if (progressPercentage === 100 || status === 'Completed') {
        enrollment.status = 'Completed';
        enrollment.progressPercentage = 100;
        enrollment.completionDate = new Date();
      }
    }

    await training.save();

    res.json({
      success: true,
      message: 'Training progress updated successfully',
      training,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTrainings,
  createTraining,
  updateProgress,
};
