import mongoose from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { promisify } from 'util';

const genSaltAsync = promisify(genSalt);
const hashAsync = promisify(hash);
const compareAsync = promisify(compare);

const SALT_WORK_FACTOR = 10;

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    default: 'Employee',
  },
  displayName: {
    type: String,
    default: 'Anonymous',
  },
  lastName: {
    type: String,
    default: 'Anonymous',
  },
  firstName: {
    type: String,
    default: 'Anonymous',
  },
  password: {
    type: String,
    minlength: 4,
  },
  lastModifiedDate: Date,
});

schema.pre('save', function (next) {
  const user = this;
  user.lastModifiedDate = new Date();
  if (!user.isModified('password')) {
    return next();
  }
  return genSaltAsync(SALT_WORK_FACTOR)
    .then(salt => hashAsync(user.password, salt))
    .then((hashValue) => {
      user.password = hashValue;
      next();
    }).catch(err => next(err));
});

schema.methods.comparePassword = function (candidatePassword, cb) {
  return compareAsync(candidatePassword, this.password)
    .then(isMatch => cb(null, isMatch))
    .catch(err => cb(err));
};

export default schema;
