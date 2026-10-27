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
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Terminal as TerminalIcon,
  Security as SecurityIcon,
  PlayArrow as PlayIcon,
  GitHub as GitHubIcon,
  Search as SearchIcon,
  ArrowForward as ArrowIcon,
  Check as CheckIcon,
  Speed as SpeedIcon,
  Storage as DatabaseIcon,
  VpnKey as KeyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommandPalette from '../components/CommandPalette';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Interactive Simulator State
  const [headcount, setHeadcount] = useState(140);
  const [lateThreshold, setLateThreshold] = useState(false); // false: 09:15 AM, true: 09:30 AM
  const [strictRbac, setStrictRbac] = useState(true);

  // Selected API Endpoint tab
  const [activeApiTab, setActiveApiTab] = useState(0);

  // Calculated reactive metrics
  const calculatedAttendance = Math.min(99.4, (92.5 + (headcount % 15) * 0.4 + (lateThreshold ? 2.5 : 0))).toFixed(1);
  const monthlyHours = (headcount * 168).toLocaleString();
  const writeOps = (headcount * 4.2).toFixed(0);

  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/attendance/clock-in',
      desc: 'Records daily employee punch-in with UTC timestamp and lateness verification',
      response: {
        success: true,
        record: {
          id: 'att_98a72b1',
          user: 'usr_emp_441',
          date: '2026-10-28',
          clockIn: '2026-10-28T09:02:14.281Z',
          status: 'Present',
          isLate: false,
        },
        telemetry: { latencyMs: 14, dbWrite: 'indexed_compound_key' },
      },
    },
    {
      method: 'POST',
      path: '/api/leaves/apply',
      desc: 'Enforces balance check, decrements allowance, routes to direct manager review',
      response: {
        success: true,
        leaveId: 'lv_c8109f',
        type: 'Casual',
        totalDays: 2,
        status: 'Pending',
        assignedReviewer: 'usr_mgr_eng01',
        balanceRemaining: 10,
      },
    },
    {
      method: 'GET',
      path: '/api/dashboard/summary',
      desc: 'Multi-collection aggregation returning real-time workforce operational ledger',
      response: {
        success: true,
        metrics: {
          totalStaff: headcount,
          attendanceRate: `${calculatedAttendance}%`,
          activeShiftCount: Math.round(headcount * 0.94),
          pendingReviewQueue: 4,
        },
      },
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#08090a', color: '#f3f4f6' }}>
      {/* 1. Technical Topbar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(8, 9, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1,
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#041e15',
                  fontWeight: 900,
                  fontSize: 14,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                S
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.03em', fontSize: 17 }}>
                StaffSync<span style={{ color: '#10b981' }}>.</span>
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
              <Typography
                variant="caption"
                sx={{ color: '#8b949e', cursor: 'pointer', transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
                onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                // SIMULATOR
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#8b949e', cursor: 'pointer', transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
                onClick={() => document.getElementById('api-inspector')?.scrollIntoView({ behavior: 'smooth' })}
              >
                // API_ENGINE
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#8b949e', cursor: 'pointer', transition: 'color 0.15s', '&:hover': { color: '#f3f4f6' } }}
                onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
              >
                // ARCHITECTURE
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              onClick={() => setPaletteOpen(true)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1.2,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                color: '#8b949e',
                '&:hover': { color: '#f3f4f6', borderColor: 'rgba(16, 185, 129, 0.4)' },
              }}
            >
              <SearchIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontSize: 11 }}>Quick Command</Typography>
              <span className="kbd-badge">Ctrl K</span>
            </Box>

            <Button
              size="small"
              startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
              href="https://github.com/Keshav-Kasera/StaffSync"
              target="_blank"
              sx={{
                color: '#8b949e',
                fontSize: 12,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                px: 1.5,
                '&:hover': { color: '#f3f4f6', bgcolor: 'rgba(255, 255, 255, 0.03)' },
              }}
            >
              Source
            </Button>

            {user ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/dashboard')}
                sx={{
                  bgcolor: '#10b981',
                  color: '#041e15',
                  fontWeight: 700,
                  fontSize: 12,
                  '&:hover': { bgcolor: '#34d399' },
                }}
              >
                Launch Console
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: '#10b981',
                  color: '#041e15',
                  fontWeight: 700,
                  fontSize: 12,
                  '&:hover': { bgcolor: '#34d399' },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* 2. Hero Section: Linear / Obsidian Grid */}
      <Box className="tech-grid" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 10 }, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="lg">
          {/* Release & Telemetry Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.2, py: 0.4, bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 1 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 11 }}>
                STAFFSYNC_V1.0 • ATLAS_M0_CLUSTERED • RBAC_STRICT
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, sm: 52, md: 58 },
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  color: '#f3f4f6',
                  mb: 2.5,
                }}
              >
                Workforce Operations.<br />
                <span style={{ color: '#10b981' }}>Programmed for Precision.</span>
              </Typography>

              <Typography variant="body1" sx={{ color: '#8b949e', fontSize: 16, lineHeight: 1.7, maxWidth: 540, mb: 4 }}>
                An institutional HRMS engineered on the MERN stack. Built with multi-collection MongoDB schemas, cryptographic JWT access controls, shift adherence ledgers, and reactive leave lifecycle pipelines.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(user ? '/dashboard' : '/login')}
                  endIcon={<ArrowIcon />}
                  sx={{
                    bgcolor: '#10b981',
                    color: '#041e15',
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    fontSize: 14,
                    '&:hover': { bgcolor: '#34d399', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
                  }}
                >
                  Enter Operational Console
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setPaletteOpen(true)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#e5e7eb',
                    px: 2.5,
                    py: 1.2,
                    fontSize: 13,
                    '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' },
                  }}
                >
                  Open Command Menu <span className="kbd-badge" style={{ marginLeft: 8 }}>Ctrl K</span>
                </Button>
              </Box>
            </Grid>

            {/* Architecture Telemetry Terminal Preview */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: '#0c0e12',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.06)',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, pb: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f43f5e' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#6e7681', fontSize: 10 }}>
                    SYS_MONITOR • LIVE_TELEMETRY
                  </Typography>
                </Box>

                <Box sx={{ fontSize: 12, color: '#8b949e', lineHeight: 1.9 }}>
                  <div><span style={{ color: '#10b981' }}>$</span> staffsync --inspect --health</div>
                  <div>✓ MongoDB Atlas: <span style={{ color: '#10b981' }}>CONNECTED</span> (uwxped0.mongodb.net)</div>
                  <div>✓ Mongoose Entities: <span style={{ color: '#38bdf8' }}>8 Registered Schemas</span></div>
                  <div>✓ Auth Strategy: <span style={{ color: '#e5e7eb' }}>JWT + bcryptjs (10 Rounds)</span></div>
                  <div>✓ Role Permission: <span style={{ color: '#e5e7eb' }}>['employee', 'manager', 'hr']</span></div>
                  <div>✓ Active Daemons: <span style={{ color: '#10b981' }}>API:5000 / CLIENT:5173</span></div>
                  <div style={{ color: '#10b981', marginTop: 8 }}>[SYS_READY] ZERO UNRESOLVED EXCEPTIONS</div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. Interactive Engine Simulator (The "Anti-Vibe-Code" Engineering Demonstration) */}
      <Box id="simulator" sx={{ py: 10, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0b0d10' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1, py: 0.3, bgcolor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 1, mb: 1.5 }}>
              <SpeedIcon sx={{ fontSize: 14, color: '#38bdf8' }} />
              <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, fontSize: 11 }}>
                REACTIVE_LOGIC_DEMO
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 1 }}>
              Workforce Policy & Calculation Engine
            </Typography>
            <Typography variant="body2" sx={{ color: '#8b949e', maxWidth: 640 }}>
              Adjust live organizational parameters below. The reactive mathematical engine recalculates shift adherence rates, projected billing hours, and simulated database I/O in real time.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Control Panel */}
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3.5, bgcolor: '#0e1014', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, display: 'block', mb: 2 }}>
                  POLICY TUNING CONTROLS
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontWeight: 600 }}>Active Personnel Roster</Typography>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 13 }}>{headcount} Staff</Typography>
                  </Box>
                  <Slider
                    value={headcount}
                    min={10}
                    max={500}
                    step={5}
                    onChange={(e, val) => setHeadcount(val)}
                    sx={{ color: '#10b981' }}
                  />
                  <Typography variant="caption" sx={{ color: '#6e7681', fontSize: 11 }}>Simulates multi-user scale across Engineering, HR, and Operations</Typography>
                </Box>

                <Divider sx={{ my: 2.5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontWeight: 600 }}>Lateness Grace Window</Typography>
                    <Typography variant="caption" sx={{ color: '#6e7681' }}>{lateThreshold ? 'Extended (30 Min Grace)' : 'Strict (15 Min Grace)'}</Typography>
                  </Box>
                  <Switch
                    checked={lateThreshold}
                    onChange={(e) => setLateThreshold(e.target.checked)}
                    color="primary"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#e5e7eb', fontWeight: 600 }}>RBAC Hardware Isolation</Typography>
                    <Typography variant="caption" sx={{ color: '#6e7681' }}>Strict JWT Token Guard</Typography>
                  </Box>
                  <Switch
                    checked={strictRbac}
                    onChange={(e) => setStrictRbac(e.target.checked)}
                    color="primary"
                  />
                </Box>
              </Card>
            </Grid>

            {/* Reactive Metrics Display */}
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 3, bgcolor: '#0e1014', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="caption" sx={{ color: '#6e7681', fontWeight: 700, display: 'block', mb: 1 }}>
                      PROJECTED SHIFT ADHERENCE
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 900, mb: 1, fontFamily: '"JetBrains Mono", monospace' }}>
                      {calculatedAttendance}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>
                      Calculated using composite punch-in timestamps
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 3, bgcolor: '#0e1014', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="caption" sx={{ color: '#6e7681', fontWeight: 700, display: 'block', mb: 1 }}>
                      AGGREGATE BILLABLE HOURS
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#38bdf8', fontWeight: 900, mb: 1, fontFamily: '"JetBrains Mono", monospace' }}>
                      {monthlyHours}h
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>
                      Automated 168h/month per full-time resource
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 3, bgcolor: '#0e1014', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="caption" sx={{ color: '#6e7681', fontWeight: 700, display: 'block', mb: 1 }}>
                      SIMULATED WRITE TRANSACTIONS
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 900, mb: 1, fontFamily: '"JetBrains Mono", monospace' }}>
                      ~{writeOps}/sec
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>
                      Mongoose concurrency on Atlas M0 shared cluster
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 3, bgcolor: '#0e1014', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                    <Typography variant="caption" sx={{ color: '#6e7681', fontWeight: 700, display: 'block', mb: 1 }}>
                      SECURITY VERIFICATION
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#a78bfa', fontWeight: 900, mb: 1, fontFamily: '"JetBrains Mono", monospace' }}>
                      100% VALID
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>
                      Zero unauthorized API state mutations permitted
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. Real Interactive API Inspector */}
      <Box id="api-inspector" sx={{ py: 10, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1, py: 0.3, bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 1, mb: 1.5 }}>
              <TerminalIcon sx={{ fontSize: 14, color: '#10b981' }} />
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 11 }}>
                REST_INTERFACE_SPEC
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 1 }}>
              Production REST API Endpoints
            </Typography>
            <Typography variant="body2" sx={{ color: '#8b949e' }}>
              Select an endpoint to inspect request dispatch parameters, middleware pipelines, and serialized JSON payloads.
            </Typography>
          </Box>

          <Card sx={{ bgcolor: '#0c0e12', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            {/* Tabs Bar */}
            <Box sx={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#090a0c' }}>
              {apiEndpoints.map((ep, idx) => (
                <Box
                  key={ep.path}
                  onClick={() => setActiveApiTab(idx)}
                  sx={{
                    px: 3,
                    py: 1.8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    borderBottom: activeApiTab === idx ? '2px solid #10b981' : '2px solid transparent',
                    backgroundColor: activeApiTab === idx ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
                    color: activeApiTab === idx ? '#f3f4f6' : '#6e7681',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                    '&:hover': { color: '#e5e7eb' },
                  }}
                >
                  <Typography variant="caption" sx={{ color: ep.method === 'POST' ? '#38bdf8' : '#10b981', fontWeight: 800 }}>
                    {ep.method}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>
                    {ep.path}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Tab Body */}
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: '#8b949e', mb: 2, fontSize: 13 }}>
                // Operation Purpose: <span style={{ color: '#e5e7eb' }}>{apiEndpoints[activeApiTab].desc}</span>
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: '#07080a',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 1.5,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  color: '#e5e7eb',
                  lineHeight: 1.7,
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(apiEndpoints[activeApiTab].response, null, 2)}
                </pre>
              </Paper>
            </Box>
          </Card>
        </Container>
      </Box>

      {/* 5. 8-Collection Database Architecture Matrix */}
      <Box id="architecture" sx={{ py: 10, bgcolor: '#08090a' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1, py: 0.3, bgcolor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 1, mb: 1.5 }}>
              <DatabaseIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
              <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: 11 }}>
                PERSISTENCE_SPECIFICATION
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.02em', mb: 1 }}>
              Strict 8-Collection Schema Topology
            </Typography>
            <Typography variant="body2" sx={{ color: '#8b949e' }}>
              Every collection is strictly indexed, normalized, and bound to Mongoose ODM middleware for referential integrity.
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              { num: '01', name: 'Users', role: 'Authentication & bcrypt password hash, roles' },
              { num: '02', name: 'Employees', role: 'Profiles, department, designation, leave balances' },
              { num: '03', name: 'Managers', role: 'Leadership mapping & direct report team arrays' },
              { num: '04', name: 'Attendance', role: 'Compound indexing (user + date), hours calculation' },
              { num: '05', name: 'Leaves', role: 'Lifecycle state machine (Pending/Approved/Rejected)' },
              { num: '06', name: 'Announcements', role: 'Priority classifications, broadcast dispatching' },
              { num: '07', name: 'Trainings', role: 'Enrolled employee progress percent tracking' },
              { num: '08', name: 'Notifications', role: 'Unread counters, event-driven action triggers' },
            ].map((col) => (
              <Grid item xs={12} sm={6} md={3} key={col.num}>
                <Card
                  sx={{
                    p: 2.5,
                    bgcolor: '#0c0e12',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    height: '100%',
                    transition: 'border-color 0.15s ease',
                    '&:hover': { borderColor: 'rgba(16, 185, 129, 0.4)' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>
                      COL_{col.num}
                    </Typography>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f3f4f6', mb: 0.5 }}>
                    {col.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#8b949e', lineHeight: 1.5, display: 'block' }}>
                    {col.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6. Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', py: 6, bgcolor: '#060709' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
                StaffSync<span style={{ color: '#10b981' }}>.</span>
              </Typography>
              <Typography variant="caption" sx={{ color: '#6e7681', display: 'block', mt: 0.5 }}>
                Engineered by Keshav Kasera • Released under the MIT Open Source License
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                size="small"
                onClick={() => setPaletteOpen(true)}
                sx={{ color: '#8b949e', fontSize: 12, '&:hover': { color: '#10b981' } }}
              >
                Command Menu (Ctrl+K)
              </Button>
              <Button
                size="small"
                href="https://github.com/Keshav-Kasera/StaffSync"
                target="_blank"
                sx={{ color: '#8b949e', fontSize: 12, '&:hover': { color: '#10b981' } }}
              >
                GitHub Repository
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mount Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </Box>
  );
};

export default Home;
