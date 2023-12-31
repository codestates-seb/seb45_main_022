import Backdrop from '../common/Backdrop';
import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();

  const handleScreenClick = () => {
    navigate('/auth/login');
  };
  return (
    <Backdrop>
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-[240px]"
        onClick={handleScreenClick}
      >
        <h1 className="text-white font-extrabold font-default text-[7rem] tracking-wide drop-shadow-[10px_10px_2px_#000] pointer-events-none">
          STAT & US
        </h1>
        <p className="text-white text-[1.8rem] animate-[blink_.8s_alternate_infinite] pointer-events-none">
          CLICK ANYWHERE TO ACCESS
        </p>
      </div>
    </Backdrop>
  );
};

export default TitleScreen;
