import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Chip,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const Navbar = ({ onMobileToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorNotif, setAnchorNotif] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await axiosClient.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      // Quiet fail if not yet ready
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // 30s polling
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleMarkAllRead = async () => {
    try {
      await axiosClient.put('/notifications/read-all');
      setUnreadCount(0);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'hr':
        return 'secondary';
      case 'manager':
        return 'primary';
      default:
        return 'success';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'hr':
        return 'HR Personnel';
      case 'manager':
        return 'Department Manager';
      default:
        return 'Employee';
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        borderBottom: '1px solid #e2e8f0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMobileToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              S
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark' }}>
              Staff<span style={{ color: '#06b6d4' }}>Sync</span>
            </Typography>
          </Box>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={getRoleLabel(user.role)}
              color={getRoleBadgeColor(user.role)}
              size="small"
              sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
            />

            {/* Notifications Menu */}
            <IconButton color="inherit" onClick={(e) => setAnchorNotif(e.currentTarget)}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon sx={{ color: '#64748b' }} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorNotif}
              open={Boolean(anchorNotif)}
              onClose={() => setAnchorNotif(null)}
              PaperProps={{ sx: { width: 340, maxHeight: 400 } }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Notifications ({unreadCount} new)
                </Typography>
                {unreadCount > 0 && (
                  <Typography
                    variant="caption"
                    onClick={handleMarkAllRead}
                    sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark all read
                  </Typography>
                )}
              </Box>
              <Divider />
              {notifications.length === 0 ? (
                <MenuItem disabled>No notifications</MenuItem>
              ) : (
                notifications.slice(0, 6).map((n) => (
                  <MenuItem
                    key={n._id}
                    onClick={() => {
                      setAnchorNotif(null);
                      if (n.link) navigate(n.link);
                    }}
                    sx={{
                      backgroundColor: n.read ? 'transparent' : 'rgba(79, 70, 229, 0.05)',
                      py: 1,
                      whiteSpace: 'normal',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 700 }}>
                        {n.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {n.message}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>

            {/* User Profile Avatar & Dropdown */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
              onClick={(e) => setAnchorUser(e.currentTarget)}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 36,
                  height: 36,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Menu
              anchorEl={anchorUser}
              open={Boolean(anchorUser)}
              onClose={() => setAnchorUser(null)}
              PaperProps={{ sx: { width: 200 } }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorUser(null);
                  navigate('/profile');
                }}
              >
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  setAnchorUser(null);
                  logout();
                  navigate('/login');
                }}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
