import axios from 'axios';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;



interface LoginUserData {
  email: string;
  password: string;
}

interface NewUserData {
  email: string;
  nickName: string;
  password: string;
}

export const registerAuth = async (userData: NewUserData) => {
  try {
    const response = await axios.post(`${baseUrl}user/signup`, userData);
    console.log(response)
    return response
  } catch (err) {
    console.error('Error registering user:', err);

  }
};

export const loginAuth = async (userData: LoginUserData) => {
  const response = await axios.post(`${baseUrl}login`, userData);
  return response;
};
