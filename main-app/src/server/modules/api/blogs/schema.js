import mongoose from 'mongoose';
// Need for referencing
import '../users/repository';

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
  },
  title: {
    type: String,
    default: 'New post',
  },
  body: {
    type: String,
  },
  lastModifiedDate: Date,
});

schema.pre('save', function (next) {
  const blog = this;
  blog.lastModifiedDate = new Date();
  next();
});

export default schema;
