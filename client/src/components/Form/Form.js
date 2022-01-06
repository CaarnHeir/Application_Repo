import React, { useState }from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';

import useStyles from './styles';


const Form = () => {
    const [postData, setPostData] = useState ({
       company: '', description: '', jobTitle: '', tags: '', selectedFile: ''
    });
    const classes = useStyles();
    const handleSubmit = () => {

    } 
    const clear = () => {

    } 
    return(
        <Paper className= {classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant= 'h6'>Adding a New Application</Typography>
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