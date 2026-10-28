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
} from '@mui/material';
import { ArrowForward as ArrowIcon } from '@mui/icons-material';
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
    { value: 'manager', label: 'Department Manager — Team Oversight' },
    { value: 'hr', label: 'HR Administrator — Organization Control' },
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08090a',
        px: 2,
        py: { xs: 4, md: 6 },
      }}
    >
      <Card
        className="page-enter"
        sx={{
          maxWidth: 580,
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
            Create your account
          </Typography>
          <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13, maxWidth: 360 }}>
            Enter your professional details below to join your team
          </Typography>
        </Box>

        <CardContent sx={{ px: { xs: 3, sm: 4.5 }, pb: 4, pt: 1 }}>
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
                  placeholder="e.g. Alex Rivera"
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
                  placeholder="alex@staffsync.com"
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
                  placeholder="Min. 6 characters"
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
                  placeholder="Repeat password"
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
                  Designation / Role Title
                </Typography>
                <TextField
                  fullWidth
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, display: 'block', mb: 0.6 }}>
                  Assigned Permission Role
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

              <Grid item xs={12}>
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
                py: 1.3,
                fontSize: 14,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)',
                '&:hover': { bgcolor: '#34d399', boxShadow: '0 10px 24px -4px rgba(16, 185, 129, 0.6)' },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: '#041e15' }} /> : 'Complete Registration'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13 }}>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
