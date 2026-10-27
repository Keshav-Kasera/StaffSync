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
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  ExpandMore as ExpandMoreIcon,
  BadgeOutlined as BadgeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your credentials.');
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
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #334155',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 4, pb: 3, textAlign: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 12px',
            }}
          >
            <LockIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            StaffSync Portal
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontSize: 13 }}>
            Enter your credentials to access the internal workspace
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Work Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              disabled={submitting}
              sx={{
                py: 1.2,
                fontSize: 14,
                backgroundColor: '#0f172a',
                '&:hover': { backgroundColor: '#1e293b' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Authenticate & Sign In'}
            </Button>

            <Box sx={{ mt: 2.5, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
                Don't have an internal account?{' '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}
                >
                  Register
                </Link>
              </Typography>
            </Box>

            {/* Subtle, Collapsible Academic Testing Assistant */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
              <Accordion
                elevation={0}
                sx={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px !important',
                  '&:before': { display: 'none' },
                  backgroundColor: '#f8fafc',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BadgeIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                      Academic Testing / Autofill Profiles
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1.5, fontSize: 11 }}>
                    Click an operational profile below to autofill verified test credentials:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        onClick={() => handleAutofill('hr@staffsync.com')}
                        sx={{ fontSize: 12, justifyContent: 'flex-start', py: 0.5, borderColor: '#cbd5e1', color: '#0f172a' }}
                      >
                        <strong>HR Director:</strong>&nbsp;hr@staffsync.com
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        onClick={() => handleAutofill('manager@staffsync.com')}
                        sx={{ fontSize: 12, justifyContent: 'flex-start', py: 0.5, borderColor: '#cbd5e1', color: '#0f172a' }}
                      >
                        <strong>Manager:</strong>&nbsp;manager@staffsync.com
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        onClick={() => handleAutofill('employee@staffsync.com')}
                        sx={{ fontSize: 12, justifyContent: 'flex-start', py: 0.5, borderColor: '#cbd5e1', color: '#0f172a' }}
                      >
                        <strong>Employee:</strong>&nbsp;employee@staffsync.com
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
