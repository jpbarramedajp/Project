import React, {useEffect, useMemo, useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select } from '@material-ui/core';
import {Register} from '../helpers/Utils';
import { useHistory } from 'react-router-dom';
import {regions, provinces, cities, barangays} from 'select-philippines-address';
import {DashBoardContext} from '../helpers/Context';
import SuccessRegister from './SuccessRegister';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Addition Hills
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const {regionList} = useContext(DashBoardContext);
  const [FirstName, setFirstName] = useState();
  const [MiddleName, setMiddleName] = useState('');
  const [LastName, setLastName] = useState();
  const [Gender, setGender] = useState();
  const [Birthdate, setBirthdate] = useState();
  const [Age, setAge] = useState();
  const [UserName, setUserName] = useState();
  const [password, setpassword] = useState();
  const [reg, setreg] = useState([]);
  const [region, setRegion] = useState('01');
  const [provinceList, setprovinceList] = useState([]);
  const [province, setprovince] = useState('0128');
  const [cityList, setcityList] = useState([]);
  const [city, setcity] = useState('012801');
  const [brgy, setbrgy] = useState("012801001");
  const [brgyList, setbrgyList] = useState([]);
  const [houseNo, setHouseNo] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [field, setField] = useState(false);
  const history = useHistory();

  const handlePopUp = () => {
    if(reg === 1){
      setRegistered(true);
    }else{
      setRegistered(false);
    }
  }


  const handleSignUp = async () => {
    const a = brgyList.filter((c) => {
      return c.brgy_code == brgy;
    });
    
    const b = cityList.filter((c) => {
      return c.city_code == city;
    });

    const c = provinceList.filter((c) => {
      return c.province_code == province;
    })

    const d = regionList.filter((c) => {
      return c.region_code == region;
    })

  
    if(!FirstName){
      setField("First Name")
      setError(true)
    }
    else if(!LastName){
      setField("Last Name")
      setError(true)
    }
    else if(!Age){
      setField("Age")
      setError(true)
    }
    else if(!houseNo){
      setField("house Number")
      setError(true)
    }
    else if(!Birthdate){
      setField("Birthdate")
      setError(true)
    }
    else if(!UserName){
      setField("UserName")
      setError(true)
    }
    else if(!password){
      setField("Password")
      setError(true)
    }
    else{
     await setreg(await Register(FirstName, MiddleName, LastName, Age, Gender, Birthdate, houseNo + a[0].brgy_name + ", " + b[0].city_name + ", " + c[0].province_name + ', ' + d[0].region_name, UserName, password));
    }
   
  }
  
  useEffect(() => {
    provinces(region).then((province) => setprovinceList(province));
  },[region,reg]);

  useEffect(() => {
    cities(province).then((city) => setcityList(city));
  },[province,provinceList]);
  
  useEffect(() => {
    barangays(city).then((barangays) => setbrgyList(barangays));
  },[city,cityList]);

  useEffect(() => {
    handlePopUp();
  },[reg])

  const handleClose = () => {
    setError(false)
  }

  return (
    <Container component="main" maxWidth="sm">
      <div>
          <Dialog
            open={error}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              {"Error!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please check {field}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()} autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onInput={ e=>setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoComplete="Mname"
                name="Middle Name"
                variant="outlined"
                required
                fullWidth
                id="MiddleName"
                label="Middle Name"
                onInput={ e=>setMiddleName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onInput={ e=>setLastName(e.target.value)}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Age"
                label="Age"
                name="Age"
                autoComplete="Age"
                onInput={ e=>setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputLabel htmlFor="outlined-gender-native-simple">Gender</InputLabel>
                <Select
                name="Gender"
                variant="outlined"
                native
                value={Gender}
                onChange={e => setGender(e.target.value)}
                placeholder="Gender"
                label="Gender"
                inputProps={{
                    name: 'gender',
                    id: 'outlined-gender-native-simple',
                }}
                >
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
                </Select>
            </Grid>
            <Grid item xs={6} sm={6}>
                <InputLabel htmlFor="outlined-region-native-simple">Region</InputLabel>
                <Select
                name="Region"
                variant="outlined"
                native
                value={region}
                onChange={e => setRegion(e.target.value)}
                placeholder="region"
                label="region"
                inputProps={{
                    name: 'region',
                    id: 'outlined-region-native-simple',
                }}
                >
                {
                  regionList.map((reg) => {
                    return <option value={reg.region_code}>{reg.region_name}</option>
                  })
                }
                </Select>
            </Grid>
            <Grid item xs={6} sm={6}>
                <InputLabel htmlFor="outlined-Province-native-simple">Province</InputLabel>
                <Select
                name="Province"
                variant="outlined"
                native
                value={province}
                onChange={ e => {setprovince(e.target.value)}}
                placeholder="Province"
                label="Province"
                inputProps={{
                    name: 'Province',
                    id: 'outlined-Province-native-simple',
                }}
                >
                {
                  provinceList.map((prov) => {
                    return <option value={prov.province_code}>{prov.province_name}</option>
                  })
                }
                </Select>
            </Grid>
            <Grid item xs={6} sm={6}>
                <InputLabel htmlFor="outlined-City-native-simple">City/Municipality</InputLabel>
                <Select
                name="City"
                variant="outlined"
                native
                value={city}
                onChange={e => setcity(e.target.value)}
                placeholder="City"
                label="City"
                inputProps={{
                    name: 'City',
                    id: 'outlined-City-native-simple',
                }}
                >
                {
                  cityList.map((city) => {
                    return <option value={city.city_code}>{city.city_name}</option>
                  })
                }
                </Select>
            </Grid>
            <Grid item xs={6} sm={6}>
                <InputLabel htmlFor="outlined-Barangay-native-simple">Barangay</InputLabel>
                <Select
                name="Barangay"
                variant="outlined"
                fullWidth
                native
                value={brgy}
                onChange={e => setbrgy(e.target.value)}
                placeholder="Barangay"
                label="Barangay"
                inputProps={{
                    name: 'Barangay',
                    id: 'outlined-Barangay-native-simple',
                }}
                >
                {
                  brgyList.map((brgy) => {
                    return <option value={brgy.brgy_code}>{brgy.brgy_name}</option>
                  })
                }
                </Select>
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="HouseNumber"
                label="House Number Blk. # Lot #"
                name="HouseNumber"
                autoComplete="HouseNumber"
                onInput={ e=>setHouseNo(e.target.value + ', ')}
              />
            </Grid>
            <Grid item sm={12}>
            <TextField
                variant="outlined"
                id="date"
                label="Birthday"
                type="date"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onInput={ e=>setBirthdate(e.target.value)}
            />
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                onInput={ e=>setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onInput={ e=>setpassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignUp()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {registered? <SuccessRegister /> : <div></div>}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}