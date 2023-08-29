import Backdrop from '../common/Backdrop';
import Button from '../common/Button';

interface Props {
  onClick?: () => void;
}

const TitleScreen = ({ onClick }: Props) => {
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div className="w-[1200px] h-[600px] bg-[url('/src/assets/common/modal-frame-note.png')] flex flex-row">
          <div className="w-[600px] h-[600px]"></div>
          <div className="w-[600px] h-[600px] flex flex-col justify-center items-center"></div>
        </div>
        <Button onClick={onClick}>Close</Button>
      </div>
    </Backdrop>
  );
};

export default TitleScreen;
