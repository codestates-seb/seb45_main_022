import { useState } from 'react';
import ModalFrame from '../common/ModalFrame';
import sword from '../../assets/common/sword.png';
import shield from '../../assets/common/shield.png';
import Button from '../common/Button';
import LoadingBar from '../common/LoadingBar';
import { useNavigate } from 'react-router';
import { AxiosError, AxiosResponse } from 'axios';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginErrMsg, setShowLoginErrMsg] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const onLoginSuccess = (data: AxiosResponse) => {
    console.log(data);
    if (data.status === 200) {
      const token = data.data.token;
      localStorage.setItem('token', token);
      navigate('/main');
      return;
    }
    alert('User authentication error');
  };

  const onLoginError = (err: AxiosError) => {
    console.log('Login fail', err);
    if (err.response?.status === 401) {
      setShowLoginErrMsg(true);
      return;
    }
    alert('User authentication error');
  };
  const { loginMutation } = useLogin(onLoginSuccess, onLoginError);

  const { isLoading, mutate: login } = loginMutation;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isLoading) return <LoadingBar />;

  return (
    <ModalFrame height={550} width={780}>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-[500px]  p-3"
      >
        {showLoginErrMsg && (
          <p className="text-[10px] my-1 text-red-500">
            Please check email or password
          </p>
        )}
        <h1 className="my-4 text-2xl">Login</h1>
        <div className="flex items-center  relative ">
          {isEmailFocused && (
            <img src={sword} alt="sword icon" className="absolute right-2" />
          )}
          <input
            placeholder="Email"
            type="text"
            className=" border-solid border-2 border-000 p-2 rounded-lg my-4 "
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
            <img src={shield} alt="shield icon" className="right-2 absolute" />
          )}
          <input
            placeholder="Password"
            type="password"
            className="border-solid border-2 border-000 p-2 rounded-lg my-4"
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
        <button className="my-1">
          <Button>Login</Button>
        </button>
      </form>
      <div className="flex items-center justify-around my-4 w-full h-10">
        <button className="w-[200px] h-[50px] bg-yellow-300 rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black ">
          Kakao Login
        </button>
        <button className=" w-[200px] h-[50px] bg-white rounded hover:brightness-110 duration-300 cursor-pointer text-sm border-solid border-black ">
          Google Login
        </button>
      </div>
      <div className="text-[10px] flex items-center justify-evenly w-full my-2">
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