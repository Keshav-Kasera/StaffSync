import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Add as AddIcon,
  PushPin as PinIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const Announcements = () => {
  const { user } = useAuth();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    priority: 'Medium',
    pinned: false,
  });

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/announcements');
      if (res.data.success) {
        setAnnouncements(res.data.announcements);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/announcements', formData);
      setOpenModal(false);
      setFormData({
        title: '',
        content: '',
        category: 'General',
        priority: 'Medium',
        pinned: false,
      });
      fetchAnnouncements();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post announcement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await axiosClient.delete(`/announcements/${id}`);
        fetchAnnouncements();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete announcement');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Company Announcements
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Stay updated with official bulletins, policy updates, and corporate notices.
          </Typography>
        </Box>
        {user?.role === 'hr' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ py: 1.2, px: 3 }}
          >
            New Announcement
          </Button>
        )}
      </Box>

      {/* Grid of Announcements */}
      <Grid container spacing={3}>
        {announcements.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ p: 6, textAlign: 'center' }}>
              <CampaignIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No active announcements at this time
              </Typography>
            </Card>
          </Grid>
        ) : (
          announcements.map((a) => (
            <Grid item xs={12} md={6} key={a._id}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: a.pinned ? '2px solid' : '1px solid',
                  borderColor: a.pinned ? 'primary.main' : '#e2e8f0',
                  boxShadow: a.pinned ? '0 4px 20px rgba(79, 70, 229, 0.12)' : 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {a.pinned && (
                      <Chip
                        icon={<PinIcon sx={{ fontSize: 14 }} />}
                        label="PINNED"
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 700, fontSize: 11 }}
                      />
                    )}
                    <Chip label={a.category} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                    <Chip
                      label={a.priority}
                      size="small"
                      color={a.priority === 'Urgent' || a.priority === 'High' ? 'error' : 'default'}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  {user?.role === 'hr' && (
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(a._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: '#0f172a' }}>
                  {a.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1, lineHeight: 1.7 }}>
                  {a.content}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Posted by <strong>{a.author?.name || 'HR Team'}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(a.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Publish Announcement</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              required
              fullWidth
              label="Headline / Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Company News">Company News</MenuItem>
                  <MenuItem value="Policy">Policy Update</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Urgent">Urgent Notice</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Priority Level"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Detailed Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.pinned}
                  onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                  color="primary"
                />
              }
              label="Pin this notice to top of dashboard"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateSubmit}>
            Broadcast Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Announcements;
