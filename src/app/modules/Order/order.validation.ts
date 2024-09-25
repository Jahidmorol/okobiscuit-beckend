import { z } from 'zod';

// schema for order items
const OrderItemSchema = z
  .object({
    name: z.string({ required_error: 'Item name is required' }),
    unitPrice: z.number({ required_error: 'Unit price is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    ItemTotalPrice: z.number({
      required_error: 'Item total price is required',
    }),
  })
  .strict();

// main order schema
const OrderSchema = z
  .object({
    // seller: z.instanceof(Types.ObjectId, { message: 'Invalid seller ID' }),
    seller: z.string({ required_error: 'seller ID is required' }),
    location: z.string({ required_error: 'Location is required' }),
    shopName: z.string({ required_error: 'Shop name is required' }),
    shopOwnerName: z.string({ required_error: 'Shop owner name is required' }),
    contact: z.string({ required_error: 'Contact is required' }),
    address: z.string({ required_error: 'Address is required' }),
    deliveryDate: z.string({ required_error: 'Delivery date is required' }),
    items: z
      .array(OrderItemSchema, {
        required_error: 'At least one item is required',
      })
      .min(1, 'At least one item is required'),
    grandTotalPrice: z.number({
      required_error: 'Grand total price is required',
    }),
    advancedPrice: z.number({ required_error: 'Advanced price is required' }),
    duePrice: z.number({ required_error: 'Due price is required' }),
    lastDue: z.number({ required_error: 'Last due is required' }),
    totalPrice: z.number({ required_error: 'Total price is required' }),
  })
  .strict();

// Create validation schemas for order creation and updates
export const createOrderValidationSchema = z.object({
  body: OrderSchema.strict(),
});

export const updateOrderValidationSchema = z.object({
  body: OrderSchema.partial().strict(),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
