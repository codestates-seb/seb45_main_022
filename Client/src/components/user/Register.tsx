import ModalFrame from '../common/ModalFrame';
import Button from '../common/Button';

const Register = () => {
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

          <div className="flex items-center">
            <input
              placeholder="Password"
              type="password"
              className="border-solid border-2 border-000 p-2 rounded-lg my-2"
            />
          </div>

          <Button width={300}>
            <span>Create an Account</span>
          </Button>
        </form>
      </ModalFrame>
    </div>
  );
};

export default Register;
