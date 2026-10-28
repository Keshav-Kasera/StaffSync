import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Pagination,
  TextField,
  MenuItem,
  Skeleton,
} from '@mui/material';
import {
  AccessTime as ClockIcon,
  CheckCircle as PresentIcon,
  Warning as LateIcon,
  History as HistoryIcon,
  Download as DownloadIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axiosClient from '../api/axiosClient';
import { exportToCsv } from '../utils/exportCsv';
import EmptyState from '../components/EmptyState';

const Attendance = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState(null);
  const [myHistory, setMyHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPages, setHistoryPages] = useState(1);
  const [teamRecords, setTeamRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch today status
  const fetchToday = async () => {
    try {
      const res = await axiosClient.get('/attendance/today');
      if (res.data.success) {
        setTodayRecord(res.data.attendance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch personal history
  const fetchMyHistory = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/attendance/my-history?page=${page}&limit=10`);
      if (res.data.success) {
        setMyHistory(res.data.records);
        setHistoryPages(res.data.pages || 1);
      }
    } catch (err) {
      setError('Failed to load attendance history');
    } finally {
      setLoading(false);
    }
  };

  // Fetch team attendance (Manager)
  const fetchTeamAttendance = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/attendance/team');
      if (res.data.success) {
        setTeamRecords(res.data.records);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all attendance (HR)
  const fetchAllAttendance = async (page = 1, status = '') => {
    try {
      setLoading(true);
      const query = `/attendance/all?page=${page}&limit=15${status ? `&status=${status}` : ''}`;
      const res = await axiosClient.get(query);
      if (res.data.success) {
        setAllRecords(res.data.records);
        setAllPages(res.data.pages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
    fetchMyHistory(historyPage);

    if (user?.role === 'manager' || user?.role === 'hr') {
      fetchTeamAttendance();
    }
    if (user?.role === 'hr') {
      fetchAllAttendance(allPage, statusFilter);
    }
  }, [user]);

  const handleClockIn = async () => {
    try {
      setActionLoading(true);
      await axiosClient.post('/attendance/clock-in');
      toast.success('Successfully clocked in for today');
      await fetchToday();
      fetchMyHistory(1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Clock-in failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setActionLoading(true);
      await axiosClient.post('/attendance/clock-out');
      toast.success('Successfully clocked out. Have a great evening!');
      await fetchToday();
      fetchMyHistory(1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Clock-out failed');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Present':
        return <Chip label="Present" color="success" size="small" icon={<PresentIcon />} />;
      case 'Late':
        return <Chip label="Late" color="warning" size="small" icon={<LateIcon />} />;
      case 'Half-day':
        return <Chip label="Half-day" color="info" size="small" />;
      default:
        return <Chip label={status || 'Absent'} color="error" size="small" />;
    }
  };

  const handleExportMyHistory = () => {
    const headers = ['Date', 'Clock In', 'Clock Out', 'Total Hours', 'Status'];
    const rows = myHistory.map((r) => [
      r.date,
      new Date(r.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      r.clockOut ? new Date(r.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active',
      r.totalHours || 0,
      r.status,
    ]);
    exportToCsv('My_Attendance_Records', headers, rows);
  };

  const handleExportTeam = () => {
    const headers = ['Employee', 'Department', 'Date', 'Clock In', 'Clock Out', 'Status'];
    const rows = teamRecords.map((r) => [
      r.user?.name || '',
      r.employee?.department || '',
      r.date,
      new Date(r.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      r.clockOut ? new Date(r.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active',
      r.status,
    ]);
    exportToCsv('Team_Attendance_Ledger', headers, rows);
  };

  const handleExportAll = () => {
    const headers = ['Employee', 'Department', 'Date', 'Clock In', 'Clock Out', 'Hours', 'Status'];
    const rows = allRecords.map((r) => [
      r.user?.name || '',
      r.employee?.department || '',
      r.date,
      new Date(r.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      r.clockOut ? new Date(r.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active',
      r.totalHours || 0,
      r.status,
    ]);
    exportToCsv('Company_Wide_Attendance_Audit', headers, rows);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
          Attendance Tracking
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', mt: 0.5 }}>
          Log your daily hours, review past punches, and monitor organizational presence.
        </Typography>
      </Box>

      {/* Clock-In Widget */}
      <Card sx={{ mb: 4, p: 3, border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 2, bgcolor: '#0f1115' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <ClockIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
                  Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {todayRecord
                    ? `Clocked In at ${new Date(todayRecord.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${
                        todayRecord.clockOut
                          ? ` • Clocked Out at ${new Date(todayRecord.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${todayRecord.totalHours} hrs)`
                          : ' • Currently Active'
                      }`
                    : 'You have not marked attendance today.'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
            {!todayRecord ? (
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleClockIn}
                disabled={actionLoading}
                startIcon={<PresentIcon />}
                sx={{ py: 1.5, px: 4 }}
              >
                {actionLoading ? 'Clocking In...' : 'Clock In'}
              </Button>
            ) : !todayRecord.clockOut ? (
              <Button
                variant="contained"
                size="large"
                color="warning"
                onClick={handleClockOut}
                disabled={actionLoading}
                startIcon={<ClockIcon />}
                sx={{ py: 1.5, px: 4 }}
              >
                {actionLoading ? 'Clocking Out...' : 'Clock Out'}
              </Button>
            ) : (
              <Chip label="Daily Shift Completed" color="success" variant="outlined" sx={{ fontWeight: 700, p: 2 }} />
            )}
          </Grid>
        </Grid>
      </Card>

      {/* Tabs navigation for different views */}
      <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 3 }}>
        <Tab label="My Attendance Log" icon={<HistoryIcon />} iconPosition="start" />
        {(user?.role === 'manager' || user?.role === 'hr') && (
          <Tab label="Team Attendance" icon={<PresentIcon />} iconPosition="start" />
        )}
        {user?.role === 'hr' && (
          <Tab label="Organization-Wide Log" icon={<ClockIcon />} iconPosition="start" />
        )}
      </Tabs>

      {/* Tab 0: My Log */}
      {tabIndex === 0 && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              My Monthly Attendance Records
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
              onClick={handleExportMyHistory}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#8b949e', fontSize: 12, '&:hover': { borderColor: '#10b981', color: '#10b981' } }}
            >
              Export CSV
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Clock In</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Clock Out</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total Hours</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [1, 2, 3, 4].map((idx) => (
                    <TableRow key={idx}>
                      <TableCell><Skeleton width={90} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={70} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                    </TableRow>
                  ))
                ) : myHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0 }}>
                      <EmptyState
                        icon={<HistoryIcon sx={{ fontSize: 26 }} />}
                        title="No attendance records found"
                        description="You have not clocked in yet. Use the Clock In button above to start your shift."
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  myHistory.map((rec) => (
                    <TableRow key={rec._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{rec.date}</TableCell>
                      <TableCell>{new Date(rec.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>
                        {rec.clockOut ? new Date(rec.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </TableCell>
                      <TableCell>{rec.totalHours ? `${rec.totalHours} hrs` : '—'}</TableCell>
                      <TableCell>{getStatusChip(rec.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {historyPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={historyPages}
                page={historyPage}
                onChange={(e, val) => {
                  setHistoryPage(val);
                  fetchMyHistory(val);
                }}
                color="primary"
              />
            </Box>
          )}
        </Card>
      )}

      {/* Tab 1: Team Log */}
      {tabIndex === 1 && (user?.role === 'manager' || user?.role === 'hr') && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Team Member Attendance Records
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
              onClick={handleExportTeam}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#8b949e', fontSize: 12, '&:hover': { borderColor: '#10b981', color: '#10b981' } }}
            >
              Export CSV
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Clock In</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Clock Out</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0 }}>
                      <EmptyState
                        icon={<TeamIcon sx={{ fontSize: 26 }} />}
                        title="No team records found"
                        description="There are currently no attendance entries recorded for your team members."
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  teamRecords.map((rec) => (
                    <TableRow key={rec._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{rec.user?.name}</TableCell>
                      <TableCell>{rec.employee?.department}</TableCell>
                      <TableCell>{rec.date}</TableCell>
                      <TableCell>{new Date(rec.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>
                        {rec.clockOut ? new Date(rec.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'In Progress'}
                      </TableCell>
                      <TableCell>{getStatusChip(rec.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 2: All Records (HR Only) */}
      {tabIndex === 2 && user?.role === 'hr' && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Organization-Wide Attendance Log
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                onClick={handleExportAll}
                sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#8b949e', fontSize: 12, '&:hover': { borderColor: '#10b981', color: '#10b981' } }}
              >
                Export CSV
              </Button>
              <TextField
                select
                size="small"
                label="Filter by Status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  fetchAllAttendance(1, e.target.value);
                }}
                sx={{ width: 180 }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Late">Late</MenuItem>
                <MenuItem value="Half-day">Half-day</MenuItem>
              </TextField>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Clock In / Out</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hours</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0 }}>
                      <EmptyState
                        icon={<HistoryIcon sx={{ fontSize: 26 }} />}
                        title="No attendance records match"
                        description="There are no company attendance logs matching the selected status filter."
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  allRecords.map((rec) => (
                    <TableRow key={rec._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{rec.user?.name}</TableCell>
                      <TableCell>{rec.employee?.department}</TableCell>
                      <TableCell>{rec.date}</TableCell>
                      <TableCell>
                        {new Date(rec.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {rec.clockOut ? new Date(rec.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active'}
                      </TableCell>
                      <TableCell>{rec.totalHours ? `${rec.totalHours} hrs` : '—'}</TableCell>
                      <TableCell>{getStatusChip(rec.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {allPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={allPages}
                page={allPage}
                onChange={(e, val) => {
                  setAllPage(val);
                  fetchAllAttendance(val, statusFilter);
                }}
                color="primary"
              />
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
};

export default Attendance;
