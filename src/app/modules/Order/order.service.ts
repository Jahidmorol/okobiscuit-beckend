/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import appError from '../../errors/appError';
import { User } from '../Users/user.model';
import { OrderSearchableFields } from './order.constants';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import httpStatus from 'http-status';

const createOrderDB = async (
  user: Record<string, unknown>,
  payload: TOrder,
) => {
  const isSellerExist = await User.findOne({
    email: user.email,
    isAdminApproved: true,
  });

  if (!isSellerExist) {
    throw new appError(httpStatus.NOT_FOUND, 'This Seller does not exist');
  }
  payload.seller = isSellerExist._id;

  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async (
  userEmail: string,
  query: Record<string, unknown>,
) => {
  const isUser = await User.findOne({ email: userEmail });

  const roleBasedQuery: Record<string, unknown> = {};
  if (isUser && isUser.role === 'seller') {
    roleBasedQuery.seller = isUser._id;
  }

  const OrderQuery = new QueryBuilder(
    Order.find(roleBasedQuery).populate('seller'),
    query,
  )
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await OrderQuery.countTotal();
  const result = await OrderQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id);

  if (!result) {
    throw new appError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  return result;
};

const deleteOrder = async (id: string) => {
  const deleteOrder = await Order.findByIdAndDelete(id);

  if (!deleteOrder) {
    throw new appError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  return null;
};

const updateOrder = async (id: string, payload: TOrder) => {
  const findOrder = await Order.findById(id);

  if (!findOrder) {
    throw new appError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const OrderService = {
  createOrderDB,
  getAllOrder,
  getSingleOrder,
  deleteOrder,
  updateOrder,
};
