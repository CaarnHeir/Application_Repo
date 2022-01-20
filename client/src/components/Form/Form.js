import React, { useState, useEffect }from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { createPost , updatePost } from '../../actions/posts';



const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ company: '', jobTitle: '', description: '', tags: [], selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((description) => description._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const clear = () => {
        setCurrentId(0);
        setPostData({ company: '', jobTitle: '', description: '', tags: [], selectedFile: '' });
      };
    
      useEffect(() => {
        if (!post?.company) clear();
        if (post) setPostData(post);
      }, [post]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, creator: user?.result?.creator }, history));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, creator: user?.result?.creator }));
          clear();
        }
      };
      
      if (!user?.result?.name) {
        return (
          <Paper className={classes.paper} elevation={6}>
            <Typography variant="h6" align="center">
              Please Sign In to add new postings.
            </Typography>
          </Paper>
        );
      }
     

    return(
        <Paper className= {classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant= 'h6'>{ currentId ? 'Editing' : 'Adding'} an Application</Typography>
                <TextField name = "company" variant = "outlined" label = "Company" fullWidth value = {postData.company} onChange = {(e) => setPostData({ ...postData, company: e.target.value })}/>
                <TextField name = "jobTitle" variant = "outlined" label = "JobTitle" fullWidth value = {postData.jobTitle} onChange = {(e) => setPostData({ ...postData, jobTitle: e.target.value })}/>
                <TextField name = "description" variant = "outlined" label = "Description" fullWidth value = {postData.description} onChange = {(e) => setPostData({ ...postData, description: e.target.value })}/>
                <TextField name = "tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className = {classes.fileInput} >
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant = 'contained' color = 'primary' size = 'large' type = 'submit' fullWidth>Submit</Button>
                <Button variant = 'contained' color = 'secondary' size = 'small' onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>

    );
};


export default Form;