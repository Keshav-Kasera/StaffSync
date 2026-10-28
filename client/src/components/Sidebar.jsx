import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccessTime as AttendanceIcon,
  EventNote as LeavesIcon,
  People as EmployeesIcon,
  Campaign as AnnouncementsIcon,
  School as TrainingIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 230;

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '01' },
    { text: 'Attendance', path: '/attendance', icon: <AttendanceIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '02' },
    { text: 'Leave Management', path: '/leaves', icon: <LeavesIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '03' },
    { text: 'Employee Directory', path: '/employees', icon: <EmployeesIcon sx={{ fontSize: 18 }} />, roles: ['manager', 'hr'], key: '04' },
    { text: 'Announcements', path: '/announcements', icon: <AnnouncementsIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '05' },
    { text: 'Training & Skills', path: '/training', icon: <TrainingIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '06' },
    { text: 'My Profile', path: '/profile', icon: <ProfileIcon sx={{ fontSize: 18 }} />, roles: ['employee', 'manager', 'hr'], key: '07' },
  ];

  const visibleItems = menuItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  const drawerContent = (
    <Box sx={{ py: 2.5, px: 1.5, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#08090a' }}>
      <Box sx={{ px: 1.5, mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: '#6e7681',
            fontWeight: 700,
            letterSpacing: '0.06em',
            fontSize: 10,
          }}
        >
          WORKSPACE MENU
        </Typography>
      </Box>

      <List sx={{ p: 0, flexGrow: 1 }}>
        {visibleItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              selected={isSelected}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) onMobileClose();
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                py: 0.8,
                px: 1.5,
                color: isSelected ? '#10b981' : '#8b949e',
                backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                border: isSelected ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid transparent',
                transition: 'all 0.12s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  color: '#f3f4f6',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected ? '#10b981' : '#6e7681',
                  minWidth: 30,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 500,
                  letterSpacing: '-0.01em',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: 10,
                  color: isSelected ? 'rgba(16, 185, 129, 0.6)' : '#30363d',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {item.key}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>

      {/* System Status Footnote */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
          <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontSize: 10 }}>
            System Operational
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#6e7681', fontSize: 10, display: 'block' }}>
          StaffSync v1.0 • Connected
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#08090a' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Persistent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            top: 60,
            height: 'calc(100% - 60px)',
            bgcolor: '#08090a',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
