import { useState } from 'react';
import ModalFrame from '../common/ModalFrame';
import { useMutation } from 'react-query';
import sword from '../../assets/common/sword.png';
import shield from '../../assets/common/shield.png';
import axios from 'axios';
import Button from '../common/Button';
// import userData from '../../../public/user/users.json';

interface LoginProps {
  changeSection: () => void;
  showDefault: () => void;
}

interface UserData {
  email: string;
  password: string;
}

interface Error {
  message: string;
}

interface TokenData {
  access: string;
  refresh: string;
}
const Login = ({ changeSection, showDefault }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passFocus, setPassFocus] = useState<boolean>(false);

  // 이메일 포멧
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,16}/;

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

  const loginUser = async (userData: UserData) => {
    const response = await axios.post('user/users.json', userData);
    return response.data;
  };

  //기본적으로 react query에서 5분동안 캐시 지원해줌,  시간설정 변경 가능
  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('Logged in', data);

      //status 관리
      // if(response === 200)

      const tokenData: TokenData = data.token;
      localStorage.setItem('accessToken', tokenData.access);
      localStorage.setItem('refreshToken', tokenData.refresh);

      showDefault();
    },
    onError: (err) => {
      console.log('Login fail', err);
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePass();

    if (emailErr || passwordErr === true) {
      return;
    }

    const inputData = {
      email,
      password,
    };
    mutation.mutate(inputData);

    setEmail('');
    setPassword('');
  };

  {
    mutation.isLoading && <p>Loading...</p>;
  }
  {
    mutation.isError && <p>Error: {(mutation.error as Error).message}</p>;
  }

  return (
    <ModalFrame height={550} width={700}>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-[500px]  p-3"
      >
        <h1 className="my-4 text-2xl">Login</h1>
        <div className="flex items-center  relative ">
          {emailFocus && (
            <img src={sword} alt="sword icon" className="absolute right-2" />
          )}
          <input
            placeholder="Email"
            type="text"
            className=" border-solid border-2 border-000 p-2 rounded-lg my-4 "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            onFocus={() => {
              setEmailFocus(true);
            }}
            onBlur={() => {
              setEmailFocus(false);
            }}
          />
        </div>

        {emailErr && (
          <p className="text-[10px] my-1 text-red-500">
            Please check email format
          </p>
        )}
        <div className="flex items-center relative">
          {passFocus && (
            <img src={shield} alt="shield icon" className="right-2 absolute" />
          )}
          <input
            placeholder="Password"
            type="password"
            className="border-solid border-2 border-000 p-2 rounded-lg my-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            onFocus={() => {
              setPassFocus(true);
            }}
            onBlur={() => {
              setPassFocus(false);
            }}
          />
        </div>

        {passwordErr && (
          <p className="text-[10px] my-1 text-red-500 text-center">
            8-16 characters, lowercase and upppercase, numbers, and special
            characters
          </p>
        )}
        <button disabled={mutation.isLoading} className="my-1">
          {/* <Button onClick={closeScreen}>Login</Button> */}
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
          onClick={changeSection}
        >
          Sign up!
        </span>
      </div>
    </ModalFrame>
  );
};

export default Login;
