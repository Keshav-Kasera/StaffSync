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
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Security as SecurityIcon,
  People as DirectoryIcon,
  AccessTime as AttendanceIcon,
  DateRange as LeaveIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  GitHub as GitHubIcon,
  Business as EnterpriseIcon,
  Analytics as AnalyticsIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleQuickLogin = async (email) => {
    try {
      await login(email, 'Password123!');
      navigate('/dashboard');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a' }}>
      {/* 1. Executive Top Navigation Bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  backgroundColor: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: -0.5,
                }}
              >
                S
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', fontSize: 19 }}>
                StaffSync<span style={{ color: '#4f46e5' }}>.</span>
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#0f172a' } }} onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}>
                Modules
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#0f172a' } }} onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}>
                Architecture
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#0f172a' } }} onClick={() => document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })}>
                Security & RBAC
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#0f172a' } }} onClick={() => document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' })}>
                Evaluation Sandbox
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              size="small"
              color="inherit"
              startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
              href="https://github.com/Keshav-Kasera/StaffSync"
              target="_blank"
              sx={{ fontWeight: 600, color: '#475569', textTransform: 'none', display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Repository
            </Button>
            {user ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/dashboard')}
                sx={{ backgroundColor: '#0f172a', '&:hover': { backgroundColor: '#1e293b' }, textTransform: 'none', fontWeight: 600, px: 2 }}
              >
                Workspace Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => navigate('/login')}
                  sx={{ color: '#0f172a', fontWeight: 600, textTransform: 'none', px: 1.5 }}
                >
                  Sign In
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{ backgroundColor: '#4f46e5', '&:hover': { backgroundColor: '#4338ca' }, textTransform: 'none', fontWeight: 600, px: 2 }}
                >
                  Create Account
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* 2. Enterprise Hero Section */}
      <Box sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 6, md: 8 }, backgroundColor: '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 780, mx: 'auto', textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, borderRadius: 5, backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', mb: 2.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
                Enterprise Workforce Infrastructure
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 34, sm: 46, md: 52 },
                lineHeight: 1.15,
                color: '#0f172a',
                letterSpacing: '-0.03em',
                mb: 2.5,
              }}
            >
              Unified Workforce Operations & Governance Platform
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 16, sm: 18 },
                color: '#64748b',
                lineHeight: 1.7,
                maxWidth: 680,
                mx: 'auto',
                mb: 4,
              }}
            >
              StaffSync delivers institutional-grade oversight across personnel directories, daily attendance verification, and multi-tier leave approval lifecycles through strict Role-Based Access Control.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(user ? '/dashboard' : '/login')}
                sx={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3.5,
                  py: 1.3,
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#1e293b' },
                }}
              >
                {user ? 'Open Workspace' : 'Launch System Portal'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com/Keshav-Kasera/StaffSync"
                target="_blank"
                sx={{
                  color: '#0f172a',
                  borderColor: '#cbd5e1',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1.3,
                  borderRadius: 2,
                  '&:hover': { borderColor: '#94a3b8', backgroundColor: '#ffffff' },
                }}
              >
                Source Code
              </Button>
            </Box>
          </Box>

          {/* Interactive Live Product Mockup Preview */}
          <Paper
            elevation={0}
            sx={{
              mt: 6,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08)',
            }}
          >
            {/* Mock Window Header */}
            <Box sx={{ px: 2.5, py: 1.5, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                <Typography variant="caption" sx={{ color: '#64748b', ml: 1.5, fontWeight: 600, fontFamily: 'monospace' }}>
                  https://staffsync.internal/dashboard/overview
                </Typography>
              </Box>
              <Chip label="System Active • v1.0.0" size="small" sx={{ fontSize: 11, height: 22, fontWeight: 600, color: '#059669', bgcolor: '#ecfdf5' }} />
            </Box>

            {/* Mock Dashboard Body */}
            <Box sx={{ p: { xs: 2.5, md: 4 } }}>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Active Headcount</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#0f172a' }}>1,248 Staff</Typography>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>+4.2% this quarter</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Today's Presence</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#0f172a' }}>98.4% Verified</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Shift adherence on target</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Pending Governance</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#0f172a' }}>12 Approvals</Typography>
                    <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>Awaiting manager action</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Security Posture</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#0f172a' }}>RBAC Enforced</Typography>
                    <Typography variant="caption" sx={{ color: '#4f46e5', fontWeight: 600 }}>Zero authorization bypasses</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Mock Table */}
              <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ px: 2.5, py: 1.5, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Live Transaction Pipeline (Simulated Feed)
                  </Typography>
                </Box>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffffff' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: 12 }}>Personnel</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: 12 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: 12 }}>Workflow Type</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#64748b', fontSize: 12 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Alex Rivera (Senior Engineer)</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>Time-Off Request (Casual — 3 Days)</TableCell>
                      <TableCell><Chip label="Pending Review" size="small" sx={{ fontSize: 11, height: 20, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 700 }} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Sarah Chen (Staff Architect)</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>Daily Attendance Check-In</TableCell>
                      <TableCell><Chip label="Verified Present" size="small" sx={{ fontSize: 11, height: 20, bgcolor: '#ecfdf5', color: '#065f46', fontWeight: 700 }} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Marcus Brody (Engineering Lead)</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>Quarterly Performance Appraisal</TableCell>
                      <TableCell><Chip label="Evaluated (5 Stars)" size="small" sx={{ fontSize: 11, height: 20, bgcolor: '#eff6ff', color: '#1e40af', fontWeight: 700 }} /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* 3. Core Enterprise Architecture Modules */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="modules">
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography variant="overline" sx={{ fontWeight: 800, color: '#4f46e5', letterSpacing: 1.5 }}>
            FUNCTIONAL ARCHITECTURE
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mt: 0.5, mb: 1.5 }}>
            Purpose-Built for Strict Organizational Hierarchy
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 640, mx: 'auto' }}>
            Built around strict access control boundaries separating employee self-service, management workflows, and administrative authority.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 3.5, borderRadius: 2.5, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', mb: 2.5 }}>
                <DirectoryIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Personnel Administration
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                Centralized staff directory with pagination, department-level filtering, record deactivation, and comprehensive profile records mapped to reporting managers.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Key Capabilities:
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Real-time staff search & department filtering</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Manager-to-report relational mapping</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Status toggles and account deactivation</Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 3.5, borderRadius: 2.5, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', mb: 2.5 }}>
                <AttendanceIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Time & Attendance Engine
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                Precision clock-in/out engine with compound unique database constraints preventing duplicate punches, automated shift duration math, and late detection.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Key Capabilities:
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Compound-indexed daily records</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Automated half-day & late threshold detection</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Organization-wide attendance audit logs</Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', p: 3.5, borderRadius: 2.5, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', mb: 2.5 }}>
                <LeaveIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Leave Lifecycle & Quotas
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                Formal leave governance workflow supporting Casual, Sick, and Earned allocations with automatic balance deduction, manager review modals, and decision audits.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Key Capabilities:
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Real-time quota validation before submission</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Manager approval dialog with decision notes</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>• Automated balance deduction on approval</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 4. Security & Cryptographic Standards */}
      <Box sx={{ py: 10, backgroundColor: '#0f172a', color: '#ffffff' }} id="security">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }}>
                <SecurityIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#e2e8f0', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  Enterprise Security Layer
                </Typography>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', mb: 2 }}>
                Airtight Access Control & Data Isolation
              </Typography>

              <Typography variant="body1" sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 4 }}>
                The application employs cryptographic protection at every entry point. Credentials are never stored in plain text, sessions are secured via stateless cryptographically signed tokens, and every API request passes through role verification middleware.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#10b981', mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>Bcrypt Password Hashing (10 Rounds)</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Salted hashes ensure passwords cannot be reversed even in database dump scenarios.</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#10b981', mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>Stateless JWT Authorization Headers</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Cryptographic Bearer tokens protect client routes and Express REST endpoints.</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#10b981', mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>Role Guard Middleware (HTTP 401 / 403)</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Non-permitted roles are rejected at the network layer prior to controller execution.</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 3,
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'monospace',
                }}
              >
                <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, display: 'block', mb: 1.5 }}>
                  // Auth & Role Enforcement Flow
                </Typography>
                <Box sx={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.8 }}>
                  <div>POST /api/auth/login <span style={{ color: '#10b981' }}>200 OK</span></div>
                  <div>↳ Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</div>
                  <div style={{ color: '#64748b', margin: '8px 0' }}>// Request to protected endpoint:</div>
                  <div>GET /api/employees</div>
                  <div>↳ Header: Authorization: Bearer &lt;token&gt;</div>
                  <div>↳ Middleware: verifyToken() → <span style={{ color: '#10b981' }}>Valid</span></div>
                  <div>↳ RoleCheck: ['manager', 'hr'].includes(req.user.role) → <span style={{ color: '#10b981' }}>Authorized</span></div>
                  <div style={{ color: '#10b981', marginTop: 8 }}>✓ Response: 200 OK (Serialized JSON records)</div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5. Evaluation Sandbox (Clean, Professional Demo Access) */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="sandbox">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ fontWeight: 800, color: '#4f46e5', letterSpacing: 1.5 }}>
            EVALUATION SANDBOX
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mt: 0.5, mb: 1 }}>
            Pre-Configured Role Environments
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 640, mx: 'auto' }}>
            Select an operational profile below to authenticate into the system with pre-seeded organizational data.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* HR Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: '#4f46e5' }}>Profile Tier 1</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>HR Director</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', my: 1.5, fontSize: 13 }}>
                Full organization visibility, employee onboarding, announcement broadcasts, and organization attendance logs.
              </Typography>
              <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: 1.5, mb: 2.5, fontFamily: 'monospace', fontSize: 12 }}>
                <div>Email: <strong>hr@staffsync.com</strong></div>
                <div>Pass: <strong>Password123!</strong></div>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleQuickLogin('hr@staffsync.com')}
                sx={{ backgroundColor: '#0f172a', '&:hover': { backgroundColor: '#1e293b' }, textTransform: 'none', fontWeight: 600 }}
              >
                Access HR Workspace
              </Button>
            </Card>
          </Grid>

          {/* Manager Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: '#0891b2' }}>Profile Tier 2</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>Engineering Lead</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', my: 1.5, fontSize: 13 }}>
                Department supervision, direct report leave reviews, team presence tracking, and performance evaluations.
              </Typography>
              <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: 1.5, mb: 2.5, fontFamily: 'monospace', fontSize: 12 }}>
                <div>Email: <strong>manager@staffsync.com</strong></div>
                <div>Pass: <strong>Password123!</strong></div>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleQuickLogin('manager@staffsync.com')}
                sx={{ backgroundColor: '#0f172a', '&:hover': { backgroundColor: '#1e293b' }, textTransform: 'none', fontWeight: 600 }}
              >
                Access Manager Workspace
              </Button>
            </Card>
          </Grid>

          {/* Employee Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: '#059669' }}>Profile Tier 3</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>Senior Developer</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', my: 1.5, fontSize: 13 }}>
                Daily clock-in/out attendance logging, leave quota balance tracking, training certifications, and bulletins.
              </Typography>
              <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: 1.5, mb: 2.5, fontFamily: 'monospace', fontSize: 12 }}>
                <div>Email: <strong>employee@staffsync.com</strong></div>
                <div>Pass: <strong>Password123!</strong></div>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleQuickLogin('employee@staffsync.com')}
                sx={{ backgroundColor: '#0f172a', '&:hover': { backgroundColor: '#1e293b' }, textTransform: 'none', fontWeight: 600 }}
              >
                Access Employee Workspace
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 6. Corporate Technical Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid #e2e8f0', py: 5, backgroundColor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                StaffSync<span style={{ color: '#4f46e5' }}>.</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, maxWidth: 380 }}>
                Enterprise Human Resource Management Solution engineered on the MERN stack with strict Role-Based Access Control and multi-collection persistence.
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>
                Architecture
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, color: '#64748b', fontSize: 13 }}>
                <span>React 18 & Material UI</span>
                <span>Node.js & Express REST API</span>
                <span>MongoDB Atlas M0 Clustered</span>
                <span>JWT Cryptographic Tokens</span>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>
                Verification & Deliverables
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, color: '#64748b', fontSize: 13 }}>
                <span>Public GitHub: <a href="https://github.com/Keshav-Kasera/StaffSync" target="_blank" rel="noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Keshav-Kasera/StaffSync</a></span>
                <span>Database: 8 Mongoose Schema Entities</span>
                <span>License: MIT Standard Open Source</span>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              © 2026 StaffSync Platform. Full Stack Capstone Project.
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Authored by Keshav Kasera • MIT License
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
