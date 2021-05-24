import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

categorySchema.plugin(uniqueValidator);

export default mongoose.model('Category', categorySchema);
