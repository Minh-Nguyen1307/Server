import express from 'express'
import { createPost, updatePost } from '../controller/postController.js';
import { verifyApiKey } from '../middleware/verifyApikey.js';

const Router = express.Router();
Router.post('/post', verifyApiKey, createPost);
Router.put('/post/:id', verifyApiKey, updatePost);

export default Router;