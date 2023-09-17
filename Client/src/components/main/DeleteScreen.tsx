import Backdrop from '../common/Backdrop';
import reaper from '../../assets/common/reaper.png';
import useUserDeleteMutation from '../../hooks/useUserDeleteMutation';
import LoadingBar from '../common/LoadingBar';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface Props {
  nickname: string;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
}

const DeleteScreen = ({ nickname, setShowDeleteModal }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onDeleteSuccess = (data: AxiosResponse) => {
    if (data.status === 204) {
      localStorage.removeItem('token');
      queryClient.removeQueries();
      navigate('/auth/login');
      alert(`${nickname}님, 회원탈퇴 하셨습니다. 로그인 창으로 이동합니다.`);
    }
  };

  const onDeleteError = () => {
    alert('회원탈퇴 실패!');
  };

  const {
    isLoading,
    isError,
    mutate: deleteUser,
  } = useUserDeleteMutation({
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });

  const handleDeleteAccount = () => {
    deleteUser();
  };

  const handleKeepAccount = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  if (isError) {
    return <p>Error</p>;
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
