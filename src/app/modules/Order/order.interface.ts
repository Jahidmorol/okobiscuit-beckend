import { Types } from 'mongoose';

export type TOrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  ItemTotalPrice: number;
};

export type TOrder = {
  seller: Types.ObjectId;
  location: string;
  shopName: string;
  shopOwnerName: string;
  contact: string;
  address: string;
  date: string;
  deliveryDate: string;
  items: TOrderItem[];

  grandTotalPrice: number;
  advancedPrice: number;
  duePrice: number;
  lastDue: number;
  totalPrice: number;
};
