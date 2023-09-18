import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';
import hide from '../../assets/icons/hide.png';
import view from '../../assets/icons/view.png';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '../../utility/validation';
import LoadingBar from '../common/LoadingBar';
import { isAxiosError } from 'axios';
import useRegisterMutation from '../../hooks/useRegisterMutation';
import Backdrop from '../common/Backdrop';
import { ERROR_MSG, ErrorType } from '../../api/error';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const toggleViewPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();

  const {
    isLoading,
    mutate: register,
    error,
    isError,
    isSuccess,
  } = useRegisterMutation();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrMsg('Please check email format');
      return;
    }
    if (!validatePassword(password)) {
      setErrMsg(
        'Password must be 8-16 characters, lowercase & uppercase, numbers, and characters',
      );
      return;
    }
    if (!validateNickname(nickname)) {
      setErrMsg('Nickname must be 2-6 characters, Korean or English');
      return;
    }
    register({ email, nickname, password });
  };

  if (isSuccess) {
    alert('Register success');
    return <Navigate to="/auth/login" />;
  }

  return (
    <ModalFrame height={550} width={780}>
      <form
        onSubmit={handleRegister}
        onFocus={() => {
          setErrMsg('');
        }}
        className="flex flex-col items-center justify-center w-[550px] h-[450px] p-[20px] relative"
      >
        <h1 className="text-2xl">Register</h1>
        <div className="h-[120px] mt-[15px] flex justify-center items-center">
          <p className="text-[0.625rem] text-red-500">
            {errMsg}
            {(isError &&
              isAxiosError<ErrorType>(error) &&
              error.response?.data.errorCode &&
              ERROR_MSG[error.response?.data.errorCode]) ||
              ''}
          </p>
        </div>
        <div className="flex items-center">
          <input
            placeholder="Email"
            type="text"
            className=" border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex items-center relative">
          <input
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            className="border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px] w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <img
            src={!isPasswordVisible ? hide : view}
            alt="view icon"
            width={40}
            onClick={toggleViewPassword}
            className="absolute right-[8px] cursor-pointer"
          />
        </div>
        <div className="flex items-center">
          <input
            placeholder="Nickname "
            type="text"
            className="border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </div>
        <Button
          style={{
            margin: '16px 0',
            fontSize: '.8rem',
          }}
        >
          Create an Account
        </Button>
        <div className="text-[0.625rem] flex items-center justify-center w-full my-[8px]">
          <span className="text-neutral-500">Already a user?</span>
          <span
            onClick={() => {
              navigate('/auth/login');
            }}
            className="text-neutral-100 ml-[16px] hover:cursor-pointer"
          >
            Login!
          </span>
        </div>
      </form>
      {isLoading && (
        <Backdrop>
          <LoadingBar />
        </Backdrop>
      )}
    </ModalFrame>
  );
};

export default Register;
