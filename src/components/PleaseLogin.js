import React,{useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DashBoardContext} from '../helpers/Context';
import WarningIcon from '@material-ui/icons/Warning';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://additionhills.herokuapp.com/">
        Barangay Addition Hills
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PleaseLogin() {
  const classes = useStyles();
  const {loading,signedIn, isAdmin} = useContext(DashBoardContext);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WarningIcon />
        </Avatar>
        {
        isAdmin ?
          <Typography align="center" component="h1" variant="h5">
            You are not currently signed in. Please log in as admin to view this section.
          </Typography> :
          <Typography align="center" component="h1" variant="h5">
            You are not currently signed in as admin. Please log in to view this section.
          <div>
          <Link href="https://additionhills.herokuapp.com/">
            Click here to Log in
          </Link>
          </div>
          </Typography>
        }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}