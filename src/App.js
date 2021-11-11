import React from 'react';

import {LayoutMain} from  './LayoutMain';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Routes } from './Routes';
import DashBoardContextProvider from './helpers/Context';

function App(props){
  return (
    <ThemeProvider theme={theme}>
      <DashBoardContextProvider>
        <LayoutMain>
            <Routes />
        </LayoutMain>
      </DashBoardContextProvider>
    </ThemeProvider>
  );
}

export default App;
