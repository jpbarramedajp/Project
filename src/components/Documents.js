import React,{useContext, useState} from 'react';
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
import { Button, TextField } from '@material-ui/core';
import {SetRequests} from '../helpers/Utils';
import { GetFoldersList } from "../helpers/Utils";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select } from '@material-ui/core';
import axios from "axios";

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
  const {loading,signedIn, setRequest} = useContext(DashBoardContext);
  const [open, setOpen] = React.useState(false);
  const [medicine, setMedicine] = React.useState('');
  const [reason, setReason] = React.useState('');
  const {user} = useContext(DashBoardContext);
  const [requestor, setRequestor] = React.useState(user.firstName + " " + user.lastName);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const {setFolders, setIsFileReady} = useContext(DashBoardContext);

  const handleRequest = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const resetList = async () => {
    await setIsFileReady(false);
    await setFolders(await GetFoldersList());
    await setIsFileReady(true);
}

  const handleSubmit = async () => {
    if(requestor && medicine && reason){
      uploadFile();
      await setRequest( await SetRequests(requestor, medicine, reason))
    }
    else{
      alert("Please fill up the fields.")
    }
    setOpen(false)
  }

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
}

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        formData.append("folder", 'MedCerts');
    try{
        const res = await axios.post("https://additionhillsapi.herokuapp.com/api/file",formData);
        resetList();
    }catch(ex){
        console.log(ex)
    }
    };
  
  return (
      <div className={classes.paper}>
        { signedIn ? 
        <div>
              {/*dialog*/}
          <div>
          <Dialog
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              {"Request your medicine."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                    <div>&nbsp;</div>
                    <TextField
                      autoComplete="User"
                      variant="outlined"
                      fullWidth
                      id="User"
                      onInput={ e=>setRequestor(e.target.value)}
                      value={user.firstName + " " + user.lastName}
                      disabled
                      autoFocus
                    />
                    <div>&nbsp;</div>
                    <TextField
                      autoComplete="Medicine Name"
                      name="Medicine Name"
                      variant="outlined"
                      fullWidth
                      id="Medicine"
                      label="Medicine"
                      onInput={ e=>setMedicine(e.target.value)}
                      autoFocus
                    />
                                <div>&nbsp;</div>
                    <TextField
                      autoComplete="Reason"
                      name="Reason"
                      variant="outlined"
                      fullWidth
                      id="Reason"
                      label="Reason"
                      onInput={ e=>setReason(e.target.value)}
                      autoFocus
                    />
                    <div>&nbsp;</div>
                  <Typography component="h5" variant="h5">
                    {"Upload Your Medical Certificate Here!"}
                  </Typography>
                  <div>
                      <input type="file" onChange={saveFile}/>
                  </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleSubmit()} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Typography component="h5" variant="h5">
          {"Download Barangay Documents Here!"}
        </Typography>
            <DownloadCards name={'Barangay Business Clearance, Business Permit and Barangay Permit'} desc={"Download barangay permit and clearance for your business."} link={BusinessClearance}/>
            <DownloadCards name={'Indigency and Barangay Clearance'} desc={"Download indigency and barangay clearance."} link={IndigencyClearance}/>
            <div>&nbsp;</div>

        {user.firstName === 'Admin' ? <div></div> : <Button variant='outlined' color='primary' onClick={() => handleRequest()}>Request Medicine</Button>}
        </div> : 
        <PleaseLogin/> 
        }
      </div>
  );
}