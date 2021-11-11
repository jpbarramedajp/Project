import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, TextField } from '@material-ui/core';
import {DashBoardContext} from '../helpers/Context';
import StarRateIcon from '@material-ui/icons/StarRate';
import Button from '@material-ui/core/Button';
import { BASE_URL_API } from '../envSetting.js';
import { GetLikes, GetReviews } from '../helpers/Utils';
import { serviceList } from '../helpers/Constants';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] =  React.useState('');
  const {reviews, user, setReviews, likes, setLikes} = useContext(DashBoardContext);
  const service = props.service
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 

  const getReviews = (id) => {
      const list = reviews.filter(x => x.serviceId === id);
      return list;
  }

  const getRates = (id,user) => {
    const list = likes.filter(x => {
      return x.serviceId === id && x.user === user;
    });
    if(list[0] !== undefined) return list[0].like;
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

  const insertReview = async (id) => {
    await postComment(id);
    setReviews(await GetReviews())
    setComment('');
  }

  // const toggleLike = async (action, id) => {
  //   await LikeUnlike(action, id)
  //   setLikes(await GetLikes());
  // }

  const handleLike = async (rating, user, id) => {
    await Rate(rating, user, id)
    setLikes(await GetLikes());
  }

  const postComment = async (id) => {
    const response = await fetch(`${BASE_URL_API}api/getreviews`,
      {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'comment': comment,
              'id' : user.userName,
              'serviceId' : id
          },
          redirect: 'follow'
      });
      const body = await response.json();
      return body;
  }

  const Rate = async (rating, user, id) => {
    const response = await fetch(`${BASE_URL_API}api/Likes`,
      {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'like': rating,
              'user' : user,
              'serviceId' : id
          },
          redirect: 'follow'
      });
      const body = await response.json();
      console.log(body);
      return body;
  }

  const IsColored = (like, x, user, id) => {
    var isValid = (x <= like);
    if(isValid) return <StarRateIcon style={{color: 'blue'}} onClick={() => handleLike(x, user, id)}/>
    else return <StarRateIcon style={{color: 'gray'}} onClick={() => handleLike(x, user, id)}/>;
  }


  return (
    <Grid item xs={3}>
    <Card className={classes.root}>
      <CardHeader
        title={service.title}
        subheader={service.subtitle}
      />
      <CardMedia
        className={classes.media}
        image={process.env.PUBLIC_URL + '/' + service.image} 
        title="test"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p"> 
        {service.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Give Review">
        {
            [1,2,3,4,5].map(x => {
              return IsColored(getRates(service.id, user.userName), x, user.userName, service.id);
            })
        }
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField placeholder="comment" onChange={(e) => setComment(e.target.value)} onBlur={(e) => setComment(e.target.value)}>
          </TextField><span>{'                 '}</span>
          <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => insertReview(service.id)}
          >
              Post
            </Button>
          <Typography variant="body2" color="textSecondary" component="p" > This service has a total rating of: {getRatesAverage(service.id)} stars</Typography>
          <Typography paragraph>Reviews:</Typography>
          {
            getReviews(service.id).map((review) => {
                return  <div>
                            <Typography variant="body2" color="textSecondary" component="p" ><b>{review.createdBy}</b>: {review.comment}</Typography>
                            {/* <Typography variant="body2">{review.rating}/5</Typography> */}
                            <div>&nbsp;</div>
                        </div>
            })
          }
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
  );
}
