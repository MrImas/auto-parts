import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: Number, required: true, default: 0 }, //role: 0 => regular user, role: 1 => user is admin
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
