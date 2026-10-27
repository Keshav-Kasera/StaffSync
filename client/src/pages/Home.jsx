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
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  EventNote as LeavesIcon,
  AccessTime as AttendanceIcon,
  School as TrainingIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Top Simple Bar */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0', py: 2, px: 4 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              S
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark' }}>
              Staff<span style={{ color: '#06b6d4' }}>Sync</span>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <Button variant="contained" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outlined" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="contained" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Chip
            label="MERN STACK ENTERPRISE HRM SOLUTION"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 700, mb: 3, letterSpacing: 1 }}
          />
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 2.5, lineHeight: 1.15 }}>
            Smarter Workforce Management for Modern Teams
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
            A unified portal connecting HR, Managers, and Employees. Digitize attendance logging, leave approvals, company announcements, and team trainings in one place.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(user ? '/dashboard' : '/login')}
              sx={{ py: 1.5, px: 4, fontSize: 16 }}
            >
              {user ? 'Open Workspace' : 'Launch Demo Portal'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Core Feature Highlights */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 1, color: '#0f172a' }}>
          Engineered for Every Level of the Organization
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#64748b', mb: 6 }}>
          Role-Based Access Control ensures employees, managers, and HR leaders get the exact tools they need.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', mb: 2 }}>
                <PeopleIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                For Employees
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                Quick clock-in/out attendance logging, transparent annual leave balance tracking, self-service profile updates, and real-time company notices.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', mb: 2 }}>
                <LeavesIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                For Managers
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                Direct team attendance oversight, one-click leave review and approval workflows, employee performance tracking, and training coordination.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', mb: 2 }}>
                <SecurityIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                For HR Personnel
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                Full staff directory management, company-wide leave auditing, organizational attendance analytics, and broadcasting corporate announcements.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
