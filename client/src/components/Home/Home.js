import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import decode from 'jwt-decode';

import { getPostsBySearch } from '../../actions/posts';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from './styles';
import * as actionType from '../../constants/actionTypes';
import Application_Tracker_Video_Loop from '../../images/Application_Tracker_Video_Loop.mp4';


function useQuery() {
     return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
    const  dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
      history.push('/auth');
      setUser(null);
    };

    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          history.push('/');
        }
      };
      
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };

    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const clearSearch = () => {
        setCurrentId(0);
        setSearch('');
        history.push('/posts');
      };

    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);  

    return (
        <Grow in>
                <Container maxWidth='xl'>
                    {user? (
                      <>
                      <Grid className = {classes.gridContainer} container justifyContent = "space-between" alignItems="stretch" spacing= {3}> 
                        <Grid item xs = {12} sm = {6} md={9}>
                            <Posts setCurrentId = { setCurrentId } />
                        </Grid>
                        <Grid item xs = {12} sm = {6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Applications" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={(chip) => handleAdd(chip)}
                                    onDelete={(chip) => handleDelete(chip)}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                                <br/> 
                                {/* //TODO: Need to remove br and fix styling to creat the same spacing as the submit clear. */}

                                <Button onClick = {clearSearch} variant = 'contained' color = 'secondary' size = 'small' fullWidth>Clear</Button> 
                            </AppBar>
                            <Form currentId = {currentId}setCurrentId = { setCurrentId } />
                            {(!searchQuery && !tags.length) && (
                              <Paper elevation={6} className = {classes.pagination}>
                                    <Pagination page= {page}/>
                                </Paper>
                            )}
                        </Grid>
                      </Grid>
                      </>
                      ):(
                      <>
                        <Grid className = {classes.gridMovie} container justifyContent = "center" alignItems="stretch" spacing= {3}>
                          {/* <Form currentId = {currentId}setCurrentId = { setCurrentId } /> */}
                          <video className ='videoTag' autoPlay loop muted>
                            <source src={Application_Tracker_Video_Loop} type='video/mp4'/>
                          </video>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid className = {classes.textContainer} container justifyContent = "center" alignItems="center" spacing= {0}>
                          <Typography variant="h6">Your one-stop-shop for tracking positions that you have applied to.</Typography>    
                        </Grid>
                        <Grid className = {classes.textContainer} container justifyContent = "center" alignItems="center" spacing= {0}>
                          <Typography variant='subtitle1'>Gone are the days of trying to find a post you applied for that has subsequently been taken off the company site!</Typography>
                        </Grid>
                      </>
                      )}
                </Container>
            </Grow>
    )
};

export default Home
