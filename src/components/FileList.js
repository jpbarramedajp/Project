import React, {useContext, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { LaptopWindows, NavigateBeforeSharp, PinDropSharp } from '@material-ui/icons';
import {DashBoardContext} from '../helpers/Context';
import  {FileUpload }from './FileUpload';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function InteractiveList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const {files, isFileReady} = useContext(DashBoardContext);
 
  const openFile = (url) => {
    document.getElementById('my_iframe').src = url;
  } 

  return (
    <div className={classes.root}>
        {/* <FormControlLabel
          control={
            <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
          }
          label="Enable dense"
        /> */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            List of Documents
          </Typography>
          <FileUpload />
          <List id="myList">
              {
                  isFileReady ? Object.keys(files).map(function(key, index) {
                      return <div> 
                        <ListItem>
                       <iframe id="my_iframe" style={{ display: 'none'}}></iframe>
                          <ListItemText>
                            {files[index].replace("E:\\\\DBAMaintenance.WebUI\\ProjectUI\\src\\assets\\folder\\","")}
                          </ListItemText>
                        </ListItem>
                      <Button size="small" variant="contained" color="primary" onClick={() => {openFile(files[index].replace("E:\\\\DBAMaintenance.WebUI\\ProjectUI\\src\\assets\\folder\\",""))}}>
                        {"Download"}
                      </Button>
                      <Divider />
                      &nbsp;
                      </div>
                  }) : <div>{"no files"}</div>
              }
          </List>
        </Grid>
    </div>
  );
}
