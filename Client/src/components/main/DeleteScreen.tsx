import Backdrop from '../common/Backdrop';
import reaper from '../../assets/common/reaper.png';
import useUserDeleteMutation from '../../hooks/useUserDeleteMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router';

interface Props {
  nickname: string;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
}

const DeleteScreen = ({ nickname, setShowDeleteModal }: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, mutate: deleteUser } = useUserDeleteMutation();

  const handleDeleteAccount = () => {
    deleteUser();
  };

  const handleKeepAccount = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return null;
  }

  if (isSuccess) {
    localStorage.removeItem('token');
    queryClient.removeQueries();
    alert(`${nickname}, your account has been deleted.`);
    return <Navigate to="/" />;
  }

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
            <button
              onClick={handleDeleteAccount}
              className="p-4 bg-red-400 rounded-xl  hover:brightness-125"
            >
              Yes
            </button>
            <button
              onClick={handleKeepAccount}
              className="p-4 bg-green-400 rounded-xl  hover:brightness-125"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default DeleteScreen;
