import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
} from '@mui/material';
import {
  School as SchoolIcon,
  Add as AddIcon,
  CheckCircle as CompleteIcon,
  Schedule as DurationIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const Training = () => {
  const { user } = useAuth();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openProgressModal, setOpenProgressModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    category: 'Engineering & Tech',
    duration: '3 Weeks',
    materialsUrl: '',
  });

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/trainings');
      if (res.data.success) {
        setTrainings(res.data.trainings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/trainings', createData);
      setOpenCreateModal(false);
      setCreateData({
        title: '',
        description: '',
        category: 'Engineering & Tech',
        duration: '3 Weeks',
        materialsUrl: '',
      });
      fetchTrainings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create training');
    }
  };

  const handleProgressSubmit = async () => {
    if (!selectedTraining) return;
    try {
      await axiosClient.put(`/trainings/${selectedTraining._id}/progress`, {
        progressPercentage: currentProgress,
        status: currentProgress === 100 ? 'Completed' : 'In Progress',
      });
      setOpenProgressModal(false);
      fetchTrainings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update progress');
    }
  };

  // Find user's progress percentage if enrolled
  const getEnrollmentProgress = (t) => {
    if (!t.enrolledEmployees) return 0;
    const match = t.enrolledEmployees.find(
      (e) => (e.user && (e.user._id === user?._id || e.user === user?._id))
    );
    return match ? match.progressPercentage : 0;
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
            Training & Upskilling Programs
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mt: 0.5 }}>
            Enroll in professional skill certifications and monitor developmental milestones.
          </Typography>
        </Box>
        {(user?.role === 'manager' || user?.role === 'hr') && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateModal(true)}
            sx={{ py: 1.2, px: 3 }}
          >
            Create Program
          </Button>
        )}
      </Box>

      {/* Grid of Programs */}
      <Grid container spacing={3}>
        {trainings.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ p: 6, textAlign: 'center', bgcolor: '#0f1115' }}>
              <SchoolIcon sx={{ fontSize: 48, color: '#6e7681', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#8b949e' }}>
                No active training modules available
              </Typography>
            </Card>
          </Grid>
        ) : (
          trainings.map((t) => {
            const progress = getEnrollmentProgress(t);
            return (
              <Grid item xs={12} md={6} key={t._id}>
                <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f1115', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip label={t.category} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                    <Chip
                      icon={<DurationIcon sx={{ fontSize: 14 }} />}
                      label={t.duration}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#f3f4f6' }}>
                    {t.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', flexGrow: 1, mb: 3, lineHeight: 1.6 }}>
                    {t.description}
                  </Typography>

                  {/* Progress section for Employees */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Completion Progress
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: progress === 100 ? 'success.main' : 'primary.main' }}>
                        {progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color={progress === 100 ? 'success' : 'primary'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid #f1f5f9' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Assigned by <strong>{t.assignedBy?.name || 'Department Head'}</strong>
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSelectedTraining(t);
                        setCurrentProgress(progress);
                        setOpenProgressModal(true);
                      }}
                    >
                      {progress === 100 ? 'Review Module' : 'Update Progress'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* Progress Dialog */}
      <Dialog open={openProgressModal} onClose={() => setOpenProgressModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Update Completion</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Course: <strong>{selectedTraining?.title}</strong>
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
            Progress: {currentProgress}%
          </Typography>
          <Slider
            value={currentProgress}
            onChange={(e, val) => setCurrentProgress(val)}
            valueLabelDisplay="auto"
            step={5}
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' },
            ]}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenProgressModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleProgressSubmit}>
            Save Progress
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Program Dialog */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Create Training Program</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              required
              fullWidth
              label="Course / Program Title"
              value={createData.title}
              onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Category"
              value={createData.category}
              onChange={(e) => setCreateData({ ...createData, category: e.target.value })}
            />
            <TextField
              fullWidth
              label="Estimated Duration (e.g. 2 Weeks, 10 Hours)"
              value={createData.duration}
              onChange={(e) => setCreateData({ ...createData, duration: e.target.value })}
            />
            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="Course Description & Learning Outcomes"
              value={createData.description}
              onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateSubmit}>
            Publish Program
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Training;
