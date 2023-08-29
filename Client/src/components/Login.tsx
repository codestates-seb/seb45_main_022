import ModalFrame from './common/ModalFrame';

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <ModalFrame height={450} width={600}>
        <form className="flex flex-col items-center justify-center">
          <input
            placeholder="Email"
            type="email"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2 "
          />
          <input
            placeholder="Password"
            type="password"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
          />
          <button className="w-full h-[40px] bg-black text-white rounded-lg my-2 hover:cursor-grabbing">
            Login
          </button>

          <div className="my-2">
            <span>OR</span>
          </div>

          <div className="flex items-center justify-center my-2">
            <img
              src="../assets/common/kakao-login.png"
              alt="kakao login"
              className="w-[30%]"
            />
            <img
              src="../assets/common/google-login.png"
              alt="google login"
              className="w-[30%]"
            />
          </div>
          <div className="text-[10px] flex items-center justify-evenly w-full">
            <span className="text-neutral-500">Don't have an account yet?</span>
            <span className="text-neutral-100">Sign up!</span>
          </div>
        </form>
      </ModalFrame>
    </div>
  );
};

export default Login;
