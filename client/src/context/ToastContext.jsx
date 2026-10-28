import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const ToastContext = createContext(null);

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success' | 'error' | 'warning' | 'info'
  });

  const showToast = useCallback((message, severity = 'info') => {
    setToast({
      open: true,
      message,
      severity,
    });
  }, []);

  const hideToast = useCallback((event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const toastHelpers = {
    success: (msg) => showToast(msg, 'success'),
    error: (msg) => showToast(msg, 'error'),
    info: (msg) => showToast(msg, 'info'),
    warning: (msg) => showToast(msg, 'warning'),
    show: showToast,
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={hideToast}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Alert
          onClose={hideToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            minWidth: 280,
            borderRadius: 2,
            fontWeight: 500,
            fontSize: '0.875rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            '& .MuiAlert-icon': {
              fontSize: 20,
            },
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
