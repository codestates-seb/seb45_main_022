import axios from 'axios';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

interface LoginUserData {
  email: string;
  password: string;
}

interface NewUserData {
  email: string;
  nickname: string;
  password: string;
}

// 원래 여기서 try ...  catch 문 쓰셨는데 그러면 뮤테이션의 onError에서 에러를 잡을 수가 없어요.
export const registerAuth = async (userData: NewUserData) => {
  const response = await axios.post(`${baseUrl}user/signup`, userData);
  console.log(response);
  return response;
};

export const loginAuth = async (userData: LoginUserData) => {
  const response = await axios.post(`${baseUrl}login`, userData);
  return response;
};
