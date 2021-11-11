import React,{useContext,useEffect,useMemo, useState} from 'react';
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
import FileList from './FileList';
import { Divider, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Grid, Select, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SetAnnouncement, GetAnnouncement, ServicesMethods, GetServices } from '../helpers/Utils';
import ProfileTable from './ProfileTable';
import Directories from './Directories';
import Chart from './Chart';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
}));



export default function Documents() {
    const classes = useStyles();
    const {isAdmin,signedIn,setAnnouncement, services, setServices, likes} = useContext(DashBoardContext);
    const [a, setA] = useState([]);
    const [announcement, setAnnouncementState] = useState('');
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const[id, setId] = useState(0);
    const[title, settitle] = useState(0);
    const[subtitle, setsubtitle] = useState(0);
    const[desc, setdesc] = useState(0);
    const[image, setimage] = useState(0);

    const HandleSetAnnouncement = async () => {
      await setA(await SetAnnouncement(announcement));
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const handleServiceOpen = () => {
      setServicesOpen(!servicesOpen);
    }

    const handleServices = async (d) => {
      if(d === 'delete'){
        await setServices(await ServicesMethods(id,"delete",null,null,null))
      }else{
        await setServices(await ServicesMethods(id,title,subtitle,desc,image))
      }
      await setServicesOpen(false)
    }

    const getRatesAverage = (id) => {
      const list = likes.filter(x => x.serviceId === id );
      if(list.length > 0){
        var ctr = 0;
        var total = 0;
        list.map(x => {
           total += x.like;
           ctr ++;
        });
        return total/ctr;
      }
      return 0;
    }

    useEffect(async () => {
      await setAnnouncement(await GetAnnouncement());
    }, [a]);

    const getLabels = () => {
      const labels = []
      services.map((s) => {
          labels.push(s.title)
      });
      return labels;
    }

    const getvalues = () => {
      const average = []
      services.map((s) => {
        average.push(getRatesAverage(s.id));
      });
      return average;
    }

    const getcolors = () => {
      const color = []
      services.map((s) => {
        color.push(dynamicColors());
      });
      return color;
    }

    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
   };

  return (
      <div className={classes.paper}>
        { signedIn && isAdmin ? 
        <div>
        <Typography component="h5" variant="h5">
          {"Admin Page"}
        </Typography>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TextField variant="outlined" size="small" placeholder="Announcement" onChange={e => setAnnouncementState(e.target.value)}/>
              <Button variant="outlined" size="medium" onClick={() => HandleSetAnnouncement()}> Set new announcement</Button>
              <Button variant="outlined" size="medium" onClick={() => handleServiceOpen()}>Manage Services</Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              &nbsp;
            <Typography component="h5" variant="h5">
                {"Services Average Rating"}
             </Typography>
              <Chart labels={getLabels()} data={getvalues()} colors={getcolors()}/>
            </Grid>
          </Grid>
           &nbsp;
          <Typography component="h5" variant="h6">
          {"List of Residents"}
          </Typography>
          <ProfileTable />
          <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Success!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You have successfully changed the announcement. Click okay to close.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
        <Dialog
              open={servicesOpen}
              onClose={handleServiceOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Services Form"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div>
                <Select
                name="Id"
                variant="outlined"
                native
                value={id}
                onChange={ e => {setId(e.target.value)}}
                placeholder="Id"
                label="Id"
                inputProps={{
                    name: 'Id',
                    id: 'Id',
                }}
                >
                {
                  services.map((s) => {
                    return <option value={s.id}>{s.title}</option>
                  })
                }
                <option value={0}>{"New Service"}</option>
                </Select>
                </div><div>
                <TextField variant="outlined" size="small" placeholder="title" onChange={e => settitle(e.target.value)}/></div><div>
                <TextField variant="outlined" size="small" placeholder="subtitle" onChange={e => setsubtitle(e.target.value)}/></div><div>
                <TextField variant="outlined" size="small" placeholder="Description" onChange={e => setdesc(e.target.value)}/></div><div>
                <Select
                name="image"
                variant="outlined"
                native
                value={image}
                onChange={ e => {setimage(e.target.value)}}
                placeholder="image"
                label="image"
                inputProps={{
                    name: 'image',
                    id: 'image',
                }}
                >
                {
                  services.map((s) => {
                    return <option value={s.image}>{s.image}</option>
                  })
                }
                </Select></div>
                {/* <TextField variant="outlined" size="small" placeholder="image name" onChange={e => setimage(e.target.value)}/></div> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleServices()} autoFocus>
                  Save
                </Button>
                <Button onClick={(e) => handleServices("delete")} disabled={id == 0? true: false} autoFocus>
                  Delete Selected Service
                </Button>
              </DialogActions>
            </Dialog>
        </div>
          <Directories/>
          
        </div>: 
        <PleaseLogin/> 
        }
      </div>
  );
}