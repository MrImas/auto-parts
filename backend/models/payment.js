import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
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
  status: { type: Boolean, required: true, default: false },
});

export default mongoose.model('Payment', paymentSchema);
