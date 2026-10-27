import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
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

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['employee', 'manager', 'hr'] },
    { text: 'Attendance', path: '/attendance', icon: <AttendanceIcon />, roles: ['employee', 'manager', 'hr'] },
    { text: 'Leave Management', path: '/leaves', icon: <LeavesIcon />, roles: ['employee', 'manager', 'hr'] },
    { text: 'Employees Directory', path: '/employees', icon: <EmployeesIcon />, roles: ['manager', 'hr'] },
    { text: 'Announcements', path: '/announcements', icon: <AnnouncementsIcon />, roles: ['employee', 'manager', 'hr'] },
    { text: 'Training Programs', path: '/training', icon: <TrainingIcon />, roles: ['employee', 'manager', 'hr'] },
    { text: 'My Profile', path: '/profile', icon: <ProfileIcon />, roles: ['employee', 'manager', 'hr'] },
  ];

  const visibleItems = menuItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  const drawerContent = (
    <Box sx={{ py: 2 }}>
      <Box sx={{ px: 3, mb: 2 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1.2 }}>
          Navigation
        </Typography>
      </Box>
      <List sx={{ px: 1.5 }}>
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
                borderRadius: 2,
                mb: 0.5,
                color: isSelected ? 'primary.main' : 'text.primary',
                backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(79, 70, 229, 0.04)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected ? 'primary.main' : '#64748b',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isSelected ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
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
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
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
            borderRight: '1px solid #e2e8f0',
            top: 64,
            height: 'calc(100% - 64px)',
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
