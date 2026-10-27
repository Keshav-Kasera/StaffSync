const User = require('../models/User');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, designation, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Default role to employee if not provided or invalid
    const assignedRole = ['employee', 'manager', 'hr'].includes(role) ? role : 'employee';

    // Create base user record
    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
    });

    // Auto-generate employee or manager profile
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    if (assignedRole === 'manager') {
      const manager = await Manager.create({
        user: user._id,
        managerId: `MGR-${randomNum}`,
        department: department || 'General Management',
        phone: phone || '',
      });
      user.managerProfile = manager._id;
      await user.save();
    } else {
      // Both employee and HR get an employee profile
      const employee = await Employee.create({
        user: user._id,
        employeeId: `EMP-${randomNum}`,
        department: department || (assignedRole === 'hr' ? 'Human Resources' : 'General'),
        designation: designation || (assignedRole === 'hr' ? 'HR Specialist' : 'Associate'),
        phone: phone || '',
      });
      user.employeeProfile = employee._id;
      await user.save();
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeProfile: user.employeeProfile,
        managerProfile: user.managerProfile,
      },
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email }).select('+password')
      .populate('employeeProfile')
      .populate('managerProfile');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated. Please contact HR.' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeProfile: user.employeeProfile,
        managerProfile: user.managerProfile,
      },
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('employeeProfile')
      .populate('managerProfile');

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update personal user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.body.name) user.name = req.body.name;
    await user.save();

    if (user.employeeProfile) {
      const employee = await Employee.findById(user.employeeProfile);
      if (employee) {
        if (req.body.phone !== undefined) employee.phone = req.body.phone;
        if (req.body.address !== undefined) employee.address = req.body.address;
        if (req.body.skills && Array.isArray(req.body.skills)) employee.skills = req.body.skills;
        await employee.save();
      }
    }

    const updatedUser = await User.findById(user._id)
      .populate('employeeProfile')
      .populate('managerProfile');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, updateProfile };
