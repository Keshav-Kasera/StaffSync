import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Typography,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  Search as SearchIcon,
  VpnKey as KeyIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CommandPalette = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'dash',
      title: 'Go to Workspace Dashboard',
      category: 'Navigation',
      icon: <DashboardIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/dashboard'),
      shortcut: 'G D',
    },
    {
      id: 'att',
      title: 'Clock In / View Daily Attendance',
      category: 'Attendance & Shifts',
      icon: <AttendanceIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/attendance'),
      shortcut: 'G A',
    },
    {
      id: 'leave',
      title: 'Leave Management & Time-Off Requests',
      category: 'Leave Management',
      icon: <LeavesIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/leaves'),
      shortcut: 'G L',
    },
    {
      id: 'emp',
      title: 'Employee Directory & Team Management',
      category: 'Personnel',
      icon: <EmployeesIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/employees'),
      shortcut: 'G E',
    },
    {
      id: 'notice',
      title: 'Company Announcements & Updates',
      category: 'Communications',
      icon: <AnnouncementsIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/announcements'),
      shortcut: 'G N',
    },
    {
      id: 'train',
      title: 'Training Modules & Skill Development',
      category: 'Development',
      icon: <TrainingIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/training'),
      shortcut: 'G T',
    },
    {
      id: 'prof',
      title: 'User Profile & Account Settings',
      category: 'Account',
      icon: <ProfileIcon sx={{ fontSize: 18 }} />,
      perform: () => navigate('/profile'),
      shortcut: 'G P',
    },
    // Demo Role Switchers
    {
      id: 'auth-hr',
      title: 'Switch Role → HR Administrator (hr@staffsync.com)',
      category: 'Demo Role Switcher',
      icon: <KeyIcon sx={{ fontSize: 18, color: '#10b981' }} />,
      perform: async () => {
        try {
          await login('hr@staffsync.com', 'Password123!');
          toast.success('Switched to HR Administrator account');
          navigate('/dashboard');
        } catch (e) {
          toast.error('Failed to switch to HR account');
        }
      },
      shortcut: 'HR',
    },
    {
      id: 'auth-mgr',
      title: 'Switch Role → Department Manager (manager@staffsync.com)',
      category: 'Demo Role Switcher',
      icon: <KeyIcon sx={{ fontSize: 18, color: '#38bdf8' }} />,
      perform: async () => {
        try {
          await login('manager@staffsync.com', 'Password123!');
          toast.success('Switched to Department Manager account');
          navigate('/dashboard');
        } catch (e) {
          toast.error('Failed to switch to Manager account');
        }
      },
      shortcut: 'MGR',
    },
    {
      id: 'auth-emp',
      title: 'Switch Role → Employee Alex (employee@staffsync.com)',
      category: 'Demo Role Switcher',
      icon: <KeyIcon sx={{ fontSize: 18, color: '#f59e0b' }} />,
      perform: async () => {
        try {
          await login('employee@staffsync.com', 'Password123!');
          toast.success('Switched to Employee account');
          navigate('/dashboard');
        } catch (e) {
          toast.error('Failed to switch to Employee account');
        }
      },
      shortcut: 'EMP',
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
        onClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#0c0e12',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 2,
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(16, 185, 129, 0.1)',
          overflow: 'hidden',
          top: '-15%',
        },
      }}
    >
      {/* Search Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          gap: 1.5,
        }}
      >
        <SearchIcon sx={{ color: '#10b981', fontSize: 20 }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Type a command or jump to module..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            color: '#f3f4f6',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            px: 0.8,
            py: 0.2,
            bgcolor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            color: '#8b949e',
            fontSize: 10,
          }}
        >
          ESC
        </Typography>
      </Box>

      {/* Action List */}
      <List sx={{ p: 1, maxHeight: 340, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', color: '#6e7681' }}>
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              No matching commands found.
            </Typography>
          </Box>
        ) : (
          filtered.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <ListItemButton
                key={item.id}
                selected={isSelected}
                onClick={() => {
                  item.perform();
                  onClose();
                }}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  py: 1,
                  px: 1.5,
                  backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                  border: isSelected ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: isSelected ? '#10b981' : '#8b949e' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.category}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? '#f3f4f6' : '#d1d5db',
                  }}
                  secondaryTypographyProps={{
                    fontSize: 11,
                    color: '#6e7681',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}
                />
                {item.shortcut && (
                  <Typography
                    variant="caption"
                    sx={{
                      px: 0.8,
                      py: 0.2,
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 1,
                      color: isSelected ? '#10b981' : '#6e7681',
                      fontSize: 10,
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {item.shortcut}
                  </Typography>
                )}
              </ListItemButton>
            );
          })
        )}
      </List>

      {/* Footer Instructions */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#080a0c',
          color: '#6e7681',
          fontSize: 11,
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
        </Box>
        <span>StaffSync Quick Engine</span>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
