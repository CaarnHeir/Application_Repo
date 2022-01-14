import React, { useState, useEffect }from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost , updatePost } from '../../actions/posts';



const Form = ({ currentId, setCurrentId }) => {
    
    const [postData, setPostData] = useState ({
       company: '', description: '', jobTitle: '', tags: '', selectedFile: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if( currentId ){
            dispatch(updatePost({ ...postData, creator: user?.result?.creator }));
        } else{
            dispatch(createPost( currentId, { ...postData, creator: user?.result?.creator } ));
        }
        clear();
    } 
        useEffect(() => {
            if(post) setPostData(post);
        }, [post]);

        if (!user?.result?.name) {
            return (
              <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                  Please Sign In to add new postings.
                </Typography>
              </Paper>
            );
          }

    const clear = () => {
        setCurrentId(null);
        setPostData({company: '', description: '', jobTitle: '', tags: '', selectedFile: ''});
    } 
    return(
        <Paper className= {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant= 'h6'>{ currentId ? 'Editing' : 'Adding'} an Application</Typography>
                <TextField name = "company" variant = "outlined" label = "Company" fullWidth value = {postData.company} onChange = {(e) => setPostData({ ...postData, company: e.target.value })}/>
                <TextField name = "jobTitle" variant = "outlined" label = "JobTitle" fullWidth value = {postData.jobTitle} onChange = {(e) => setPostData({ ...postData, jobTitle: e.target.value })}/>
                <TextField name = "description" variant = "outlined" label = "Description" fullWidth value = {postData.description} onChange = {(e) => setPostData({ ...postData, description: e.target.value })}/>
                <TextField name = "tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className = {classes.fileInput} >
                    <FileBase type='file' multiple = {false} onDone= {({base64}) => setPostData({ ...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant = 'contained' color = 'primary' size = 'large' type = 'submit' fullWidth>Submit</Button>
                <Button variant = 'contained' color = 'secondary' size = 'small' onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>

    )
}

export default Form;