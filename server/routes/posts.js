//Handling all routing for posts
import express from 'express';
// import express, { response } from 'express';
import { getPosts, createPost, updatePost, deletePost, getPost, commentPost, getPostsBySearch } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', auth , getPosts);
router.get('/:id', auth , getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/commentPost',auth, commentPost);
// router.patch('/:id/likePost', auth, likePost);
// router.post('/:id/commentPost', commentPost);

export default router; 