
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: { type: String },
}, { timestamps: true } );

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
