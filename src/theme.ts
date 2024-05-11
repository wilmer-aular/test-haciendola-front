import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#c9f7f5',
      main: '#1bc5bd',
      dark: '#107671',
    },
    secondary: {
      main: '#e1e9ff',
    },
    error: {
      main: '#f64e60',
    },
    warning: {
      main: '#ffa800'
    },
    info: {
      main: '#6993ff',
      light: '#e1e9ff'
    },
    success: {
      main: '#1bc5bd'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)',
          borderRadius: 6,
        }
      }
     
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          px: 2, 
          py: 1.5, 
          borderRadius: 6,
        }, 
      }
    }
  },
});

export default theme;
