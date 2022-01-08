import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, interactionPost } from '../../../actions/posts';

const Post = ({ post , setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <Card className= {classes.card}>
            <CardMedia className = {classes.media} image = {post.selectedFile} title = {post.company}/>
            <div className = {classes.overlay}>
                <Typography variant = "h6">{post.company} - {post.jobTitle}</Typography>
                <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>
                <Button style = {{color: 'white'}} size ='small' onClick = {() => setCurrentId( post._id )}>
                    <MoreHorizIcon fontSize = 'default'></MoreHorizIcon>
                </Button>
            </div>
            <div className = {classes.details}>
                <Typography variant = "body2" color = 'textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className = {classes.title} variant = "h5" noWrap='True' gutterBottom>
                        {post.description}
                </Typography> 
            </CardContent>
            <CardActions className = {classes.cardActions}>
                <Button size = 'small' color = 'primary' onClick = {() => dispatch(interactionPost(post._id))}>
                    <ThumbUpAltIcon fontSize = 'small' />
                        interactions {""}
                        {post.interactions}
                </Button>
                <Button size = 'small' color = 'primary' onClick = {() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize = 'small' />
                        Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;