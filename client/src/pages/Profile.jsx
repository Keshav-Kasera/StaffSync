import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  Button,
  Chip,
  Avatar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const Profile = () => {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.employeeProfile?.phone || '');
  const [address, setAddress] = useState(user?.employeeProfile?.address || '');
  const [skills, setSkills] = useState(user?.employeeProfile?.skills?.join(', ') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    try {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
      const res = await axiosClient.put('/auth/profile', {
        name,
        phone,
        address,
        skills: skillsArray,
      });
      if (res.data.success) {
        setMessage('Profile updated successfully!');
        await refreshUser();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#f3f4f6' }}>
          My Profile & Settings
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', mt: 0.5 }}>
          Manage your personal information, contact methods, and account security.
        </Typography>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* User Summary Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {user?.email}
            </Typography>
            <Chip
              label={user?.role?.toUpperCase()}
              color="primary"
              sx={{ fontWeight: 700, mb: 3 }}
            />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Department: <strong>{user?.employeeProfile?.department || 'Operations'}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Employee ID: <strong>{user?.employeeProfile?.employeeId || 'ID-PENDING'}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Account Status: <strong>{user?.status || 'Active'}</strong>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Edit Form Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Personal Details & Preferences
            </Typography>
            <Box component="form" onSubmit={handleUpdate} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                disabled
                label="Email Address"
                value={user?.email || ''}
                helperText="Email cannot be changed directly"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Skills (Comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                helperText="e.g. JavaScript, React, Node.js, Project Management"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={saving}
                  sx={{ py: 1.2, px: 4 }}
                >
                  {saving ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
