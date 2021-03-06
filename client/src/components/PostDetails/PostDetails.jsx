import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Post = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { post } = useSelector((state) => state.posts);
  const { posts, isLoading } = useSelector((state) => {
    if(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator){
      return state.posts
    } else {
      console.log("ERROR");
    }  
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    if(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator){
      dispatch(getPost(id));
    } else {
      console.log('THIS IS NOT YOUR POST>>>SHAME SHAME SHAME');
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  },[post]);

  if (!post) return null;

  const openPost = (_id) => {
   if(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator){
    history.push(`/posts/${_id}`);
   } else {
    console.log('THIS IS NOT YOUR POST>>>SHAME SHAME SHAME');
   }
   };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <>
    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.company}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
          <Typography variant="h6">Job Title: {post.jobTitle}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ company, jobTitle, description, interactions, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{company}</Typography>
                <Typography gutterBottom variant="subtitle2">{jobTitle}</Typography>
                <Typography gutterBottom variant="subtitle2">{description}</Typography>
                <Typography gutterBottom variant="subtitle1">Interactions: {interactions.length}</Typography>
                <img src={selectedFile} alt='' width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
    )}
    </>
  );
};

export default Post;


// import React from 'react';

// const PostDetails = () => {
//   console.log("Post details");
//   return (
//     <div>
//         POST DETAILS
//     </div>
//   )
// }

// export default PostDetails;
