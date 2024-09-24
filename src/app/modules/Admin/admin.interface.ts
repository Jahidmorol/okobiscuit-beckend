/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './admin.constant';

export interface TUser {
  name: string;
  photo: string;
  password: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'seller';
  isAdminApproved: boolean;
  passwordChangedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  //instance methods for checking if password is changed or not. if changed password token will unAuthorize
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
