require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Announcement = require('../models/Announcement');
const Training = require('../models/Training');
const Notification = require('../models/Notification');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB Atlas...');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Manager.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Announcement.deleteMany({});
    await Training.deleteMany({});
    await Notification.deleteMany({});
    console.log('[Seed] Cleared existing data.');

    const password = 'Password123!';

    // 1. Create HR Admin User
    const hrUser = await User.create({
      name: 'Elena Vance (HR Director)',
      email: 'hr@staffsync.com',
      password,
      role: 'hr',
      status: 'active',
    });

    const hrEmp = await Employee.create({
      user: hrUser._id,
      employeeId: 'EMP-1001',
      department: 'Human Resources',
      designation: 'HR Director',
      phone: '+1-555-0101',
      address: 'Suite 400, Corporate Tower',
      leaveBalance: { casual: 15, sick: 12, earned: 20 },
    });
    hrUser.employeeProfile = hrEmp._id;
    await hrUser.save();

    // 2. Create Manager User
    const mgrUser = await User.create({
      name: 'Marcus Brody (Engineering Lead)',
      email: 'manager@staffsync.com',
      password,
      role: 'manager',
      status: 'active',
    });

    const manager = await Manager.create({
      user: mgrUser._id,
      managerId: 'MGR-2001',
      department: 'Engineering',
      phone: '+1-555-0102',
    });
    mgrUser.managerProfile = manager._id;
    await mgrUser.save();

    // 3. Create Employee 1
    const empUser1 = await User.create({
      name: 'Alex Rivera',
      email: 'employee@staffsync.com',
      password,
      role: 'employee',
      status: 'active',
    });

    const emp1 = await Employee.create({
      user: empUser1._id,
      employeeId: 'EMP-3001',
      department: 'Engineering',
      designation: 'Senior Frontend Developer',
      phone: '+1-555-0103',
      address: '42 Silicon Boulevard',
      reportingManager: manager._id,
      leaveBalance: { casual: 10, sick: 8, earned: 14 },
      skills: ['React', 'JavaScript', 'CSS', 'Redux'],
    });
    empUser1.employeeProfile = emp1._id;
    await empUser1.save();

    // 4. Create Employee 2
    const empUser2 = await User.create({
      name: 'Sarah Chen',
      email: 'sarah.chen@staffsync.com',
      password,
      role: 'employee',
      status: 'active',
    });

    const emp2 = await Employee.create({
      user: empUser2._id,
      employeeId: 'EMP-3002',
      department: 'Engineering',
      designation: 'Backend Architect',
      phone: '+1-555-0104',
      address: '88 Tech Park Drive',
      reportingManager: manager._id,
      leaveBalance: { casual: 12, sick: 10, earned: 15 },
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    });
    empUser2.employeeProfile = emp2._id;
    await empUser2.save();

    // Update manager's team
    manager.teamMembers = [emp1._id, emp2._id];
    await manager.save();

    // 5. Seed Announcements
    await Announcement.create([
      {
        title: 'Welcome to StaffSync Platform v1.0',
        content: 'We are thrilled to roll out our centralized Human Resource Management System. Check attendance, manage your leaves, and view your trainings in real-time.',
        category: 'Company News',
        priority: 'High',
        author: hrUser._id,
        pinned: true,
      },
      {
        title: 'Upcoming Annual Company Retreat 2026',
        content: 'The annual summit will be held next month. Please ensure all pending quarter reviews and training modules are completed by Friday.',
        category: 'Event',
        priority: 'Medium',
        author: hrUser._id,
        pinned: false,
      },
    ]);

    // 6. Seed Attendance
    const today = new Date().toISOString().split('T')[0];
    await Attendance.create([
      {
        user: empUser1._id,
        employee: emp1._id,
        date: today,
        clockIn: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        status: 'Present',
        notes: 'In-office workstation 3B',
      },
      {
        user: empUser2._id,
        employee: emp2._id,
        date: today,
        clockIn: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
        status: 'Present',
        notes: 'Remote connection',
      },
    ]);

    // 7. Seed Leaves
    await Leave.create([
      {
        user: empUser1._id,
        employee: emp1._id,
        leaveType: 'Casual',
        startDate: new Date(Date.now() + 86400000 * 3), // in 3 days
        endDate: new Date(Date.now() + 86400000 * 5),
        totalDays: 3,
        reason: 'Attending family reunion out of state',
        status: 'Pending',
      },
      {
        user: empUser2._id,
        employee: emp2._id,
        leaveType: 'Sick',
        startDate: new Date(Date.now() - 86400000 * 10),
        endDate: new Date(Date.now() - 86400000 * 9),
        totalDays: 2,
        reason: 'Seasonal flu recovery',
        status: 'Approved',
        reviewedBy: mgrUser._id,
        reviewComment: 'Approved. Rest well and get healthy.',
        reviewDate: new Date(Date.now() - 86400000 * 10),
      },
    ]);

    // 8. Seed Trainings
    await Training.create([
      {
        title: 'Cloud Security Best Practices & OWASP 2026',
        description: 'Comprehensive overview of secure API engineering, JWT storage protocols, and protecting cloud deployments.',
        category: 'Security & Compliance',
        duration: '3 Weeks',
        assignedBy: hrUser._id,
        enrolledEmployees: [
          { employee: emp1._id, user: empUser1._id, status: 'In Progress', progressPercentage: 65 },
          { employee: emp2._id, user: empUser2._id, status: 'Completed', progressPercentage: 100, completionDate: new Date() },
        ],
      },
      {
        title: 'Modern Agile Sprint & Team Velocity',
        description: 'Learn modern Kanban and cross-functional leadership principles to maximize departmental velocity.',
        category: 'Leadership',
        duration: '2 Weeks',
        assignedBy: mgrUser._id,
        enrolledEmployees: [
          { employee: emp1._id, user: empUser1._id, status: 'Not Started', progressPercentage: 0 },
        ],
      },
    ]);

    // 9. Seed Notifications
    await Notification.create([
      {
        recipient: empUser1._id,
        sender: hrUser._id,
        title: 'Welcome to StaffSync',
        message: 'Your employee profile is active. Remember to clock in each morning before 9:30 AM.',
        type: 'general',
        link: '/profile',
      },
      {
        recipient: mgrUser._id,
        sender: empUser1._id,
        title: 'New Leave Request',
        message: 'Alex Rivera submitted a Casual leave request for 3 days.',
        type: 'leave_request',
        link: '/leaves',
      },
    ]);

    console.log('[Seed] Database successfully seeded with 8 collections!');
    console.log('Sample Accounts:');
    console.log('  HR Admin:   hr@staffsync.com       / Password123!');
    console.log('  Manager:    manager@staffsync.com  / Password123!');
    console.log('  Employee:   employee@staffsync.com / Password123!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDB();
