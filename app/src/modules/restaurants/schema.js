import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
    min: 3,
  },
  address : {
    building: String,
    coord: [ Number ],
    street: String,
    zipcode: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  borough: String,
  cuisine: String,
  grades: [],
  name: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: Number,
    required: true
  },
  lastModifiedDate: Date,
});

schema.pre('save', function (next) {
  this.lastModifiedDate = new Date();
  next();
});

export default schema;
