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
import { HowToReg as RegisterIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Cryptographic password confirmation mismatch');
    }

    if (formData.password.length < 6) {
      return setError('Password entropy insufficient: minimum 6 characters required');
    }

    setSubmitting(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment rejected. Please verify details.');
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
        p: 2,
        py: 6,
      }}
    >
      <Card
        sx={{
          maxWidth: 520,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: '#0c0e12',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3.5, pb: 2.5, textAlign: 'center', backgroundColor: '#090a0d', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              margin: '0 auto 10px',
            }}
          >
            <RegisterIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', fontSize: 20 }}>
            New Personnel Enrollment
          </Typography>
          <Typography variant="caption" sx={{ color: '#8b949e', mt: 0.5, display: 'block', fontSize: 11 }}>
            PROVISION ROLE-BASED WORKSPACE CREDENTIALS
          </Typography>
        </Box>

        <CardContent sx={{ p: 3.5 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5, fontSize: 12, bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  FULL LEGAL NAME
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  WORK EMAIL ADDRESS
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex.morgan@staffsync.com"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  PASSWORD
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  CONFIRM PASSWORD
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  ORGANIZATIONAL ROLE
                </Typography>
                <TextField
                  select
                  fullWidth
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="employee">Employee (Self-Service)</MenuItem>
                  <MenuItem value="manager">Manager (Team Oversight)</MenuItem>
                  <MenuItem value="hr">HR Personnel (System Admin)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  DEPARTMENT
                </Typography>
                <TextField
                  select
                  fullWidth
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  JOB DESIGNATION
                </Typography>
                <TextField
                  fullWidth
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.6 }}>
                  CONTACT PHONE
                </Typography>
                <TextField
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2831"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              disabled={submitting}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.2,
                fontSize: 13,
                fontWeight: 700,
                backgroundColor: '#10b981',
                color: '#041e15',
                '&:hover': { backgroundColor: '#34d399', boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Complete Provisioning'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 12 }}>
                Already provisioned?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/login')}
                  sx={{ fontWeight: 700, color: '#10b981', textDecoration: 'none', cursor: 'pointer' }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
