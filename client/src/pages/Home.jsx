import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import {
  AccessTime as ClockIcon,
  EventNote as LeaveIcon,
  School as TrainingIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Storage as DatabaseIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  GitHub as GitHubIcon,
  Search as SearchIcon,
  SupervisorAccount as ManagerIcon,
  AdminPanelSettings as HRIcon,
  Person as EmployeeIcon,
  Campaign as AnnounceIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommandPalette from '../components/CommandPalette';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState(0);

  const rolePreviews = [
    {
      role: 'Employee',
      icon: <EmployeeIcon />,
      title: 'Effortless Self-Service for Every Team Member',
      description:
        'Empower your staff with instant punch-in/out, clear leave balances, training course enrollments, and real-time announcement updates.',
      highlights: [
        'One-click daily attendance clock-in with shift tracking',
        'Transparent leave request submission and balance monitoring',
        'Interactive skill development courses and progress tracking',
        'Direct company announcements and instant notifications',
      ],
      metrics: [
        { label: 'Attendance Rate', value: '98.2%', color: '#10b981' },
        { label: 'Remaining Leave', value: '14 Days', color: '#38bdf8' },
        { label: 'Trainings Completed', value: '3 Courses', color: '#a78bfa' },
      ],
    },
    {
      role: 'Department Manager',
      icon: <ManagerIcon />,
      title: 'Streamlined Oversight & Approval Workflows',
      description:
        'Give managers clear visibility into team attendance, quick one-click leave approvals, and employee performance reviews.',
      highlights: [
        'Real-time departmental attendance & daily punctuality logs',
        'One-click leave approval or rejection with custom feedback notes',
        'Direct report performance ratings (1 to 5 stars) and quarterly reviews',
        'Automated shift tracking and departmental CSV data exports',
      ],
      metrics: [
        { label: 'Team Size', value: '18 Members', color: '#10b981' },
        { label: 'Pending Approvals', value: '2 Requests', color: '#f59e0b' },
        { label: 'Avg Performance', value: '4.7 / 5.0', color: '#38bdf8' },
      ],
    },
    {
      role: 'HR Administrator',
      icon: <HRIcon />,
      title: 'Total Workforce Governance & Analytics',
      description:
        'Provide HR leaders with complete administrative control over the employee directory, role assignments, company-wide broadcasts, and training modules.',
      highlights: [
        'Centralized personnel directory with department & role management',
        'Company-wide announcement broadcasts with priority flagging',
        'Enterprise training curriculum creation and progress monitoring',
        'Comprehensive attendance records and historical compliance exports',
      ],
      metrics: [
        { label: 'Total Headcount', value: '142 Active', color: '#10b981' },
        { label: 'Departments', value: '6 Functional', color: '#38bdf8' },
        { label: 'Compliance Rate', value: '99.4%', color: '#a78bfa' },
      ],
    },
  ];

  const features = [
    {
      icon: <ClockIcon sx={{ fontSize: 28, color: '#10b981' }} />,
      title: 'Punctuality & Shift Tracking',
      description:
        'Real-time daily punch-in and clock-out with automated lateness detection, work hour computations, and exportable attendance reports.',
      tag: 'Real-time',
    },
    {
      icon: <LeaveIcon sx={{ fontSize: 28, color: '#38bdf8' }} />,
      title: 'Lifecycle Leave Management',
      description:
        'Seamless multi-tier leave application system. Employees request time off, managers review with notes, and allowances deduct automatically.',
      tag: 'Workflow',
    },
    {
      icon: <TrainingIcon sx={{ fontSize: 28, color: '#a78bfa' }} />,
      title: 'Skills & Development Hub',
      description:
        'Structured internal training programs with progress percentages, course durations, and completion milestones for every employee.',
      tag: 'Upskilling',
    },
    {
      icon: <AnnounceIcon sx={{ fontSize: 28, color: '#f59e0b' }} />,
      title: 'Broadcasts & Notifications',
      description:
        'Keep teams aligned with pinned announcements, priority tags (Urgent, High, Normal), and synchronized real-time notifications.',
      tag: 'Internal Comms',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 28, color: '#ec4899' }} />,
      title: 'Central Employee Directory',
      description:
        'Granular personnel profiles featuring designation, department, contact info, performance history, and status management.',
      tag: 'Directory',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28, color: '#10b981' }} />,
      title: 'Role-Based Access Control',
      description:
        'Secure multi-tier access tiers strictly enforcing data boundaries between general Employees, Department Managers, and HR Administrators.',
      tag: 'Security',
    },
  ];

  const techStack = [
    { name: 'React 19', role: 'Frontend UI', desc: 'Latest concurrent React with Vite bundling' },
    { name: 'Material UI v9', role: 'Design System', desc: 'Custom Obsidian Dark theme with sleek styling' },
    { name: 'Node.js & Express', role: 'Backend Engine', desc: 'Modular REST API architecture & controllers' },
    { name: 'MongoDB & Mongoose', role: 'Data Layer', desc: 'Strict schemas with compound indexes & validation' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#08090a', color: '#f3f4f6' }}>
      {/* 1. Header Navigation Bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(8, 9, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo & Brand */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#08090a',
                fontWeight: 900,
                fontSize: 16,
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
              }}
            >
              S
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', fontSize: 19 }}>
              StaffSync<span style={{ color: '#10b981' }}>.</span>
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
            <Typography
              variant="body2"
              sx={{ color: '#8b949e', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Features
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#8b949e', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Role Solutions
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#8b949e', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
              onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Architecture
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              onClick={() => setPaletteOpen(true)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1.2,
                px: 1.5,
                py: 0.6,
                borderRadius: 1.5,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                color: '#8b949e',
                transition: 'all 0.15s ease',
                '&:hover': { color: '#f3f4f6', borderColor: 'rgba(16, 185, 129, 0.4)', bgcolor: 'rgba(255, 255, 255, 0.06)' },
              }}
            >
              <SearchIcon sx={{ fontSize: 15 }} />
              <Typography variant="caption" sx={{ fontSize: 12, fontWeight: 500 }}>Command Menu</Typography>
              <span className="kbd-badge">Ctrl K</span>
            </Box>

            <Button
              size="small"
              startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
              href="https://github.com/Keshav-Kasera/StaffSync"
              target="_blank"
              sx={{
                color: '#8b949e',
                fontSize: 13,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 1.5,
                px: 1.8,
                py: 0.6,
                textTransform: 'none',
                '&:hover': { color: '#f3f4f6', bgcolor: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              GitHub
            </Button>

            {user ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/dashboard')}
                sx={{
                  bgcolor: '#10b981',
                  color: '#041e15',
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.6,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  '&:hover': { bgcolor: '#34d399', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)' },
                }}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: '#10b981',
                  color: '#041e15',
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.6,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  '&:hover': { bgcolor: '#34d399', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)' },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* 2. Hero Section */}
      <Box className="tech-grid" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 }, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Hero Text */}
            <Grid item xs={12} md={7}>
              {/* Modern Badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, bgcolor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 4, mb: 3 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 12 }}>
                  Modern Enterprise HRMS Platform
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, sm: 50, md: 56 },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#f3f4f6',
                  mb: 2.5,
                }}
              >
                Workforce management.<br />
                <span style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Built for high-performing teams.
                </span>
              </Typography>

              <Typography variant="body1" sx={{ color: '#9ca3af', fontSize: 17, lineHeight: 1.7, maxWidth: 540, mb: 4 }}>
                StaffSync unifies daily attendance tracking, multi-tier leave approvals, employee skill development, and executive workforce analytics into one clean, responsive workspace.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(user ? '/dashboard' : '/login')}
                  endIcon={<ArrowIcon />}
                  sx={{
                    bgcolor: '#10b981',
                    color: '#041e15',
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                    '&:hover': { bgcolor: '#34d399', boxShadow: '0 12px 30px -5px rgba(16, 185, 129, 0.6)' },
                  }}
                >
                  {user ? 'Open Workspace' : 'Get Started Free'}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setPaletteOpen(true)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#e5e7eb',
                    px: 3,
                    py: 1.4,
                    fontSize: 14,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' },
                  }}
                >
                  Explore Features <span className="kbd-badge" style={{ marginLeft: 8 }}>Ctrl K</span>
                </Button>
              </Box>

              {/* Trust & Highlights */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 13, fontWeight: 500 }}>
                    Role-Based Access
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 13, fontWeight: 500 }}>
                    Real-Time Attendance
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 13, fontWeight: 500 }}>
                    One-Click Exports
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Hero: Modern Product Mockup Preview */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                className="card-hover-effect"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: '#0f1115',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.1)',
                }}
              >
                {/* Mock Window Top Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, pb: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 600, fontSize: 11 }}>
                    staffsync.internal/dashboard
                  </Typography>
                  <Chip label="LIVE" size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }} />
                </Box>

                {/* Dashboard Widget Preview */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Punch In Status Bar */}
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#16181e', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                        <ClockIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#f3f4f6', fontSize: 13 }}>
                          Shift Active • 09:00 AM
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 11 }}>
                          Today: 6h 45m elapsed
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label="Present" size="small" color="success" sx={{ fontWeight: 700, fontSize: 11 }} />
                  </Box>

                  {/* 2 Quick Metric Cards */}
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#16181e', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 11, display: 'block', mb: 0.5 }}>
                          Team Attendance
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981', fontSize: 20 }}>
                          98.4%
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#10b981', fontSize: 10, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUpIcon sx={{ fontSize: 12 }} /> +2.1% this week
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#16181e', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 11, display: 'block', mb: 0.5 }}>
                          Pending Approvals
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#38bdf8', fontSize: 20 }}>
                          3 Requests
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 10 }}>
                          Requires review
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Activity Mini List */}
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#16181e', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, fontSize: 11, display: 'block', mb: 1.5 }}>
                      RECENT TEAM ACTIVITY
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                        <Typography variant="caption" sx={{ color: '#e5e7eb' }}>
                          Alex Rivera submitted 2 days Casual Leave
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 10 }}>
                          10m ago
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                        <Typography variant="caption" sx={{ color: '#e5e7eb' }}>
                          Engineering enrolled in Cloud Security v2
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 10 }}>
                          1h ago
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. Core Features Showcase */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0b0d10' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: 8 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.4, bgcolor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 3, mb: 2 }}>
              <SpeedIcon sx={{ fontSize: 14, color: '#38bdf8' }} />
              <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, fontSize: 11 }}>
                CAPABILITIES & MODULES
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 2 }}>
              Everything your organization needs to thrive
            </Typography>
            <Typography variant="body1" sx={{ color: '#8b949e', fontSize: 16 }}>
              Built specifically to eliminate friction between staff members, line managers, and HR administrators.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feat, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  className="card-hover-effect"
                  sx={{
                    p: 3.5,
                    borderRadius: 2.5,
                    bgcolor: '#0e1014',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {feat.icon}
                      </Box>
                      <Chip
                        label={feat.tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: '#8b949e',
                          fontWeight: 600,
                          fontSize: 11,
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', fontSize: 18, mb: 1.2 }}>
                      {feat.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8b949e', lineHeight: 1.6, fontSize: 14 }}>
                      {feat.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Interactive Role-Based Solutions */}
      <Box id="roles" sx={{ py: { xs: 8, md: 12 }, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 6 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.4, bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 3, mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 14, color: '#10b981' }} />
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 11 }}>
                TAILORED EXPERIENCES
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 2 }}>
              Engineered for every tier of your company
            </Typography>
            <Typography variant="body1" sx={{ color: '#8b949e', fontSize: 16 }}>
              Select a persona below to preview how StaffSync adapts to specific daily responsibilities.
            </Typography>
          </Box>

          {/* Role Tabs */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ bgcolor: '#0f1115', p: 0.6, borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <Tabs
                value={activeRoleTab}
                onChange={(e, val) => setActiveRoleTab(val)}
                textColor="inherit"
                TabIndicatorProps={{ sx: { bgcolor: '#10b981', height: 3, borderRadius: 2 } }}
              >
                {rolePreviews.map((rp, idx) => (
                  <Tab
                    key={idx}
                    icon={rp.icon}
                    iconPosition="start"
                    label={rp.role}
                    sx={{
                      textTransform: 'none',
                      fontWeight: activeRoleTab === idx ? 700 : 500,
                      color: activeRoleTab === idx ? '#10b981' : '#8b949e',
                      minHeight: 44,
                      px: 3,
                      fontSize: 14,
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          {/* Role Preview Card */}
          {(() => {
            const current = rolePreviews[activeRoleTab];
            return (
              <Card
                className="page-enter"
                key={activeRoleTab}
                sx={{
                  p: { xs: 3, md: 5 },
                  bgcolor: '#0e1014',
                  borderRadius: 3,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Chip
                      label={current.role}
                      size="small"
                      sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700, mb: 2 }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6', fontSize: { xs: 22, md: 28 }, mb: 2 }}>
                      {current.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#8b949e', lineHeight: 1.7, mb: 3.5, fontSize: 15 }}>
                      {current.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                      {current.highlights.map((h, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                          <CheckIcon sx={{ color: '#10b981', fontSize: 18, mt: 0.3 }} />
                          <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                            {h}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={() => navigate(user ? '/dashboard' : '/login')}
                      endIcon={<ArrowIcon />}
                      sx={{
                        color: '#10b981',
                        borderColor: 'rgba(16, 185, 129, 0.4)',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.08)' },
                      }}
                    >
                      Experience as {current.role}
                    </Button>
                  </Grid>

                  {/* Highlights Metrics Panel */}
                  <Grid item xs={12} md={5}>
                    <Box sx={{ p: 3, bgcolor: '#14171d', borderRadius: 2.5, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, fontSize: 11, display: 'block', mb: 2 }}>
                        BENCHMARKS & LIVE METRICS
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {current.metrics.map((m, idx) => (
                          <Box key={idx} sx={{ p: 2, bgcolor: '#0e1014', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 12, display: 'block', mb: 0.5 }}>
                              {m.label}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: m.color, fontSize: 24 }}>
                              {m.value}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            );
          })()}
        </Container>
      </Box>

      {/* 5. Modern Architecture & Tech Foundation */}
      <Box id="architecture" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#08090a', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 7 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.4, bgcolor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 3, mb: 2 }}>
              <DatabaseIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
              <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: 11 }}>
                FULL-STACK ARCHITECTURE
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 2 }}>
              Built with industry-standard technologies
            </Typography>
            <Typography variant="body1" sx={{ color: '#8b949e', fontSize: 16 }}>
              Production-ready MERN stack with strict schema validation, robust authentication, and responsive client design.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {techStack.map((t, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  className="card-hover-effect"
                  sx={{
                    p: 3,
                    bgcolor: '#0e1014',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 11, display: 'block', mb: 1 }}>
                    {t.role}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', fontSize: 18, mb: 1 }}>
                    {t.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13, lineHeight: 1.6 }}>
                    {t.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6. Call To Action Banner */}
      <Box sx={{ py: 10, bgcolor: '#0b0d10' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(56, 189, 248, 0.06) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#f3f4f6', fontSize: { xs: 26, md: 34 }, mb: 2 }}>
              Ready to elevate your team's HR operations?
            </Typography>
            <Typography variant="body1" sx={{ color: '#9ca3af', maxWidth: 520, mx: 'auto', mb: 4, fontSize: 16 }}>
              Join forward-thinking teams managing attendance, time off, and employee growth in one centralized portal.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(user ? '/dashboard' : '/login')}
                sx={{
                  bgcolor: '#10b981',
                  color: '#041e15',
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 2,
                  px: 4,
                  py: 1.3,
                  textTransform: 'none',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                  '&:hover': { bgcolor: '#34d399' },
                }}
              >
                {user ? 'Launch Dashboard' : 'Sign In to Workspace'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setPaletteOpen(true)}
                sx={{
                  color: '#f3f4f6',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: 14,
                  borderRadius: 2,
                  px: 3,
                  py: 1.3,
                  textTransform: 'none',
                  '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' },
                }}
              >
                Quick Actions (Ctrl+K)
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* 7. Modern Professional Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', py: 6, bgcolor: '#060709' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.8 }}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#08090a',
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                >
                  S
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
                  StaffSync<span style={{ color: '#10b981' }}>.</span>
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#6e7681', display: 'block' }}>
                Engineered by Keshav Kasera • Released under the MIT Open Source License
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                size="small"
                onClick={() => setPaletteOpen(true)}
                sx={{ color: '#8b949e', fontSize: 13, textTransform: 'none', '&:hover': { color: '#10b981' } }}
              >
                Command Menu (Ctrl+K)
              </Button>
              <Button
                size="small"
                href="https://github.com/Keshav-Kasera/StaffSync"
                target="_blank"
                startIcon={<GitHubIcon sx={{ fontSize: 15 }} />}
                sx={{ color: '#8b949e', fontSize: 13, textTransform: 'none', '&:hover': { color: '#10b981' } }}
              >
                Source Code
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mount Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </Box>
  );
};

export default Home;
