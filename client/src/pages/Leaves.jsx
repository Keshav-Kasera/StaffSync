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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  EventNote as EventNoteIcon,
  PendingActions as PendingIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const Leaves = () => {
  const { user } = useAuth();

  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [myLeaves, setMyLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({ casual: 0, sick: 0, earned: 0 });
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [allLeaves, setAllLeaves] = useState([]);

  // Modal State
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [applyData, setApplyData] = useState({
    leaveType: 'Casual',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [applyError, setApplyError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Review modal state
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAction, setReviewAction] = useState('Approved');

  const fetchMyLeaves = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/leaves/my-leaves');
      if (res.data.success) {
        setMyLeaves(res.data.leaves);
        if (res.data.leaveBalance) {
          setLeaveBalance(res.data.leaveBalance);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingLeaves = async () => {
    try {
      const res = await axiosClient.get('/leaves/pending');
      if (res.data.success) {
        setPendingLeaves(res.data.leaves);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllLeaves = async () => {
    try {
      const res = await axiosClient.get('/leaves/all');
      if (res.data.success) {
        setAllLeaves(res.data.leaves);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
    if (user?.role === 'manager' || user?.role === 'hr') {
      fetchPendingLeaves();
    }
    if (user?.role === 'hr') {
      fetchAllLeaves();
    }
  }, [user]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyError('');

    if (!applyData.startDate || !applyData.endDate || !applyData.reason) {
      return setApplyError('Please fill out all required fields');
    }

    try {
      setSubmitting(true);
      const res = await axiosClient.post('/leaves', applyData);
      if (res.data.success) {
        setOpenApplyModal(false);
        setApplyData({ leaveType: 'Casual', startDate: '', endDate: '', reason: '' });
        fetchMyLeaves();
      }
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!selectedLeave) return;
    try {
      setSubmitting(true);
      await axiosClient.put(`/leaves/${selectedLeave._id}/status`, {
        status: reviewAction,
        reviewComment,
      });
      setOpenReviewModal(false);
      setSelectedLeave(null);
      setReviewComment('');
      fetchPendingLeaves();
      if (user?.role === 'hr') fetchAllLeaves();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update leave status');
    } finally {
      setSubmitting(false);
    }
  };

  const openDecisionDialog = (leave, action) => {
    setSelectedLeave(leave);
    setReviewAction(action);
    setReviewComment('');
    setOpenReviewModal(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Leave Management
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Submit time-off requests, monitor leave balances, and review departmental approvals.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenApplyModal(true)}
          sx={{ py: 1.2, px: 3 }}
        >
          Apply for Leave
        </Button>
      </Box>

      {/* Balance Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, borderLeft: '4px solid #4f46e5' }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              CASUAL LEAVE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', my: 1 }}>
              {leaveBalance?.casual || 0} Days
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Available annual allocation</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, borderLeft: '4px solid #06b6d4' }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              SICK LEAVE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', my: 1 }}>
              {leaveBalance?.sick || 0} Days
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Medical emergency balance</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, borderLeft: '4px solid #10b981' }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              EARNED / VACATION LEAVE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', my: 1 }}>
              {leaveBalance?.earned || 0} Days
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Accrued vacation time</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Tabs */}
      <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 3 }}>
        <Tab label="My Leave Applications" icon={<EventNoteIcon />} iconPosition="start" />
        {(user?.role === 'manager' || user?.role === 'hr') && (
          <Tab
            label={`Pending Approvals (${pendingLeaves.length})`}
            icon={<PendingIcon />}
            iconPosition="start"
          />
        )}
        {user?.role === 'hr' && (
          <Tab label="All Organization Leaves" icon={<EventNoteIcon />} iconPosition="start" />
        )}
      </Tabs>

      {/* Tab 0: My Leaves */}
      {tabIndex === 0 && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            My Applications & Status History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Days</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reviewer Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myLeaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">You have not submitted any leave requests yet</TableCell>
                  </TableRow>
                ) : (
                  myLeaves.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{l.leaveType}</TableCell>
                      <TableCell>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{l.totalDays} Days</TableCell>
                      <TableCell sx={{ maxWidth: 220 }}>{l.reason}</TableCell>
                      <TableCell>
                        <Chip
                          label={l.status}
                          size="small"
                          color={l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>
                        {l.reviewComment || '—'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 1: Pending Approvals (Manager & HR) */}
      {tabIndex === 1 && (user?.role === 'manager' || user?.role === 'hr') && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Requests Awaiting Decision
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Applicant</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Leave Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Dates</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Days</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reason</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Decision</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingLeaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No pending leave applications right now ✓</TableCell>
                  </TableRow>
                ) : (
                  pendingLeaves.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{l.user?.name}</TableCell>
                      <TableCell>{l.employee?.department || '—'}</TableCell>
                      <TableCell>{l.leaveType}</TableCell>
                      <TableCell>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{l.totalDays} Days</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>{l.reason}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => openDecisionDialog(l, 'Approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => openDecisionDialog(l, 'Rejected')}
                          >
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
      )}

      {/* Tab 2: All Company Leaves (HR only) */}
      {tabIndex === 2 && user?.role === 'hr' && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Company-Wide Leave Records
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Dates</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Days</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reviewed By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allLeaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No leave records</TableCell>
                  </TableRow>
                ) : (
                  allLeaves.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell sx={{ fontWeight: 600 }}>{l.user?.name}</TableCell>
                      <TableCell>{l.employee?.department}</TableCell>
                      <TableCell>{l.leaveType}</TableCell>
                      <TableCell>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{l.totalDays}</TableCell>
                      <TableCell>
                        <Chip
                          label={l.status}
                          size="small"
                          color={l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{l.reviewedBy ? l.reviewedBy.name : '—'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Apply Leave Dialog with Fixed Date Layout */}
      <Dialog open={openApplyModal} onClose={() => setOpenApplyModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Apply for Leave</DialogTitle>
        <DialogContent dividers>
          {applyError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {applyError}
            </Alert>
          )}
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.8 }}>
                LEAVE CATEGORY
              </Typography>
              <TextField
                select
                fullWidth
                size="medium"
                value={applyData.leaveType}
                onChange={(e) => setApplyData({ ...applyData, leaveType: e.target.value })}
              >
                <MenuItem value="Casual">Casual Leave (Available Balance: {leaveBalance?.casual || 0} Days)</MenuItem>
                <MenuItem value="Sick">Sick Leave (Available Balance: {leaveBalance?.sick || 0} Days)</MenuItem>
                <MenuItem value="Earned">Earned / Vacation (Available Balance: {leaveBalance?.earned || 0} Days)</MenuItem>
                <MenuItem value="Maternity/Paternity">Maternity/Paternity Leave</MenuItem>
                <MenuItem value="Unpaid">Unpaid Leave</MenuItem>
              </TextField>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.8 }}>
                  START DATE
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={applyData.startDate}
                  onChange={(e) => setApplyData({ ...applyData, startDate: e.target.value })}
                  inputProps={{ 'aria-label': 'Start Date' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.8 }}>
                  END DATE
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={applyData.endDate}
                  onChange={(e) => setApplyData({ ...applyData, endDate: e.target.value })}
                  inputProps={{ 'aria-label': 'End Date' }}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.8 }}>
                REASON FOR LEAVE
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Please state the reason for your time-off request..."
                value={applyData.reason}
                onChange={(e) => setApplyData({ ...applyData, reason: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenApplyModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApplySubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={openReviewModal} onClose={() => setOpenReviewModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          {reviewAction} Leave Application
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Applicant: <strong>{selectedLeave?.user?.name}</strong> ({selectedLeave?.leaveType} - {selectedLeave?.totalDays} Days)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comments / Notes (Optional)"
            placeholder="Add comments for the employee..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenReviewModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={reviewAction === 'Approved' ? 'success' : 'error'}
            onClick={handleReviewSubmit}
            disabled={submitting}
          >
            {submitting ? 'Processing...' : `Confirm ${reviewAction}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leaves;
