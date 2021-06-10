import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  password1: { type: String, default: '' },
  password2: { type: String, default: '' },
  role: { type: Number, required: true, default: 0 }, //role: 0 => regular user, role: 1 => user is admin
  cart: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  numOfAttempts: { type: Number, required: true, default: 0, min: 0, max: 3 },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
