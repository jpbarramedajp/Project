import React,{useContext, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {DashBoardContext} from '../helpers/Context';
import Grid from '@material-ui/core/Grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@material-ui/core';
import map from '../assets/map.png';
import logo from '../assets/logo.gif';
import { Box } from '@mui/system';
import profile from '../assets/Carousel/BRGY.-PROFILE-updated.pdf';
import ShakeHands from '../assets/2nd.png';
import citation from '../assets/3rd.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function Welcome() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  
  const {announcement, user, doNotOpen, setDoNotOpen, loading} = useContext(DashBoardContext);
  const handleClose = () => {
    setIsOpen(false)
    setDoNotOpen(true)
  }
  return (
    <Grid contatiner>

      <div>
          <Dialog
            open={!doNotOpen && isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              {"Welcome " + user.firstName + "!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You have successfully logged in to our portal!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      <Grid container item  xs={12} style={{backgroundColor: "red"}}>
        <marquee direction="left" height="100%" width="100%" >
          <div  style={{width: "100%"}}>
          <Typography align="center" component="h1" variant="h5" >
            {!loading? announcement[0].announcement : "Loading Announcement"}
          </Typography> 
          </div>
        </marquee>
      </Grid>
      <Grid container item  xs={12}>
        <Grid item xs={10}><img src={map}/></Grid>
        <Grid item xs={2}><img src={logo}/></Grid>
      </Grid>
      <Grid item container>
        
      <Grid container item xs={6} sm={6}>
        <embed src={profile} width="100%" height="100%">
        </embed>
        </Grid>
        <Grid item xs={2} sm={2}>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <Typography align="center" component="h1" variant="h5">
            Barangay Officials.
          </Typography>
          <div>&nbsp;</div>
          <Typography align="center" component="h1" variant="h6">
          <b>Carlito Tolibas Cernal</b>
          </Typography>
          <Typography align="center" component="h1" variant="subtitle2">
            Barangay Chairman
          </Typography>
          <div>&nbsp;</div>
          <Typography align="center" component="h1" variant="h6">
            <b>Barangay Kagawad</b>
          </Typography>
          <Typography align="center" component="h1" variant="subtitle2">
          <div>Etanislao Alim III</div>
          <div>Angeline I. Panoso</div>
          <div>Dionisio G. Buen</div>
          <div>Isaias L Elbore, Jr.</div>
          <div>Linda F. Fabula</div>
          <div>Anilo C. Salvador</div>
          </Typography>
          <div>&nbsp;</div>
          <Typography align="center" component="h1" variant="h6">
          <b>Anna Marie M. Tiu</b>
          </Typography>
          <Typography align="center" component="h1" variant="subtitle2">
            SK Chairman
          </Typography>
          <div>&nbsp;</div>
          <Typography align="center" component="h1" variant="subtitle2">
          <div>Claire B. Poi</div>
          <div>Zach A. Andales</div>
          <div>Pauline C. Boado</div>
          <div>Moureen Faye Vivero</div>
          <div>Andrea E. Parro</div>
          <div>Marlon A. Ramirez</div>
          <div>Leira D. De Loreto</div>
          </Typography>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
              <div>&nbsp;</div>
              <Typography align="center" component="h1" variant="h6">
              <b>PBAC Hotline</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              0917-860-3860
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Punong Barangay office</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              0917-859-9167
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Bantay Bayan</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              706-1738
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>AHLERT</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              <div>0917-860-3853</div>
              <div>0961-8112940</div>
              <div>079-663-642</div>
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Main Trunkline</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              <div>8532-5001</div>
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Police</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              <div>8532-2145</div>
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Fire</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              <div>8532-2189</div>
              <div>8532-2402</div>
              </Typography>
              <Typography align="center" component="h1" variant="h6">
              <b>Hospital</b>
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
              <div>8532-0480</div>
              </Typography>
              <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
        </Grid>
        {/* <Grid spacing={1} item xs={2} sm={2}>
          
         
        </Grid> */}
        <Grid spacing={1} item xs={4} sm={4}>
          <div  width="100%" height="100%">
          <marquee direction="up" height="30%" scrollamount="10">
              <Typography align="center" component="h1" variant="h6">
              <b>BARANGAY ADDITION HILLS ACHIEVEMENTS</b>
              </Typography>
              <Typography align="center" component="h1" variant="h6">
               Barangay Assembly
              </Typography>
              <Typography align="center" component="h1" variant="subtitle2">
               Brgy. Addition Hills
              </Typography>
              <p>
              Inihayag ng ating butihing AMA ng Brgy. Addition Hills Kap. Carlito Tolibas Cernal Full ang mga 
              accomplishments o mga nagawang proyekto ng bawat departamento ayun sa kanyang 
              pamamahala kasama ang KONSEHO. Sa pangunguna ni Kag. Junis Villaraza Alim Full Kag. Angie 
              Pañoso Kag. Dennis Garcia Buen Kag. Jayr Elbore Kag. Linda Fabula Kag. Ai Lynne Carandang and 
              Kag. Danilo Melchor Salvador! 
              Maraming Salamat din po sa Liham o mensahe mula sa DILG Secretary na binasa at ibinahagi ni 
              DILG City Director of Mandaluyong Maam Perla M. Upano Ceso V. Salamat din sa PCP1 
              Commander Arturo C. Tale and PLtCol. Hari D. Lapuz OIC Mandaluyong Police.
              Maraming salamat Coun. Charisse Marie Abalos-Vargas Coun. Kuyog Posadas Kap. Edmond 
              Espiritu and Mr. Elton Yap
              Kasabay ang pag release ng financial assistance under the Scholarship Program ng SK headed by 
              SK Chairwoman Anna Marie Maranan Tiu.
              Kudos sa lahat!
              #SerbisyongCarlitoMayPusongTotoo
              </p>
              <p>
              Maraming salamat po sa parangal at pagkilalala mula sa DENR para sa mamayan ng Barangay 
              Addition Hills
              Awarded September 26, 2019 @ H2O Hotel Manila Ocean Park
              Thank you sa Team Task Force Maintenance para inyong didikasyon na malinis ang ating 
              kapaligiran specially Maytunas Creek
              Headed by Comm Chairman Danilo Salvador and team Edna Picardal Laida Tolibas Jhaydan 
              Santos and Cemd Mandaluyong headed by Kag Cor Azon.
              </p>
              <img src={ShakeHands}></img>
              <p>
              Maraming salamat po sa Recognition 1st DENR-“GAWAD TAGA ILOG” Most Improved Estero in 
              Metro Manila -Maytunas Creek
              Kasama sa pagtanggap ng Parangal si CEMD Head Sir Sonny Oblea bilang kinatawan ni Mayora 
              Menchie Abalos
              Proyektong sinimulan ni dating DENR Secretary Gina Lopez ngayon ay si DENR Secretary Roy 
              Cimatu at ni ngayo”y MMDA Chairman Benjamin Jr Abalos at ngayon ay ipinagpapatuloy ng 
              inyong lingkod at mga kagawad ang paglilinis at pagsasaayos upang maging maayos at 
              mapanatiling maganda ang nasabing Creek.
              Special Thanks sa mga nasa likod ng pagpapabatili ng kalinisan at kaayusan
              Kag. Danilo Salvador, Chaiman, Environment & Solid Waste Management
              Jhaydan Santos Head , BESSM, Adelaida Doegracias Tolibas Supervisor BESSM at sa lahat ng mga 
              Sisid Kanal, Declogging, Cluster B/B na nakakasakop at sa lahat ng mamamayan ng Barangay 
              Addition Hills.
              #DisiplinaAngKailanganParaManatiliAngKalinisan
              #SaveMatunasCree
              </p>
              <img src={citation}></img>
          </marquee>
          </div>
        </Grid>
      </Grid>
      </Grid>
  );
}