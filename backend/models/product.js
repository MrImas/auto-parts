import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: 'Category' },
});

export default mongoose.model('Product', productSchema);
