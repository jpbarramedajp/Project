import React,{useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DashBoardContext} from '../helpers/Context';
import PleaseLogin from './PleaseLogin';
import FoodsContent from './FoodsContent';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
}));

export default function Foods() {
  const classes = useStyles();
  const {loading,signedIn, isAdmin} = useContext(DashBoardContext);
  return (
      <div>
        { signedIn && isAdmin ? <FoodsContent/> : <PleaseLogin/> }
      </div>
  );
}