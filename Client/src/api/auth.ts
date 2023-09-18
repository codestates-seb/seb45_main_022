import axios from '../utility/axios';
const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_RESTAPI
const REDIRECT_URI = ''

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


export const kakaoAuth = () => {
  console.log('kakao login')



  return window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  )
}
