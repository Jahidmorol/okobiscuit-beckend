import { Types } from 'mongoose';

export type TOrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  itemTotalPrice: number;
};

export type TOrder = {
  seller: Types.ObjectId;
  location: string;
  shopName: string;
  shopOwnerName: string;
  contact: string;
  address: string;
  deliveryDate: string;
  items: TOrderItem[];
  grandTotalPrice: number;
  advancedPrice: number;
  duePrice: number;
  totalPrice: number;
};
