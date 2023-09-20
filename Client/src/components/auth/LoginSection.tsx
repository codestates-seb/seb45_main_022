import { useState } from 'react';
import ModalFrame from '../common/ModalFrame';
import sword from '../../assets/common/sword.png';
import shield from '../../assets/common/shield.png';
import Button from '../common/Button';
import LoadingBar from '../common/LoadingBar';
import { Navigate, useNavigate } from 'react-router';
import useLoginMutation from '../../hooks/useLoginMutation';
import { isAxiosError } from 'axios';
import { ErrorType } from '../../api/error';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    mutate: login,
  } = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isLoading) return <LoadingBar />;

  if (isSuccess) {
    const token = data.token;
    localStorage.setItem('token', token);
    return <Navigate to="/main" />;
  }

  return (
    <ModalFrame height={550} width={780}>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-[500px] p-[12px]"
      >
        {isError &&
          isAxiosError<ErrorType>(error) &&
          error.response?.data.errorCode && (
            <p className="text-[0.625rem] my-[4px] text-red-500">
              Please check email or password
            </p>
          )}
        <h1 className="my-[16px] text-2xl">Login</h1>
        <div className="flex items-center relative">
          {isEmailFocused && (
            <img
              src={sword}
              alt="sword icon"
              className="absolute right-[8px]"
            />
          )}
          <input
            placeholder="Email"
            type="text"
            className=" border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            autoComplete="off"
            onFocus={() => {
              setIsEmailFocused(true);
            }}
            onBlur={() => {
              setIsEmailFocused(false);
            }}
          />
        </div>
        <div className="flex items-center relative">
          {isPasswordFocused && (
            <img
              src={shield}
              alt="shield icon"
              className="right-[8px] absolute"
            />
          )}
          <input
            placeholder="Password"
            type="password"
            className="border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            autoComplete="off"
            onFocus={() => {
              setIsPasswordFocused(true);
            }}
            onBlur={() => {
              setIsPasswordFocused(false);
            }}
          />
        </div>
        <Button>Login</Button>
      </form>
      {/* <div className="flex items-center justify-around my-[16px] w-full h-[40px]">
        <button className="w-[200px] h-[50px] bg-yellow-300 rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black ">
          Kakao Login
        </button>
        <button className=" w-[200px] h-[50px] bg-white rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black ">
          Google Login
        </button>
      </div> */}
      <div className="text-[0.625rem] flex items-center justify-evenly w-full my-[8px]">
        <span className="text-neutral-500">Don't have an account yet?</span>
        <span
          className="text-neutral-100 hover:cursor-pointer"
          onClick={() => {
            navigate('/auth/register');
          }}
        >
          Sign up!
        </span>
      </div>
    </ModalFrame>
  );
};

export default Login;
