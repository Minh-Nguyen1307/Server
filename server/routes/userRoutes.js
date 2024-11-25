import express from 'express'
import { createUser, loginUser} from '../controller/userController.js';

const Router = express.Router();

Router.post('/register', createUser);
Router.post('/login', loginUser);



export default Router;