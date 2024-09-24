import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged in successfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body.email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successful!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
