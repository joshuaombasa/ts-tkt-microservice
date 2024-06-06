import mongoose from 'mongoose';

interface UserAttrs {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString('hex');
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', userSchema);

const build = (attrs: UserAttrs) => {
  return new User(attrs);
};



export {User, build}