import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';
import hide from '../../assets/icons/hide.png';
import view from '../../assets/icons/view.png';
import { useState } from 'react';

interface RegisterProps {
  setStage: number;
}

const Register = ({ setStage }: RegisterProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [nicknameErr, setNicknameErr] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // 이메일 포멧
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

  //한글 또는 영어, 2-6길이
  const nicknameRegex = /^[가-힣a-zA-Z]{2,6}$/;

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

  const validateNickname = () => {
    if (!nicknameRegex.test(nickname)) {
      setNicknameErr(true);
      console.log('nickname failure');
    } else {
      setNicknameErr(false);
      console.log('nickname success');
    }
  };

  const toggleViewPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePass();
    validateNickname();
  };
  return (
    <div className="flex justify-center items-center ">
      <ModalFrame height={550} width={700}>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center w-[550px] h-[450px] p-5 relative"
        >
          <h1 className="my-2 text-2xl">Register</h1>
          <div className="flex items-center  ">
            <input
              placeholder="Email"
              type="text"
              className=" border-solid border-2 border-000 p-2 rounded-lg my-4 "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {emailErr && (
            <p className="text-[10px]  text-red-500">
              Please check email format
            </p>
          )}

          <div className="flex items-center relative">
            <input
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              className="border-solid border-2 border-000 p-2 rounded-lg my-4 w-full "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={!passwordVisible ? hide : view}
              alt="view icon"
              width={25}
              onClick={toggleViewPassword}
              className="absolute right-2 cursor-pointer"
            />
          </div>
          {passwordErr && (
            <p className="text-[10px]  text-red-500 text-center">
              8-16 characters, lowercase & uppercase, numbers, and characters
            </p>
          )}

          <div className="flex items-center">
            <input
              placeholder="Nickname "
              type="text"
              className="border-solid border-2 border-000 p-2 rounded-lg my-4"
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            />
          </div>

          {nicknameErr && (
            <p className="text-[10px]  text-red-500">
              2-6 characters, Korean or English
            </p>
          )}

          <button className="my-4 text-sm">
            <Button>Create an Account</Button>
          </button>

          <div className="text-[10px] flex items-center justify-center w-full my-2">
            <span className="text-neutral-500">Already a user?</span>
            <span
              onClick={() => {
                setStage(1);
              }}
              className="text-neutral-100 ml-4"
            >
              Login!
            </span>
          </div>
        </form>
      </ModalFrame>
    </div>
  );
};

export default Register;
