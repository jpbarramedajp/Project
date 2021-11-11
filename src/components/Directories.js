import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Paper, Typography } from '@material-ui/core';
import React,{useContext} from 'react';
import {DashBoardContext} from '../helpers/Context';
import { makeStyles } from '@material-ui/core/styles';
import Files from './Files';
import { FileUpload } from './FileUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: 'red'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

export default function Directories() {
  const classes = useStyles();
  const {folders, isFileReady} = useContext(DashBoardContext);

  return (
      <Paper >
          <Grid  container >
            {
              isFileReady?
              Object.keys(folders).map(function(key, index) {
                return <Grid item xs={6} style={{paddingTop: "15px"}}>
                  <Card className={classes.root}>
                    <CardHeader
                      title={folders[index].path}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p"> 
                        <Files files={folders[index]}/>
                      </Typography>
                      <FileUpload path={folders[index].path}/>
                    </CardContent>
                    <CardActions disableSpacing>
                      {/* <IconButton aria-label="Give Review"> */}
                      {/* {isLiked(service.id) == 0? <StarRateIcon onClick={() => toggleLike('insert', service.id)}/> : <StarRateIcon onClick={() => toggleLike('delete', service.id)}  style={{ color: 'red' }}/>}
                      </IconButton>
                      {'                      Liked by ' + getlikes(service.id).length + ' people.'}
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton> */}
                    </CardActions>
                  </Card>
                </Grid>
              }):<div></div>
            }
          </Grid> 
      </Paper>
  );
}