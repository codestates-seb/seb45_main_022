const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'auth/login';
  };

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
