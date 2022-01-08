//Handling all routing for posts
import express from 'express';
// import express, { response } from 'express';
import { getPosts, createPost, updatePost, deletePost, interactionPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/interactionPost', interactionPost);

export default router;