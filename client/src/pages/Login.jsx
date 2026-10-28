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
  Chip,
  Container,
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  CheckCircle as CheckIcon,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08090a',
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#0e1014',
            overflow: 'hidden',
          }}
        >
          <Grid container>
            {/* Left Brand Panel */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                p: { xs: 4, md: 6 },
                background: 'linear-gradient(145deg, #0a0c10 0%, #11141b 100%)',
                borderRight: { md: '1px solid rgba(255, 255, 255, 0.08)' },
                borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.08)', md: 'none' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* Logo */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, cursor: 'pointer' }}
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
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', fontSize: 18 }}>
                    StaffSync<span style={{ color: '#10b981' }}>.</span>
                  </Typography>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6', lineHeight: 1.2, mb: 2 }}>
                  The unified platform for workforce intelligence.
                </Typography>
                <Typography variant="body2" sx={{ color: '#8b949e', lineHeight: 1.7, mb: 4 }}>
                  Log in to manage your daily attendance, submit leave requests, monitor organizational analytics, and upskill through department training programs.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      One-click daily punch-in & attendance history
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      Multi-tier leave management & approvals
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      Enterprise role-based security & audit trails
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <Typography variant="caption" sx={{ color: '#6e7681' }}>
                  © {new Date().getFullYear()} StaffSync Inc. All rights reserved.
                </Typography>
              </Box>
            </Grid>

            {/* Right Form Panel */}
            <Grid item xs={12} md={7} sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
              <Box sx={{ maxWidth: 440, mx: 'auto' }}>
                <Box sx={{ mb: 3.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 1 }}>
                    Welcome back
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8b949e' }}>
                    Sign in to your StaffSync organizational workspace.
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13, bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600 }}>
                        Password
                      </Typography>
                    </Box>
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
                      py: 1.4,
                      fontSize: 14,
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                      '&:hover': { bgcolor: '#34d399', boxShadow: '0 12px 30px -5px rgba(16, 185, 129, 0.6)' },
                    }}
                  >
                    {submitting ? <CircularProgress size={22} sx={{ color: '#041e15' }} /> : 'Sign In'}
                  </Button>
                </Box>

                {/* Quick 1-Click Demo Accounts for Evaluators */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 1.5 }}>
                    QUICK DEMO ACCOUNTS (1-CLICK TEST)
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<PersonIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleAutofill('employee@staffsync.com')}
                        sx={{
                          fontSize: 11,
                          color: '#e5e7eb',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          px: 1,
                          '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' },
                        }}
                      >
                        Employee
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<ManagerIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleAutofill('manager@staffsync.com')}
                        sx={{
                          fontSize: 11,
                          color: '#e5e7eb',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          px: 1,
                          '&:hover': { borderColor: '#38bdf8', bgcolor: 'rgba(56, 189, 248, 0.05)' },
                        }}
                      >
                        Manager
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<HRIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleAutofill('hr@staffsync.com')}
                        sx={{
                          fontSize: 11,
                          color: '#e5e7eb',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          px: 1,
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
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
