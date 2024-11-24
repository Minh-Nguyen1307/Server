import express from 'express'
import { createUser, getAllUsers, loginUser } from '../controller/userController.js';
import { authenticateUser, isAdmin } from '../middleware/authentication.js';
// import { createUser, getAllUsers } from '../controller/userController.js';
// import { authenticateUser, isAdmin } from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.post('/register', createUser);
Router.post('/login', loginUser);
Router.get('/all', authenticateUser, isAdmin, getAllUsers);

export default Router;