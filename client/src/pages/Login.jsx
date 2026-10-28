import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  ArrowForward as ArrowIcon,
  Person as PersonIcon,
  SupervisorAccount as ManagerIcon,
  AdminPanelSettings as HRIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide both work email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back to StaffSync');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutofill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <Box
      className="tech-grid"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08090a',
        px: 2,
        py: 4,
      }}
    >
      <Card
        className="page-enter"
        sx={{
          maxWidth: 440,
          width: '100%',
          mx: 'auto',
          borderRadius: 3,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#0e1014',
          overflow: 'hidden',
        }}
      >
        {/* Centered Top Brand Banner */}
        <Box
          sx={{
            pt: 4,
            pb: 2,
            px: 3.5,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo Badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.2,
              mb: 2.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#08090a',
                fontWeight: 900,
                fontSize: 18,
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
              }}
            >
              S
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', fontSize: 21 }}>
              StaffSync<span style={{ color: '#10b981' }}>.</span>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 0.8 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13, maxWidth: 320 }}>
            Sign in to access your organization workspace
          </Typography>
        </Box>

        <CardContent sx={{ px: { xs: 3, sm: 4 }, pb: 4, pt: 1 }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                fontSize: 13,
                bgcolor: 'rgba(244, 63, 94, 0.1)',
                color: '#fb7185',
                border: '1px solid rgba(244, 63, 94, 0.3)',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Work Email
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. employee@staffsync.com"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Password
              </Typography>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={submitting}
              endIcon={!submitting && <ArrowIcon />}
              sx={{
                bgcolor: '#10b981',
                color: '#041e15',
                fontWeight: 700,
                py: 1.3,
                fontSize: 14,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)',
                '&:hover': { bgcolor: '#34d399', boxShadow: '0 10px 24px -4px rgba(16, 185, 129, 0.6)' },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: '#041e15' }} /> : 'Sign In'}
            </Button>
          </Box>

          {/* Quick 1-Click Demo Accounts */}
          <Box sx={{ mt: 3.5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, letterSpacing: '0.04em', display: 'block', mb: 1.5 }}>
              QUICK DEMO ACCOUNTS (1-CLICK TEST)
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  startIcon={<PersonIcon sx={{ fontSize: 15 }} />}
                  onClick={() => handleAutofill('employee@staffsync.com')}
                  sx={{
                    fontSize: 11,
                    py: 0.7,
                    color: '#e5e7eb',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' },
                  }}
                >
                  Employee
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  startIcon={<ManagerIcon sx={{ fontSize: 15 }} />}
                  onClick={() => handleAutofill('manager@staffsync.com')}
                  sx={{
                    fontSize: 11,
                    py: 0.7,
                    color: '#e5e7eb',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#38bdf8', bgcolor: 'rgba(56, 189, 248, 0.05)' },
                  }}
                >
                  Manager
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  startIcon={<HRIcon sx={{ fontSize: 15 }} />}
                  onClick={() => handleAutofill('hr@staffsync.com')}
                  sx={{
                    fontSize: 11,
                    py: 0.7,
                    color: '#e5e7eb',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#a78bfa', bgcolor: 'rgba(167, 139, 250, 0.05)' },
                  }}
                >
                  HR Admin
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13 }}>
              Don't have an account yet?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/register')}
                sx={{ color: '#10b981', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Create account
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
