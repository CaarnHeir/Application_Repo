import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setSignedUp((prevSignedUp) => !prevSignedUp);
        handleShowPassword(false);
    }
    
    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const googleSuccess = (res) => {
        console.log(res);
    }
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Please, try again.");
    }

    return (
        <Container component= 'main' maxWidth = 'xs'>
            <Paper className = { classes.paper } elevation = { 3 }>
                <Avatar className = { classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant ='h5'>{ signedUp ? 'Sign Up' :'Sign In' }</Typography>
                <form className = { classes.signedUp } onSubmit = { handleSubmit }>
                    <Grid container spacing = { 2 }>
                        {
                            signedUp && (
                                <>
                                    <Input name = 'firstname' label = 'First Name' handleChange = { handleChange } autoFocus half/>
                                    <Input name = 'lastname' label = 'Last Name' handleChange = { handleChange } half/>
                                </>
                            )}
                        <Input name = 'email' label = 'Email Address' handleChange = { handleChange } type = 'email'/>
                        <Input name = 'password' label = 'Password' handleChange = { handleChange } type = { showPassword ? 'text' : 'password' } handleShowPassword = { handleShowPassword} /> 
                        { signedUp && <Input name = 'confirmPassword' label = 'Confirm Password' handleChange = { handleChange } type = 'password'/>}
                    </Grid>
                    <Button type = 'submit' fullWidth variant = 'contained' color = 'primary' className= { classes.submit }>
                        { signedUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId = {process.env.CLIENT_ID} 
                        render = { (renderProps) => (
                            <Button 
                                className= { classes.googleButton } 
                                color = 'primary' 
                                fullWidth 
                                onClick = { renderProps.onClick } 
                                disabled = { renderProps.disabled } 
                                startIcon = { <Icon/> } 
                                variant = 'contained'>
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess = { googleSuccess }
                        onFailure = { googleFailure }
                        cookiePolicy ='single_host_origin'
                    />
                    <Grid container justify = 'flex-end'>
                        <Grid item>
                            <Button onClick={ switchMode }>
                                { signedUp ? 'Already have an account? Sign In' : 'No account? Sign Up!'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
