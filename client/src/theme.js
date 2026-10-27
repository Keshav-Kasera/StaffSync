import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // Deep Indigo
      light: '#6366f1',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0284c7', // Sky / Cyan
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    success: {
      main: '#059669', // Emerald
      light: '#10b981',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#d97706', // Amber
      light: '#f59e0b',
      dark: '#b45309',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // Crimson
      light: '#ef4444',
      dark: '#b91c1c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Slate-50 clean background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate-900 high contrast
      secondary: '#475569', // Slate-600 readable secondary
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      color: '#0f172a',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: '#0f172a',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      color: '#0f172a',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.005em',
      color: '#0f172a',
    },
    subtitle1: {
      color: '#475569',
      lineHeight: 1.6,
    },
    subtitle2: {
      color: '#475569',
      fontWeight: 600,
    },
    body1: {
      color: '#334155',
      lineHeight: 1.65,
    },
    body2: {
      color: '#475569',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '7px 18px',
          boxShadow: 'none',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0f172a',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1e293b',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8fafc',
          '& th': {
            fontWeight: 700,
            color: '#475569',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 16px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f1f5f9',
          padding: '14px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.1s ease',
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
  },
});

export default theme;
