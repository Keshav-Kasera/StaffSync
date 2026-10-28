import React from 'react';
import { Box, Typography } from '@mui/material';
import { InboxOutlined as DefaultEmptyIcon } from '@mui/icons-material';

const EmptyState = ({
  icon,
  title = 'No records found',
  description = 'There are currently no items to display in this view.',
  action,
}) => {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2.5,
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8b949e',
          mb: 2,
        }}
      >
        {icon || <DefaultEmptyIcon sx={{ fontSize: 28 }} />}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f3f4f6', mb: 0.5 }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: '#8b949e', maxWidth: 380, mb: action ? 2.5 : 0 }}>
        {description}
      </Typography>

      {action && <Box sx={{ mt: 2 }}>{action}</Box>}
    </Box>
  );
};

export default EmptyState;
