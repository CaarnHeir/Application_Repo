import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import useStyles from './styles';
import { deletePost, interactionPost } from '../../../actions/posts';

const Post = ({ post , setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Interactions = () => {
        if(post.interactions.length > 0) {
            return post.interactions.find((interaction) => interaction === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.interactions.length > 2 ? `You and ${post.interactions.length - 1} others` : `${post.interactions.length} interaction${post.interactions.length > 1 ? 's' : ''}` }</>
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.interactions.length} {post.interactions.length === 1 ? 'Interaction' : 'Interactions'}</>
                );
            }
        
            return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Interaction</>;
        };

    return(
        <Card className= {classes.card}>
            <CardMedia className = {classes.media} image = {post.selectedFile} title = {post.company}/>
            <div className = {classes.overlay}>
                <Typography variant = "h6">{post.company} - {post.jobTitle}</Typography>
                <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button onClick={(e) => {
                            e.stopPropagation(); 
                            setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small">
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                )}
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
                <Button size = 'small' color = 'primary' disabled = {!user?.result} onClick = {() => dispatch(interactionPost(post._id))}>
                    <Interactions />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size = 'small' color = 'primary' onClick = {() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize = 'small' />Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;