import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
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
    status: {
      type: String,
      enum: ['Awaiting', 'Approved', 'Declined'],
      required: true,
      default: 'Awaiting',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
