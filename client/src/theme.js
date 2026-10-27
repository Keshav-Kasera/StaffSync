import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981', // Phosphor Emerald
      light: '#34d399',
      dark: '#059669',
      contrastText: '#041e15',
    },
    secondary: {
      main: '#38bdf8', // Precision Sky
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#082f49',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f43f5e', // Rose
      light: '#fb7185',
      dark: '#e11d48',
      contrastText: '#ffffff',
    },
    background: {
      default: '#08090a', // True obsidian dark
      paper: '#0f1115',   // Elevated technical dark surface
    },
    text: {
      primary: '#f3f4f6',   // High-contrast zinc
      secondary: '#8b949e', // Muted steel
    },
    divider: 'rgba(255, 255, 255, 0.08)',
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
      letterSpacing: '-0.04em',
      color: '#f3f4f6',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      color: '#f3f4f6',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: '#f3f4f6',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#f3f4f6',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: '#f3f4f6',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#f3f4f6',
    },
    subtitle1: {
      color: '#8b949e',
      lineHeight: 1.6,
    },
    subtitle2: {
      color: '#8b949e',
      fontWeight: 600,
      fontSize: 13,
    },
    body1: {
      color: '#e5e7eb',
      lineHeight: 1.6,
      fontSize: 14,
    },
    body2: {
      color: '#8b949e',
      lineHeight: 1.6,
      fontSize: 13,
    },
    caption: {
      color: '#6e7681',
      fontSize: 11,
      fontFamily: ['"JetBrains Mono"', 'ui-monospace', 'monospace'].join(','),
      letterSpacing: '0.04em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '6px 16px',
          boxShadow: 'none',
          fontSize: 13,
          fontWeight: 600,
          transition: 'all 0.15s ease',
        },
        containedPrimary: {
          backgroundColor: '#10b981',
          color: '#041e15',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#34d399',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          '&:hover': {
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#0f1115',
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0f1115',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0c0f',
          '& th': {
            fontWeight: 700,
            color: '#8b949e',
            fontSize: '11px',
            fontFamily: ['"JetBrains Mono"', 'ui-monospace', 'monospace'].join(','),
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '10px 14px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '12px 14px',
          color: '#e5e7eb',
          fontSize: 13,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.12s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.025)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0c0f',
          borderRadius: 6,
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#10b981',
            borderWidth: '1px',
          },
        },
        input: {
          padding: '10px 14px',
          fontSize: 13,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: ['"JetBrains Mono"', 'ui-monospace', 'monospace'].join(','),
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: '0.02em',
        },
      },
    },
  },
});

export default theme;
