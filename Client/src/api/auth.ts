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

export const registerAuth = async (userData: NewUserData) => {
  const response = await axios.post(`user/signup`, userData);
  console.log(response);
  return response.data;
};

export const loginAuth = async (userData: LoginUserData) => {
  const response = await axios.post(`login`, userData);
  return response.data;
};
