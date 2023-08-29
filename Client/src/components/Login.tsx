import { useState } from 'react';
import ModalFrame from './common/ModalFrame';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  // email format
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 최소 8 자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

  const validateUserInput = () => {
    if (!emailRegEx.test(email)) {
      setEmailErr(true);
      alert('check email');
    }
    if (!passwordRegex.test(password)) {
      setPasswordErr(true);
      alert('check password');
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateUserInput();
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center">
      <ModalFrame height={450} width={600}>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center"
        >
          <input
            placeholder="Email"
            type="text"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onFocus={(e) => console.log('onFocus')}
            onBlur={(e) => console.log('onBlur')}
          />
          <input
            placeholder="Password"
            type="password"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={(e) => console.log('onFocus')}
            onBlur={(e) => console.log('onBlur')}
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
