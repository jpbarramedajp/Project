import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {DashBoardContext} from '../helpers/Context';
import { Button, Grid } from '@material-ui/core';
import { Download } from '../helpers/Utils';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Files(props) {
  const classes = useStyles();
  const {loading,signedIn} = useContext(DashBoardContext);
  console.log(props.files)
  const files = props.files;

  const handleButtonClick = async (path, name) => {
    await Download(path, name);
  }
  
  return (
      <div >
          {
            files.names.map(file => {
              return <div>
                <ol>
                  <ul>
                    <Grid container>
                      <Grid item xs={3}> <Button onClick={() => {handleButtonClick(files.path, file)}} size="small" variant="outlined">Download</Button></Grid>
                      <Grid item xs={9}>
                        {file}
                      </Grid>
                    </Grid>
                  </ul>
                </ol>
                </div>
            })
          }
      </div>
  );
}