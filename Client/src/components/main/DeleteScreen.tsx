import Backdrop from '../common/Backdrop';
import reaper from '../../assets/common/reaper.png';

const DeleteScreen = ({ nickname }) => {
  return (
    <Backdrop>
      <div className="relative  bottom-10 left-0 right-0 m-auto w-[44rem] flex flex-col items-center  ">
        <img src={reaper} alt="reaper" height={20} width={200} />
        <div className=" rounded-xl  bg-[#ffc98f] h-[16rem] p-6 flex flex-col justify-around">
          <p className="leading-loose">
            <span className="font-bold text-4xl"> {nickname}</span>, Do you wish
            to permanently delete your account?{' '}
            <span className="text-red-500">
              There is no going back once deleted.
            </span>
          </p>
          <div className="flex items-center justify-around">
            <button className="p-4 bg-red-400 rounded-xl">Yes</button>
            <button className="p-4 bg-green-400 rounded-xl">No</button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default DeleteScreen;
