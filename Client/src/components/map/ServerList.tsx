import Button from '../common/Button';
import weightIcon from '../../assets/icons/weight.png';
import joggingIcon from '../../assets/icons/jogging.png';

interface Props {
  title: string;
}

const ServerList = ({ title }: Props) => {
  let icon;
  if (title === 'Weight Training') {
    icon = weightIcon;
  } else if (title === 'Running') {
    icon = joggingIcon;
  }

  return (
    <div className="flex w-[100%] justify-between items-center cursor-pointer">
      <div className="flex w-[150px] justify-center items-center">
        <img className="width" src={icon} alt="icon" />
      </div>
      <div className="flex w-[50%] flex-col justify-center items-center gap-3">
        <div className="text-xl font-bold">{title}</div>
        <Button>Stat Up !</Button>
      </div>
    </div>
  );
};

export default ServerList;
