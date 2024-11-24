import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  
  
const app = express();

app.use(express.json());


app.use('/api/users', userRoutes);



app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).json({
      message: 'Something went wrong!',
      error: err.message,
      success: false
    });
  });
  
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
  });
  