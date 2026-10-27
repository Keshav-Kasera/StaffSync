import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  EventNote as LeavesIcon,
  AccessTime as AttendanceIcon,
  School as TrainingIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckIcon,
  GitHub as GitHubIcon,
  SupervisorAccount as ManagerIcon,
  AdminPanelSettings as HRIcon,
  TrendingUp as TrendingUpIcon,
  NotificationsActive as AlertIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleQuickDemoLogin = async (demoEmail) => {
    try {
      await login(demoEmail, 'Password123!');
      navigate('/dashboard');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* 1. Top Navbar */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e2e8f0',
          py: 1.8,
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: 20,
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
              }}
            >
              S
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Staff<span style={{ color: '#4f46e5' }}>Sync</span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<GitHubIcon />}
              href="https://github.com/Keshav-Kasera/StaffSync"
              target="_blank"
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 600 }}
            >
              GitHub Repo
            </Button>

            {user ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{ px: 3, borderRadius: 2 }}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{ px: 2.5, borderRadius: 2, fontWeight: 700 }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{ px: 2.5, borderRadius: 2, fontWeight: 700 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* 2. Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          background: 'radial-gradient(ellipse at top, #eef2ff 0%, #f8fafc 70%)',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Chip
            icon={<SecurityIcon sx={{ fontSize: 16 }} />}
            label="ENTERPRISE MERN STACK HUMAN RESOURCE MANAGEMENT SYSTEM"
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: 800,
              fontSize: 12,
              mb: 3,
              letterSpacing: 0.8,
              py: 2,
              px: 1,
              borderColor: 'primary.light',
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: 32, sm: 46, md: 54 },
              lineHeight: 1.15,
              mb: 3,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Smarter Workforce Operations & Employee Governance
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#475569',
              mb: 4.5,
              fontWeight: 400,
              lineHeight: 1.7,
              fontSize: { xs: 16, sm: 18 },
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            A high-performance portal unifying <strong>Employees</strong>, <strong>Department Managers</strong>, and <strong>HR Leadership</strong>. 
            Automate daily attendance, govern time-off approvals, track performance ratings, and broadcast corporate notices with complete Role-Based Security.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(user ? '/dashboard' : '/login')}
              sx={{
                py: 1.6,
                px: 4,
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
              }}
            >
              {user ? 'Open Workspace' : 'Launch Demo Portal'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              href="https://github.com/Keshav-Kasera/StaffSync"
              target="_blank"
              sx={{
                py: 1.6,
                px: 3.5,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 2.5,
                borderColor: '#cbd5e1',
                color: '#334155',
                '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f1f5f9' },
              }}
            >
              Browse Code
            </Button>
          </Box>

          {/* Key Metric Highlights Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  3 Tiers
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Role-Based Access
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                  8 Models
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  MongoDB Collections
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main' }}>
                  100% Free
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Atlas & Cloud Hosted
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'warning.main' }}>
                  JWT & Bcrypt
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Enterprise Security
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* 3. Three Persona Portals Breakdown */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="ROLE-BASED WORKFLOWS" size="small" color="primary" sx={{ fontWeight: 800, mb: 1.5 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Built Specifically for Every Tier of the Company
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto', mt: 1 }}>
            StaffSync does not use a one-size-fits-all screen. Each user persona gets a dedicated dashboard tailored strictly to their responsibilities.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* HR Persona */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3.5,
                height: '100%',
                borderRadius: 4,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    bgcolor: 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  <HRIcon sx={{ fontSize: 30 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    HR Personnel
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    Executive Administrative Suite
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Full operational control over the organization. Onboard staff, manage department allocations, publish broadcasts, and audit attendance metrics.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Employee Directory CRUD & Status</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Organization Attendance Auditing</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Company-Wide Leave Decisions</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Corporate Bulletins & Urgent Alerts</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleQuickDemoLogin('hr@staffsync.com')}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Test HR View Demo →
              </Button>
            </Card>
          </Grid>

          {/* Manager Persona */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3.5,
                height: '100%',
                borderRadius: 4,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    bgcolor: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'secondary.main',
                  }}
                >
                  <ManagerIcon sx={{ fontSize: 30 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Managers
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                    Department Supervision
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Empowers team leads to manage direct reports without administrative friction. Monitor presence, process leave requests, and assess velocity.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="secondary" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Direct Report Team Oversight</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="secondary" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Approve / Reject Team Leaves</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="secondary" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Live Team Attendance Clock-In Feed</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="secondary" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>1 to 5 Star Performance Evaluations</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => handleQuickDemoLogin('manager@staffsync.com')}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Test Manager View Demo →
              </Button>
            </Card>
          </Grid>

          {/* Employee Persona */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3.5,
                height: '100%',
                borderRadius: 4,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'success.main',
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 30 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Employees
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>
                    Self-Service Workstation
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Frictionless daily operations. Mark shifts with one click, submit time-off requests, track annual quotas, and progress through skill certifications.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>One-Click Daily Clock-In / Out</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Casual, Sick & Earned Leave Quotas</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Training Milestone Progress Bar</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Self-Service Profile Details</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="success"
                fullWidth
                onClick={() => handleQuickDemoLogin('employee@staffsync.com')}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Test Employee View Demo →
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 4. One-Click Evaluator Credentials Banner */}
      <Box sx={{ py: 8, backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              color: '#ffffff',
              boxShadow: '0 20px 40px rgba(30, 27, 75, 0.4)',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Chip label="EVALUATOR QUICK ACCESS" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 800, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1.5, color: '#ffffff' }}>
                  Pre-Configured Demo Accounts
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 3, lineHeight: 1.7 }}>
                  The database has been seeded with verified accounts across all 3 permission levels. 
                  Click any account below to instantly authenticate and evaluate the system without manually typing credentials.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleQuickDemoLogin('hr@staffsync.com')}
                    sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
                  >
                    👔 Login as HR
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleQuickDemoLogin('manager@staffsync.com')}
                    sx={{ bgcolor: '#0891b2', '&:hover': { bgcolor: '#0e7490' } }}
                  >
                    💼 Login as Manager
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleQuickDemoLogin('employee@staffsync.com')}
                    sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' } }}
                  >
                    💻 Login as Employee
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 2 }}>
                    MANUAL CREDENTIALS:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>All Passwords:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#38bdf8' }}>Password123!</Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>HR Email:</Typography>
                      <Typography variant="caption" sx={{ color: '#e2e8f0' }}>hr@staffsync.com</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>Manager Email:</Typography>
                      <Typography variant="caption" sx={{ color: '#e2e8f0' }}>manager@staffsync.com</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>Employee Email:</Typography>
                      <Typography variant="caption" sx={{ color: '#e2e8f0' }}>employee@staffsync.com</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* 5. Technology Stack Summary */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Built with Modern, Industry-Standard Technologies
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Engineered to deliver reliability, scalability, and airtight data isolation.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>React 18</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Component UI</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284c7' }}>MUI v6</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Enterprise Design</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981' }}>Node.js</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Async Engine</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#334155' }}>Express</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>REST Architecture</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669' }}>MongoDB</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Atlas Cloud M0</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#d97706' }}>JWT + Hash</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Auth Security</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 6. Footer */}
      <Box sx={{ borderTop: '1px solid #e2e8f0', py: 4, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
              StaffSync HRMS
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              • Full Stack Development Capstone Submission
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Built with ❤️ by Keshav Kasera • Released under the MIT License
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
