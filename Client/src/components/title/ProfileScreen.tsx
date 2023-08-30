import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import profileImg from '../../assets/common/profile.png';

interface Props {
  onClick?: () => void;
}

const ProfileScreen = ({ onClick }: Props) => {
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div className="w-[500px] h-[600px] p-[2rem] bg-[url('/src/assets/common/modal-frame-paper.png')] bg-center bg-cover bg-no-repeat flex flex-col">
          <div className="w-[150px] h-[150px] bg-[url('/src/assets/common/profile-frame.png')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
            <img
              className="w-[120px] h-[120px]"
              src={profileImg}
              alt="profile"
            />
          </div>
        </div>
        <Button onClick={onClick}>Close</Button>
      </div>
    </Backdrop>
  );
};

export default ProfileScreen;
