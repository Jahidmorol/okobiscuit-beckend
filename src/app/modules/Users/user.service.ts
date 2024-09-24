import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { TUser } from './user.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { User } from './user.model';

const createAdmin = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };

  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new appError(httpStatus.CONFLICT, 'User already exists');
  }

  userData.role = 'admin';

  const result = await User.create(userData);

  return result;
};

const createSeller = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };

  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new appError(httpStatus.CONFLICT, 'User already exists');
  }

  userData.role = 'seller';

  const result = await User.create(userData);

  return result;
};

const getMe = async (email: string) => {
  const result = await User.findOne({ email });

  return result;
};

const updateMe = async (email: string, payload: Record<string, unknown>) => {
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new appError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });

  return result;
};

const getAllUser = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await UserQuery.countTotal();
  const result = await UserQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const deleteUser = async (id: string) => {
  const findMachine = await User.findOne({ _id: id });

  if (!findMachine) {
    throw new appError(404, 'User not found!');
  }

  await User.findOneAndDelete({ _id: id });

  return null;
};

export const UserService = {
  createAdmin,
  createSeller,
  getMe,
  updateMe,
  getAllUser,
  deleteUser,
};
