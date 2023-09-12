import axios from '../utility/axios';

interface LoginUserData {
  email: string;
  password: string;
}

interface NewUserData {
  email: string;
  nickname: string;
  password: string;
}

export enum RegisterErrorCode {
  EMAIL_DUPLICATION = 'U004',
  NICKNAME_DUPLICATION = 'U005',
  INVALID_INPUT = 'V000',
}

export interface RegisterError {
  status: number;
  message: string;
  errorCode: RegisterErrorCode;
}

export const REGISTER_ERR_MSG = {
  [RegisterErrorCode.EMAIL_DUPLICATION]: 'Existing email address',
  [RegisterErrorCode.NICKNAME_DUPLICATION]: 'Existing nickname',
  [RegisterErrorCode.INVALID_INPUT]: 'Invalid input',
};

export const registerAuth = async (userData: NewUserData) => {
  const response = await axios.post(`user/signup`, userData);
  console.log(response);
  return response;
};

export const loginAuth = async (userData: LoginUserData) => {
  const response = await axios.post(`login`, userData);
  return response;
};
