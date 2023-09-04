import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';
import hide from '../../assets/icons/hide.png';
import view from '../../assets/icons/view.png';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { registerAuth } from '../../api/auth';
import {
  validateEmail,
  validateNickname,
  validatePass,
} from '../../hooks/validation';

interface RegisterProps {
  changeSection: () => void;
}

const Register = ({ changeSection }: RegisterProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [nicknameErr, setNicknameErr] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [checkExistingEmail, setExistingEmail] = useState<boolean>(false);
  const [checkExistingNickname, setExistingNickname] = useState<boolean>(false);
  // const [emailState, setEmailState] = useState<boolean>(false);

  const toggleViewPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { isLoading, mutate: register } = useMutation(registerAuth, {
    //서버에서 데이터 받으면 성공
    // 서버 status에 따라 실행되는 조건문 걸면 좋을 듯
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data);
        setExistingEmail(false);
        //
        //로그인 창으로 전환
        // changeSection();
      } else if (
        data.status === 409 &&
        data.message === '사용중인 이메일 입니다.'
      ) {
        console.log('Existing Email');
        setExistingEmail(true);
      } else if (
        data.status === 409 &&
        data.message === '사용중인 닉네임 입니다.'
      ) {
        console.log('Existing Nickname');
        setExistingNickname(true);
      } else if (data.status === 400) {
        console.log('User authentication error');
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({ email, password, nickname });
    validateEmail(email, setEmailErr);
    validatePass(password, setPasswordErr);
    validateNickname(nickname, setNicknameErr);
  };

  {
    isLoading && <h1>Loading...</h1>;
  }
  return (
    <ModalFrame height={550} width={780}>
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
            onBlur={() => validateEmail(email, setEmailErr)}
          />
        </div>

        {emailErr && (
          <p className="text-[10px]  text-red-500">Please check email format</p>
        )}

        <div className="flex items-center relative ">
          <input
            placeholder="Password"
            type={passwordVisible ? 'text' : 'password'}
            className="border-solid border-2 border-000 p-2 rounded-lg my-4 w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onBlur={() => validatePass(password, setPasswordErr)}
          />
          <img
            src={!passwordVisible ? hide : view}
            alt="view icon"
            width={40}
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
            onBlur={() => validateNickname(nickname, setNicknameErr)}
          />
          {/* <button className="bg-white  h-[32px] w-20 ml-2 rounded text-sm ">
            Check
          </button> */}
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
              changeSection();
            }}
            className="text-neutral-100 ml-4 hover:cursor-pointer"
          >
            Login!
          </span>
        </div>
      </form>
    </ModalFrame>
  );
};

export default Register;
