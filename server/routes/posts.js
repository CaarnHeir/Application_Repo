//Handling all routing for posts
import express from 'express';
// import express, { response } from 'express';
import { getPosts, createPost, updatePost, deletePost, interactionPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth,  updatePost);
router.delete('/:id', auth,  deletePost);
router.patch('/:id/interactionPost', auth, interactionPost);

export default router;