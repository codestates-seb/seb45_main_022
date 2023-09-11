import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';
import hide from '../../assets/icons/hide.png';
import view from '../../assets/icons/view.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '../../utility/validation';
import LoadingBar from '../common/LoadingBar';
import { AxiosResponse, AxiosError } from 'axios';
import useRegister, { ErrorResponseDataType } from '../../hooks/useRegister';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidNickname, setIsInvalidNickname] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isExistingEmail, setIsExistingEmail] = useState(false);
  const [isExistingNickname, setIsExistingNickname] = useState(false);
  const toggleViewPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();

  const onRegisterSuccess = (data: AxiosResponse) => {
    console.log(data);
    if (data?.status === 201) {
      alert('Register success');
      navigate('/auth/login');
      return;
    }
    alert('User authentication error');
    console.log('User authentication error');
  };

  const onRegisterError = (err: AxiosError<ErrorResponseDataType>) => {
    console.log(err, 'onError Catched');
    if (err.response?.data.status === 409) {
      if (err.response?.data.message === '사용중인 이메일 입니다.') {
        console.log('Existing Email');
        setIsExistingEmail(true);
        return;
      }
      if (err.response?.data.message === '사용중인 닉네임 입니다.') {
        console.log('Existing Nickname');
        setIsExistingNickname(true);
        return;
      }
    }
    alert('User authentication error');
    console.log('User authentication error');
  };

  const { registerMutation } = useRegister(onRegisterSuccess, onRegisterError);

  const { isLoading, mutate: register } = registerMutation;

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsInvalidEmail(!validateEmail(email));
    setIsInvalidPassword(!validatePassword(password));
    setIsInvalidNickname(!validateNickname(nickname));
    if (isInvalidEmail || isInvalidPassword || isInvalidNickname) return; // 하나라도 유효하지 않은 값인 경우 회원 가입 요청 보내지 않음
    register({ email, nickname, password });
  };

  if (isLoading) return <LoadingBar />;

  return (
    <ModalFrame height={550} width={780}>
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center w-[550px] h-[450px] p-[20px] relative"
      >
        <h1 className="my-[8px] text-2xl">Register</h1>
        <div className="flex items-center">
          <input
            placeholder="Email"
            type="text"
            className=" border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onFocus={() => {
              setIsInvalidEmail(false);
              setIsExistingEmail(false);
            }}
            onBlur={() => setIsInvalidEmail(!validateEmail(email))}
          />
        </div>

        {isInvalidEmail && (
          <p className="text-[0.625rem] text-red-500">
            Please check email format
          </p>
        )}
        {isExistingEmail && (
          <p className="text-[0.625rem] text-red-500">Existing Email</p>
        )}

        <div className="flex items-center relative">
          <input
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            className="border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px] w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={() => {
              setIsInvalidPassword(false);
            }}
            onBlur={() => setIsInvalidPassword(!validatePassword(password))}
          />
          <img
            src={!isPasswordVisible ? hide : view}
            alt="view icon"
            width={40}
            onClick={toggleViewPassword}
            className="absolute right-[8px] cursor-pointer"
          />
        </div>
        {isInvalidPassword && (
          <p className="text-[0.625rem]  text-red-500 text-center">
            8-16 characters, lowercase & uppercase, numbers, and characters
          </p>
        )}

        <div className="flex items-center">
          <input
            placeholder="Nickname "
            type="text"
            className="border-solid border-[2px] border-000 p-[8px] rounded-[8px] my-[16px]"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            onFocus={() => {
              setIsInvalidNickname(false);
              setIsExistingNickname(false);
            }}
            onBlur={() => setIsInvalidNickname(!validateNickname(nickname))}
          />
        </div>

        {isInvalidNickname && (
          <p className="text-[0.625rem]  text-red-500">
            2-6 characters, Korean or English
          </p>
        )}
        {isExistingNickname && (
          <p className="text-[0.625rem] text-red-500">Existing Nickname</p>
        )}

        <button className="my-[16px] text-sm">
          <Button>Create an Account</Button>
        </button>

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
    </ModalFrame>
  );
};

export default Register;
