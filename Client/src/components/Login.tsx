import { useState } from 'react';
import ModalFrame from './common/ModalFrame';
import kakaoLoginBar from '../assets/common/kakao-login.png';
import googleLoginBar from '../assets/common/google-login.png';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  //   const [userAlert, setUserAlert] = useState(false);

  // 이메일 포멧
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 최소 6자, 영문 + 숮자
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validateEmail = () => {
    if (!emailRegEx.test(email)) {
      setEmailErr(true);
      console.log('email failure');
    } else {
      setEmailErr(false);
      console.log('email success');
    }
  };

  const validatePass = () => {
    if (!passwordRegex.test(password)) {
      setPasswordErr(true);
      console.log('password failure');
    } else {
      setPasswordErr(false);
      console.log('password success');
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePass();
  };

  return (
    <div className="flex justify-center items-center">
      <ModalFrame height={500} width={650}>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-[500px] h-[380px] p-5"
        >
          <input
            placeholder="Email"
            type="text"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {emailErr && (
            <p className="text-[10px] my-2 text-red-500">
              Please check email format
            </p>
          )}

          <input
            placeholder="Password"
            type="password"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {passwordErr && (
            <p className="text-[10px] my-2 text-red-500">
              Eight characters, at least one letter and one number
            </p>
          )}

          <button className="w-full h-[40px] bg-black text-white rounded-lg my-2 hover:cursor-grabbing">
            Login
          </button>

          <div className="flex items-center justify-around my-4 w-full h-10">
            <img
              src={kakaoLoginBar}
              alt="kakao login"
              className="w-[180px] h-[45px]  hover:cursor-grabbing "
            />
            <img
              src={googleLoginBar}
              alt="google login"
              className="w-[180px] h-[45px]  hover:cursor-grabbing "
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
