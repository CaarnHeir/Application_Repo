import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';

const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const [signedUp, setSignedUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setFormData(initialState);
        setSignedUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(signedUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            history.push('/');
        } catch (error) {
            
        }
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
                <br></br>
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
                        clientId = {process.env.REACT_APP_CLIENT_ID} 
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

export default Auth;
