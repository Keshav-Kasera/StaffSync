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
  Search as SearchIcon,
  Logout as LogoutIcon,
  Badge as BadgeIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const Navbar = ({ onMobileToggle, onOpenCommandPalette }) => {
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
      // Quiet fail if offline
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
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

  const getRoleStyle = (role) => {
    switch (role) {
      case 'hr':
        return { label: 'HR Admin', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
      case 'manager':
        return { label: 'Manager', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' };
      default:
        return { label: 'Employee', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' };
    }
  };

  const roleStyle = getRoleStyle(user?.role);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#08090a',
        color: '#f3f4f6',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 60, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMobileToggle}
            sx={{ display: { md: 'none' }, color: '#8b949e' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Obsidian Brand */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#041e15',
                fontWeight: 900,
                fontSize: 15,
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              S
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#f3f4f6', letterSpacing: '-0.03em', fontSize: 17 }}>
              StaffSync<span style={{ color: '#10b981' }}>.</span>
            </Typography>
            <Chip
              label="v1.0"
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                color: '#6e7681',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>
        </Box>

        {/* Global Command Palette Trigger Bar (Raycast / Linear style) */}
        <Box
          onClick={onOpenCommandPalette}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1.5,
            px: 1.8,
            py: 0.6,
            borderRadius: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            color: '#8b949e',
            transition: 'all 0.15s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#f3f4f6',
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ fontSize: 12, color: 'inherit' }}>
            Quick command...
          </Typography>
          <span className="kbd-badge">Ctrl K</span>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                px: 1,
                py: 0.3,
                borderRadius: 1,
                backgroundColor: roleStyle.bg,
                border: `1px solid ${roleStyle.color}40`,
                display: { xs: 'none', sm: 'inline-flex' },
                alignItems: 'center',
                gap: 0.8,
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: roleStyle.color }} />
              <Typography
                variant="caption"
                sx={{
                  color: roleStyle.color,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {roleStyle.label}
              </Typography>
            </Box>

            {/* Notifications Menu */}
            <IconButton
              onClick={(e) => setAnchorNotif(e.currentTarget)}
              sx={{
                color: '#8b949e',
                '&:hover': { color: '#f3f4f6', bgcolor: 'rgba(255,255,255,0.05)' },
              }}
            >
              <Badge badgeContent={unreadCount} color="success">
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorNotif}
              open={Boolean(anchorNotif)}
              onClose={() => setAnchorNotif(null)}
              PaperProps={{
                sx: {
                  width: 340,
                  maxHeight: 400,
                  bgcolor: '#0f1115',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                  System Notifications ({unreadCount})
                </Typography>
                {unreadCount > 0 && (
                  <Typography
                    variant="caption"
                    onClick={handleMarkAllRead}
                    sx={{ color: '#10b981', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark read
                  </Typography>
                )}
              </Box>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
              {notifications.length === 0 ? (
                <MenuItem disabled sx={{ color: '#6e7681', fontSize: 13 }}>
                  No active notifications
                </MenuItem>
              ) : (
                notifications.slice(0, 6).map((n) => (
                  <MenuItem
                    key={n._id}
                    onClick={() => {
                      setAnchorNotif(null);
                      if (n.link) navigate(n.link);
                    }}
                    sx={{
                      backgroundColor: n.read ? 'transparent' : 'rgba(16, 185, 129, 0.04)',
                      py: 1,
                      whiteSpace: 'normal',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 700, color: '#f3f4f6', fontSize: 13 }}>
                        {n.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#8b949e', fontSize: 11 }}>
                        {n.message}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>

            {/* User Avatar Menu */}
            <IconButton
              onClick={(e) => setAnchorUser(e.currentTarget)}
              sx={{ p: 0.5, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: '#16181e',
                  color: '#10b981',
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorUser}
              open={Boolean(anchorUser)}
              onClose={() => setAnchorUser(null)}
              PaperProps={{
                sx: {
                  width: 220,
                  bgcolor: '#0f1115',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#8b949e', display: 'block' }}>
                  {user?.email}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
              <MenuItem
                onClick={() => {
                  setAnchorUser(null);
                  navigate('/profile');
                }}
                sx={{ fontSize: 13, color: '#e5e7eb' }}
              >
                <ListItemIcon sx={{ color: '#8b949e' }}>
                  <BadgeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Account Profile" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorUser(null);
                  logout();
                  navigate('/login');
                }}
                sx={{ fontSize: 13, color: '#f43f5e' }}
              >
                <ListItemIcon sx={{ color: '#f43f5e' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
