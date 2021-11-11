import React,{useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DashBoardContext} from '../helpers/Context';
import { Grid } from '@material-ui/core';
import MediaCard from './MediaCard';
import {serviceList} from '../helpers/Constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function ServicesContent() {
  const classes = useStyles();
  const {services, loading,signedIn} = useContext(DashBoardContext);
  
  // const services = serviceList();
  return (
        <Grid container>
            {
              services.map((service) => {
                return <MediaCard service={service}/>
              })
            } 
        </Grid>
  );
}