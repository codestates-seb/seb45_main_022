const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    window.location.href =
      'http://ec2-3-34-91-214.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google';
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="w-[200px] h-[50px] bg-yellow-300 rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black "
    >
      Google Login
    </button>
  );
};

export default GoogleLoginButton;
