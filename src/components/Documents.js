import React,{useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DashBoardContext} from '../helpers/Context';
import PleaseLogin from './PleaseLogin';
import FoodsContent from './FoodsContent';
import BusinessClearance from '../assets/files/Barangay-Business-Clearance-business-permit-and-barangay-permit.pdf';
import IndigencyClearance from '../assets/files/Indigency-and-Barangay-Clearance.pdf'
import DownloadCards from './DownloadCards';
import { FileUpload } from './FileUpload';
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

export default function Documents() {
  const classes = useStyles();
  const {loading,signedIn} = useContext(DashBoardContext);
  return (
      <div className={classes.paper}>
        { signedIn ? 
        <div>
            
        <Typography component="h5" variant="h5">
          {"Download Barangay Documents Here!"}
        </Typography>
            <DownloadCards name={'Barangay Business Clearance, Business Permit and Barangay Permit'} desc={"Download barangay permit and clearance for your business."} link={BusinessClearance}/>
            <DownloadCards name={'Indigency and Barangay Clearance'} desc={"Download indigency and barangay clearance."} link={IndigencyClearance}/>
        <Typography component="h5" variant="h5">
          {"Upload Your Medical Certificate Here!"}
        </Typography>
        <FileUpload path={"MedCerts"}/>
        </div> : 
        <PleaseLogin/> 
        }
      </div>
  );
}