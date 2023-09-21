import axios from 'axios';
import { useEffect } from 'react';

const KakaoLoginButton = () => {
  const currentURL = window.location.href;

  function getQueryParam(name: string) {
    const urlSearchParams = new URLSearchParams(new URL(currentURL).search);
    return urlSearchParams.get(name);
  }

  const access_token = getQueryParam('access_token');
  const refresh_token = getQueryParam('refresh_token');

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const KAKAO_AUTH_URL = import.meta.env.VITE_APP_KAKAO_URL;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    localStorage.setItem('token', `Bearer ${access_token}`);
    // getKakaoUserData();
  };

  console.log(access_token);

  // const getKakaoUserData = async () => {
  //   try {
  //     const response = await axios.get('https://kapi.kakao.com/v2/user/me');

  //     if (response.status === 200) {
  //       const userInfo = response.data;
  //       console.log('User info..', userInfo);
  //     } else {
  //       console.error('failed to GET user info from Kakao.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-[200px] h-[50px] bg-yellow-300 rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black "
    >
      Kakao Login
    </button>
  );
};

export default KakaoLoginButton;
