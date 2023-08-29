import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';
import hide from '../../assets/icons/hide.png';
import view from '../../assets/icons/view.png';
import { useState } from 'react';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleViewPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex justify-center items-center">
      <ModalFrame height={500} width={650}>
        <form className="flex flex-col items-center justify-center w-[500px] h-[380px] p-5">
          <div className="flex items-center  ">
            <input
              placeholder="Email"
              type="text"
              className=" border-solid border-2 border-000 p-2 rounded-lg my-2 "
            />
          </div>

          <div className="flex items-center relative">
            <input
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              className="border-solid border-2 border-000 p-2 rounded-lg my-2 w-full "
            />
            <img
              src={!passwordVisible ? hide : view}
              alt="view icon"
              width={25}
              onClick={toggleViewPassword}
              className="absolute right-2 cursor-pointer"
            />
          </div>

          {/* <div className="flex items-center">
            <input
              placeholder="Password Confirm"
              type="password"
              className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            />
          </div> */}
          <div className="flex items-center">
            <input
              placeholder="Nickname "
              type="text"
              className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            />
          </div>

          <div className="my-4 text-sm">
            <Button width={300}>Create an Account</Button>
          </div>

          <div className="text-[10px] flex items-center justify-center w-full my-2">
            <span className="text-neutral-500">Already a user?</span>
            <span className="text-neutral-100 ml-4">Login!</span>
          </div>
        </form>
      </ModalFrame>
    </div>
  );
};

export default Register;
