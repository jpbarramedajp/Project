import React from 'react';
import clsx from 'clsx';

import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
    useTheme,
  } from '@material-ui/core';

import { ChevronLeft, ChevronRight, ExitToApp, Menu} from '@material-ui/icons';
import { LayoutProvider, useLayoutContext } from './helpers/LayoutContext';
import { useHistory, useLocation } from 'react-router-dom';
import { links } from './links';
import {DashBoardContext} from './helpers/Context';
import Logo from './assets/Blue_small_transparent.png';
import { useContext } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      // [theme.breakpoints.up('sm')]: {
      //   width: theme.spacing(9) + 1,
      // },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    offset: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
      Logo: {
        padding: 0,
        left: 20,
        position: "absolute"
      },
    userTimeInfo: {
      position: "absolute",
      top: 6,
      right: 0,
      margin: "0 1em",
      fontSize: "1em",
      lineHeight: "normal",
      padding: "5px",
      borderRadius: "3px",
      textAlign: "center",
    },
  }));

  const LayoutMainHeader = () => {
    const classes = useStyles();
    const { drawerOpen: open, setDrawerOpen } = useLayoutContext();

    const {signedIn} = useContext(DashBoardContext);
    const disp = signedIn? "" : "none";
    
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{display: disp}}
          >
            <Menu />
          </IconButton>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography variant="h6" noWrap>
              Barangay Addition Hills
            </Typography>
           </Box>
        </Toolbar>
      </AppBar>
    );
  };


  const LayoutMainDrawer = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { drawerOpen: open, setDrawerOpen } = useLayoutContext();
    const {signedIn} = useContext(DashBoardContext);
    const disp = signedIn? "" : "none";
    const location = useLocation();
    const history = useHistory();
    const gotoRoute = (route) => {
      history.push(route);
    };
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        style={{display: disp}}
      >
        <div className={classes.toolbar}>
        <img
              className={
                  classes.Logo
              }
              src={Logo}
              alt="logo"
          />
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
        >
          <List>
            {links.map(({ icon: Icon, ...link }, index) => (
                <ListItem
                  button
                  key={link.name}
                  onClick={() => gotoRoute(link.route)}
                  selected={link.route === location.pathname}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={link.name} />
                </ListItem>
            ))}
          </List>
            <List>
              <ListItem button 
              >
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
        </Box>
      </Drawer>
    );
  };


  export const LayoutMain = ({ children }) => {
    const classes = useStyles();
  
    return (
       <LayoutProvider>
        <div className={classes.root}>
          <CssBaseline />
          <LayoutMainHeader />
          <LayoutMainDrawer />
          <Box className={classes.content} component="main">
            <div className={classes.toolbar} />
            {children}
          </Box>
        </div>
      </LayoutProvider>
    );
  };