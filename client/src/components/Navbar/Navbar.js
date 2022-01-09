import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { link } from 'react-router-dom';

import useStyles from '.styles';
import applicationLogo from '../../images/applicationLogo';

export const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className = { classes.appBar } position = 'static' color = 'inherit'>
            <div className={ classes.brandContainer }>
                <Typography component = { link } to = "/" className= { classes.heading } variant="h2" align="center">Application Tracker</Typography>
                <img className = { classes.image } src = { applicationLogo } alt="applicationLogo" height="60"/>
            </div>
        </AppBar>
    )
}

export default Navbar;