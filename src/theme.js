import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00549a',
    },
  },
  typography: {
    fontFamily: 'bell-slim, Roboto, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['bell-slim'],
      },
    },
  },
});
