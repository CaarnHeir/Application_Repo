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
    
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if( currentId ){
            dispatch(updatePost( currentId , postData ));
        } else{
            dispatch(createPost( postData ));
        }
    } 
        useEffect(() => {
            if(post) setPostData(post);
        }, [post])

    const clear = () => {
        setCurrentId(null);
        setPostData({company: '', description: '', jobTitle: '', tags: '', selectedFile: ''});
    } 
    return(
        <Paper className= {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant= 'h6'>{ currentId ? 'Editing' : 'Adding'} an Application</Typography>
                <TextField 
                    name = "company" 
                    variant = "outlined" 
                    label = "Company" 
                    fullWidth
                    value = {postData.company}
                    onChange = {(e) => setPostData({ ...postData, company: e.target.value })}
                />
                <TextField 
                    name = "description" 
                    variant = "outlined" 
                    label = "Description" 
                    fullWidth
                    value = {postData.description}
                    onChange = {(e) => setPostData({ ...postData, description: e.target.value })}
                />
                <TextField 
                    name = "jobTitle" 
                    variant = "outlined" 
                    label = "JobTitle" 
                    fullWidth
                    value = {postData.jobTitle}
                    onChange = {(e) => setPostData({ ...postData, jobTitle: e.target.value })}
                />
                <TextField 
                    name = "tags" 
                    variant = "outlined" 
                    label = "Tags" 
                    fullWidth
                    value = {postData.tags}
                    onChange = {(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div className = {classes.fileInput} >
                    <FileBase
                        type='file'
                        multiple = {false}
                        onDone= {({base64}) => setPostData({ ...postData, selectedFile: base64})}

                    />
                </div>
                <Button className={classes.buttonSubmit} variant = 'contained' color = 'primary' size = 'large' type = 'submit' fullWidth>Submit</Button>
                <Button variant = 'contained' color = 'secondary' size = 'small' onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>

    )
}

export default Form;