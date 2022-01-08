//Handling all routing for posts

import express, { response } from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;