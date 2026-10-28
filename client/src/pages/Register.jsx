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
  MenuItem,
  Grid,
  Container,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  HowToReg as RegisterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    department: 'Engineering',
    designation: 'Software Engineer',
    phone: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const departments = [
    'Engineering',
    'Human Resources',
    'Marketing',
    'Sales',
    'Design',
    'Customer Support',
    'Finance',
  ];

  const roles = [
    { value: 'employee', label: 'Employee — Individual Contributor' },
    { value: 'manager', label: 'Department Manager — Team Oversight & Approvals' },
    { value: 'hr', label: 'HR Administrator — Full Workforce Management' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      return setError('Please fill in all required fields.');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match. Please verify your entries.');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setSubmitting(true);
    try {
      await register(formData);
      toast.success('Account created successfully! Welcome to StaffSync.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please check your information.');
    } finally {
      setSubmitting(false);
    }
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
        py: { xs: 4, md: 6 },
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
              md={4.5}
              sx={{
                p: { xs: 4, md: 5 },
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
                  Set up your organization account.
                </Typography>
                <Typography variant="body2" sx={{ color: '#8b949e', lineHeight: 1.7, mb: 4 }}>
                  Join your team on StaffSync to start tracking attendance, requesting time off, and managing workplace operations effortlessly.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      Instant access based on your assigned role
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      Clean employee profile & department directory
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckIcon sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: 14 }}>
                      Enterprise privacy & encrypted authentication
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <Typography variant="caption" sx={{ color: '#6e7681' }}>
                  Already registered?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate('/login')}
                    sx={{ color: '#10b981', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Grid>

            {/* Right Form Panel */}
            <Grid item xs={12} md={7.5} sx={{ p: { xs: 3, sm: 5, md: 5 } }}>
              <Box sx={{ maxWidth: 560, mx: 'auto' }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 1 }}>
                    Create account
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8b949e' }}>
                    Enter your professional details below to get started.
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13, bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Full Name *
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Work Email *
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="s.jenkins@staffsync.com"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Password *
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Confirm Password *
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Department *
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      >
                        {departments.map((dep) => (
                          <MenuItem key={dep} value={dep}>
                            {dep}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Designation / Job Title
                      </Typography>
                      <TextField
                        fullWidth
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Lead Designer"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Role Permission
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        {roles.map((r) => (
                          <MenuItem key={r.value} value={r.value}>
                            {r.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                        Phone Number (Optional)
                      </Typography>
                      <TextField
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    endIcon={!submitting && <ArrowIcon />}
                    sx={{
                      mt: 3.5,
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
                    {submitting ? <CircularProgress size={22} sx={{ color: '#041e15' }} /> : 'Complete Registration'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
