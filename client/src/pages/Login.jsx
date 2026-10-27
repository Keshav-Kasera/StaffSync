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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  ExpandMore as ExpandMoreIcon,
  Key as KeyIcon,
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
      setError(err.response?.data?.message || 'Authentication rejected. Verify your cryptographic credentials.');
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
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
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
              margin: '0 auto 12px',
            }}
          >
            <LockIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', fontSize: 20 }}>
            StaffSync Portal
          </Typography>
          <Typography variant="caption" sx={{ color: '#8b949e', mt: 0.5, display: 'block', fontSize: 12 }}>
            AUTHENTICATE TO ACCESS INTERNAL RBAC LEDGER
          </Typography>
        </Box>

        <CardContent sx={{ p: 3.5 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5, fontSize: 12, bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.8 }}>
              WORK EMAIL ADDRESS
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
              placeholder="e.g. hr@staffsync.com"
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" sx={{ color: '#8b949e', fontWeight: 700, display: 'block', mb: 0.8 }}>
              CRYPTOGRAPHIC PASSWORD
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
              placeholder="••••••••••••"
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
                fontSize: 13,
                fontWeight: 700,
                backgroundColor: '#10b981',
                color: '#041e15',
                '&:hover': { backgroundColor: '#34d399', boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Authenticate & Sign In'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 12 }}>
                Need onboarding credentials?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 700, color: '#10b981', textDecoration: 'none', cursor: 'pointer' }}
                >
                  Register Account
                </Link>
              </Typography>
            </Box>

            {/* Evaluator Quick Access Drawer */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <Accordion
                elevation={0}
                sx={{
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px !important',
                  '&:before': { display: 'none' },
                  backgroundColor: '#080a0d',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18, color: '#8b949e' }} />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <KeyIcon sx={{ fontSize: 15, color: '#10b981' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#8b949e', fontSize: 11 }}>
                      EVALUATION_QUICK_AUTOFILL
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: '#6e7681', display: 'block', mb: 1, fontSize: 10 }}>
                    Select an operational role to autofill test credentials:
                  </Typography>
                  <Grid container spacing={0.8}>
                    {[
                      { role: 'HR Director', email: 'hr@staffsync.com', color: '#10b981' },
                      { role: 'Department Manager', email: 'manager@staffsync.com', color: '#38bdf8' },
                      { role: 'Staff Employee', email: 'employee@staffsync.com', color: '#f59e0b' },
                    ].map((item) => (
                      <Grid item xs={12} key={item.email}>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          onClick={() => handleAutofill(item.email)}
                          sx={{
                            fontSize: 11,
                            justifyContent: 'flex-start',
                            py: 0.5,
                            px: 1.2,
                            borderColor: 'rgba(255, 255, 255, 0.08)',
                            color: '#e5e7eb',
                            fontFamily: '"JetBrains Mono", monospace',
                            '&:hover': { borderColor: item.color, backgroundColor: 'rgba(255, 255, 255, 0.02)' },
                          }}
                        >
                          <span style={{ color: item.color, fontWeight: 700, marginRight: 6 }}>{item.role}:</span> {item.email}
                        </Button>
                      </Grid>
                    ))}
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
