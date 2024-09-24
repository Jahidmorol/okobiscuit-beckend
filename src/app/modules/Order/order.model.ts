import { model, Schema } from 'mongoose';
import { TOrder, TOrderItem } from './order.interface';

const OrderItemSchema = new Schema<TOrderItem>({
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  ItemTotalPrice: { type: Number, required: true },
});

const OrderSchema = new Schema<TOrder>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    shopName: { type: String, required: true },
    location: { type: String, required: true },
    shopOwnerName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },

    grandTotalPrice: { type: Number, required: true },
    advancedPrice: { type: Number, required: true },
    duePrice: { type: Number, required: true },
    lastDue: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', OrderSchema);
