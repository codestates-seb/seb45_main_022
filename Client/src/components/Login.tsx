import { useState } from 'react';
import ModalFrame from './common/ModalFrame';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  //   const [userAlert, setUserAlert] = useState(false);

  // email format
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 최소 8 자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

  const validateUserInput = () => {
    if (!emailRegEx.test(email)) {
      setEmailErr(!emailErr);
    }
    if (!passwordRegex.test(password)) {
      setPasswordErr(!passwordErr);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateUserInput();
  };

  return (
    <div className="flex justify-center items-center">
      <ModalFrame height={500} width={650}>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center"
        >
          <input
            placeholder="Email"
            type="text"
            className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            onChange={(e) => {
              setEmail(e.target.value);
              {
                emailErr ? setEmailErr(true) : setEmailErr(false);
              }
            }}
            value={email}
            onFocus={(e) => console.log('onFocus')}
            onBlur={(e) => console.log('onBlur')}
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
            onFocus={(e) => console.log('onFocus')}
            onBlur={(e) => console.log('onBlur')}
          />
          {passwordErr && (
            <p className="text-[10px] my-2 text-red-500">
              Eight characters, at least one letter and one number
            </p>
          )}

          <button className="w-full h-[40px] bg-black text-white rounded-lg my-2 hover:cursor-grabbing">
            Login
          </button>

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
