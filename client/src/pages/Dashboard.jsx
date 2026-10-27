import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  SupervisorAccount as SupervisorIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as PendingIcon,
  AccessTime as AccessTimeIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  ArrowForward as ArrowForwardIcon,
  EventNote as EventNoteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

// Palette mapping for Obsidian Technical Grid
const colorStyles = {
  primary: {
    bg: 'rgba(16, 185, 129, 0.1)',
    iconColor: '#10b981',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  secondary: {
    bg: 'rgba(56, 189, 248, 0.1)',
    iconColor: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.3)',
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.1)',
    iconColor: '#10b981',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.3)',
  },
};

const StatCard = ({ title, value, icon, color = 'primary', subtitle, action }) => {
  const currentStyle = colorStyles[color] || colorStyles.primary;

  return (
    <Card
      sx={{
        height: '100%',
        p: 2.8,
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0f1115',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.15s ease',
        '&:hover': {
          borderColor: 'rgba(16, 185, 129, 0.3)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ pr: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: '#8b949e',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontSize: 10,
              fontFamily: '"JetBrains Mono", monospace',
              display: 'block',
              mb: 0.8,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: '#f3f4f6',
              lineHeight: 1.1,
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '-0.03em',
            }}
          >
            {value}
          </Typography>
        </Box>

        {/* Clean, perfectly centered icon badge */}
        <Box
          sx={{
            width: 44,
            height: 44,
            minWidth: 44,
            borderRadius: 1.5,
            backgroundColor: currentStyle.bg,
            border: `1px solid ${currentStyle.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentStyle.iconColor,
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 22, color: currentStyle.iconColor } })}
        </Box>
      </Box>

      {subtitle && (
        <Typography variant="body2" sx={{ color: '#8b949e', fontSize: 13 }}>
          {subtitle}
        </Typography>
      )}

      {action && <Box sx={{ mt: 1.5 }}>{action}</Box>}
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [clocking, setClocking] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/dashboard/summary');
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleClockIn = async () => {
    try {
      setClocking(true);
      await axiosClient.post('/attendance/clock-in');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Clock-in failed');
    } finally {
      setClocking(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setClocking(true);
      await axiosClient.post('/attendance/clock-out');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Clock-out failed');
    } finally {
      setClocking(false);
    }
  };

  const handleLeaveDecision = async (leaveId, status) => {
    try {
      await axiosClient.put(`/leaves/${leaveId}/status`, { status, reviewComment: `Quick ${status.toLowerCase()} from dashboard` });
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 3, bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#fb7185' }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
            Welcome back, {user?.name}
          </Typography>
          <Typography variant="body1" sx={{ color: '#8b949e', mt: 0.5 }}>
            Operational workforce telemetry and governance ledger.
          </Typography>
        </Box>
        <Chip
          label={`ROLE: ${user?.role?.toUpperCase()}`}
          sx={{
            fontWeight: 700,
            px: 1,
            bgcolor: user?.role === 'hr' ? 'rgba(16, 185, 129, 0.12)' : user?.role === 'manager' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(167, 139, 250, 0.12)',
            color: user?.role === 'hr' ? '#10b981' : user?.role === 'manager' ? '#38bdf8' : '#a78bfa',
            border: '1px solid currentColor',
          }}
        />
      </Box>

      {/* HR VIEW */}
      {user?.role === 'hr' && data && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Employees"
                value={data.metrics.totalEmployees}
                icon={<PeopleIcon />}
                color="primary"
                subtitle="Active workforce records"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Managers"
                value={data.metrics.totalManagers}
                icon={<SupervisorIcon />}
                color="secondary"
                subtitle="Department leadership"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Today's Attendance"
                value={`${data.metrics.attendanceRate}%`}
                icon={<CheckCircleIcon />}
                color="success"
                subtitle={`${data.metrics.todayPresent} clocked in today`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending Leaves"
                value={data.metrics.pendingLeavesCount}
                icon={<PendingIcon />}
                color="warning"
                subtitle="Awaiting administrative review"
              />
            </Grid>
          </Grid>

          {/* Department Breakdown & Recent Leaves */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card sx={{ p: 3, height: '100%', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0f1115' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                    Recent Leave Applications
                  </Typography>
                  <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/leaves')} sx={{ color: '#10b981' }}>
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Employee</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Days</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Status</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.recentLeaves?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ color: '#6e7681', py: 3 }}>
                            No recent leave requests
                          </TableCell>
                        </TableRow>
                      ) : (
                        data.recentLeaves?.map((leave) => (
                          <TableRow key={leave._id}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#f3f4f6' }}>{leave.user?.name}</Typography>
                              <Typography variant="caption" sx={{ color: '#8b949e' }}>{leave.employee?.department}</Typography>
                            </TableCell>
                            <TableCell sx={{ color: '#e2e8f0' }}>{leave.leaveType}</TableCell>
                            <TableCell sx={{ color: '#e2e8f0' }}>{leave.totalDays}</TableCell>
                            <TableCell>
                              <Chip
                                label={leave.status}
                                size="small"
                                color={leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'error' : 'warning'}
                              />
                            </TableCell>
                            <TableCell align="right">
                              {leave.status === 'Pending' ? (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                  <Tooltip title="Approve">
                                    <IconButton size="small" color="success" onClick={() => handleLeaveDecision(leave._id, 'Approved')}>
                                      <ApproveIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Reject">
                                    <IconButton size="small" color="error" onClick={() => handleLeaveDecision(leave._id, 'Rejected')}>
                                      <RejectIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              ) : (
                                <Typography variant="caption" sx={{ color: '#6e7681' }}>Resolved</Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            {/* Department Breakdown */}
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3, height: '100%', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0f1115' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#f3f4f6' }}>
                  Department Distribution
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {data.metrics.departmentStats?.map((dept) => (
                    <Box
                      key={dept._id}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f3f4f6' }}>{dept._id || 'Unassigned'}</Typography>
                      <Chip label={`${dept.count} Members`} size="small" sx={{ color: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }} />
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* MANAGER VIEW */}
      {user?.role === 'manager' && data && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="My Team Members"
                value={data.metrics.teamCount}
                icon={<PeopleIcon />}
                color="primary"
                subtitle="Direct reports"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Team Attendance Today"
                value={data.metrics.todayTeamPresent}
                icon={<CheckCircleIcon />}
                color="success"
                subtitle={`Out of ${data.metrics.teamCount} present`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending Leaves"
                value={data.metrics.pendingLeavesCount}
                icon={<PendingIcon />}
                color="warning"
                subtitle="Requires your review"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Trainings"
                value={data.metrics.activeTrainings}
                icon={<EventNoteIcon />}
                color="secondary"
                subtitle="Programs assigned by you"
              />
            </Grid>
          </Grid>

          <Card sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0f1115' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                Pending Team Leave Requests
              </Typography>
              <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/leaves')} sx={{ color: '#10b981' }}>
                Manage Leaves
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Member</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Dates</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Days</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#94a3b8 !important' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.recentTeamLeaves?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: '#6e7681', py: 3 }}>
                        No pending leave requests from your team
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.recentTeamLeaves?.map((leave) => (
                      <TableRow key={leave._id}>
                        <TableCell sx={{ fontWeight: 600, color: '#f3f4f6' }}>{leave.user?.name}</TableCell>
                        <TableCell sx={{ color: '#e2e8f0' }}>{leave.leaveType}</TableCell>
                        <TableCell sx={{ color: '#e2e8f0' }}>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ color: '#e2e8f0' }}>{leave.totalDays} Days</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button size="small" variant="contained" color="success" onClick={() => handleLeaveDecision(leave._id, 'Approved')}>
                              Approve
                            </Button>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleLeaveDecision(leave._id, 'Rejected')}>
                              Reject
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </>
      )}

      {/* EMPLOYEE VIEW */}
      {user?.role === 'employee' && data && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Clock-In / Clock-Out Interactive Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', p: 3, borderRadius: 2, bgcolor: '#0f1115', border: '1px solid', borderColor: data.metrics.isClockedIn ? (data.metrics.isClockedOut ? 'rgba(255, 255, 255, 0.08)' : '#10b981') : 'rgba(255, 255, 255, 0.12)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 10 }}>
                    TODAY'S ATTENDANCE
                  </Typography>
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
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#f3f4f6' }}>
                  {data.metrics.isClockedIn ? (data.metrics.isClockedOut ? 'Shift Completed' : 'Clocked In') : 'Not Clocked In'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8b949e', mb: 2.5 }}>
                  {data.metrics.isClockedIn
                    ? `Clock-in recorded at ${new Date(data.todayAttendanceRecord?.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'Remember to mark your attendance before 9:30 AM'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {!data.metrics.isClockedIn ? (
                    <Button variant="contained" color="primary" fullWidth onClick={handleClockIn} disabled={clocking}>
                      {clocking ? 'Clocking In...' : 'Clock In Now'}
                    </Button>
                  ) : !data.metrics.isClockedOut ? (
                    <Button variant="contained" color="warning" fullWidth onClick={handleClockOut} disabled={clocking}>
                      {clocking ? 'Clocking Out...' : 'Clock Out'}
                    </Button>
                  ) : (
                    <Button variant="outlined" fullWidth disabled sx={{ fontWeight: 600, color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                      Shift Completed
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Attendance Days this month */}
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Days Present This Month"
                value={`${data.metrics.monthPresentCount} Days`}
                icon={<CheckCircleIcon />}
                color="success"
                subtitle="Total verified attendance"
                action={
                  <Button size="small" onClick={() => navigate('/attendance')} sx={{ color: '#10b981', p: 0 }}>
                    View Full Attendance Log →
                  </Button>
                }
              />
            </Grid>

            {/* Leave Balance Overview */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', p: 3, borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0f1115' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 10 }}>
                    LEAVE BALANCES
                  </Typography>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#38bdf8',
                    }}
                  >
                    <EventNoteIcon sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                  <Box sx={{ textAlign: 'center', flex: 1, p: 1, bgcolor: 'rgba(255, 255, 255, 0.02)', borderRadius: 1.5, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981', fontFamily: '"JetBrains Mono", monospace' }}>
                      {data.metrics.leaveBalance?.casual || 0}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>Casual</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', flex: 1, p: 1, bgcolor: 'rgba(255, 255, 255, 0.02)', borderRadius: 1.5, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#38bdf8', fontFamily: '"JetBrains Mono", monospace' }}>
                      {data.metrics.leaveBalance?.sick || 0}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>Sick</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', flex: 1, p: 1, bgcolor: 'rgba(255, 255, 255, 0.02)', borderRadius: 1.5, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#f59e0b', fontFamily: '"JetBrains Mono", monospace' }}>
                      {data.metrics.leaveBalance?.earned || 0}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b949e' }}>Earned</Typography>
                  </Box>
                </Box>
                <Button variant="outlined" fullWidth onClick={() => navigate('/leaves')} sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', color: '#e5e7eb' }}>
                  Apply For Leave
                </Button>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* Announcements Noticeboard */}
      <Card sx={{ p: 3, mt: 4, borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: '#0f1115' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
            Corporate Bulletins & Announcements
          </Typography>
          <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/announcements')} sx={{ color: '#10b981' }}>
            All Notices
          </Button>
        </Box>
        <Grid container spacing={2}>
          {data?.announcements?.map((item) => (
            <Grid item xs={12} md={6} key={item._id}>
              <Box
                sx={{
                  p: 2.2,
                  borderRadius: 1.5,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: item.pinned ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {item.pinned && <Chip label="PINNED" size="small" color="primary" sx={{ fontSize: 10, height: 20 }} />}
                  <Chip label={item.category} size="small" variant="outlined" sx={{ fontSize: 10, height: 20 }} />
                  <Typography variant="caption" sx={{ color: '#6e7681', ml: 'auto' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                  {item.content}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default Dashboard;
