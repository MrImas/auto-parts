import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

categorySchema.plugin(uniqueValidator);

export default mongoose.model('Category', categorySchema);
