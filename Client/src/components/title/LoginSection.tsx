import { useState } from 'react';
import ModalFrame from '../common/ModalFrame';
import { useMutation } from 'react-query';
import sword from '../../assets/common/sword.png';
import shield from '../../assets/common/shield.png';
import Button from '../common/Button';
import { loginAuth } from '../../api/auth';
import LoadingBar from '../common/LoadingBar';

// import userData from '../../../public/user/users.json';

// const loader =
//   'https://media4.giphy.com/media/XH8aAiiVNuTaPVBLKd/giphy.gif?cid=ecf05e47wrbyn76phn4xf6yjk2og9rh70qx98fmftesikepy&ep=v1_stickers_search&rid=giphy.gif&ct=s';

interface LoginProps {
  changeSection: () => void;
  onLoginBtnClick: () => void;
}

interface TokenData {
  access: string;
  refresh: string;
}
const Login = ({ changeSection, onLoginBtnClick }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginValidate, setLoginValidate] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passFocus, setPassFocus] = useState<boolean>(false);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  //기본적으로 react query에서 5분동안 캐시 지원해줌,  시간설정 변경 가능
  const { mutate: login } = useMutation(loginAuth, {
    onSuccess: (data) => {
      console.log(data);

      if (data.status === 200) {
        console.log(data);
        setLoginValidate(false);

        const token = data.data.token;
        localStorage.setItem('token', token);
        changeSection();
      }
    },
    onError: (err) => {
      console.log('Login fail', err);
      if (err.status === 401) {
        setLoginValidate(true);
      }
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ email, password });

    setLoadingScreen(true);
    setTimeout(() => {
      setLoadingScreen(false);
      onLoginBtnClick();
    }, 1000);
  };

  return (
    <ModalFrame height={550} width={800}>
      {loadingScreen ? (
        <LoadingBar />
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center w-[500px]  p-3"
          >
            {loginValidate && (
              <p className="text-[10px] my-1 text-red-500">
                Please check email or password
              </p>
            )}

            <h1 className="my-4 text-2xl">Login</h1>
            <div className="flex items-center  relative ">
              {emailFocus && (
                <img
                  src={sword}
                  alt="sword icon"
                  className="absolute right-2"
                />
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
                  setEmailFocus(true);
                }}
                onBlur={() => {
                  setEmailFocus(false);
                }}
              />
            </div>

            <div className="flex items-center relative">
              {passFocus && (
                <img
                  src={shield}
                  alt="shield icon"
                  className="right-2 absolute"
                />
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
                  setPassFocus(true);
                }}
                onBlur={() => {
                  setPassFocus(false);
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
              onClick={changeSection}
            >
              Sign up!
            </span>
          </div>
        </>
      )}
    </ModalFrame>
  );
};

export default Login;
