import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import appError from '../../errors/appError';
import { createToken } from './auth.utils';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../Users/user.model';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new appError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new appError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      userData.iat as number,
    )
  ) {
    throw new appError(
      httpStatus.UNAUTHORIZED,
      'You Need to Login first, you are unauthorized !',
    );
  }

  if (payload.oldPassword === payload.newPassword) {
    throw new appError(
      httpStatus.CONFLICT,
      'Password is matched your old password! ',
    );
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new appError(httpStatus.FORBIDDEN, 'Your password is Wrong');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const forgetPassword = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new appError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
  );

  // const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken} `;

  const resetUILink = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}'>Click Here</>`;
  sendEmail(user.email, resetUILink);

  // eslint-disable-next-line no-console
  console.log(resetUILink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new appError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  if (payload.email !== decoded.email) {
    throw new appError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      decoded.iat as number,
    )
  ) {
    throw new appError(httpStatus.UNAUTHORIZED, 'You are not authorized !!!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
