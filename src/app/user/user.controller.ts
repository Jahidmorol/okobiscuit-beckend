import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Student created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await UserService.getMe(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Details is retrieved successfully',
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await UserService.updateMe(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Details is Updated successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUser(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All User Successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete User Successfully!',
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  getMe,
  updateMe,
  getAllUser,
  deleteUser
};
