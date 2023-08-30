import Button from '../common/Button';
import { icons } from '../../utility/icon';

interface Props {
  title: string;
  categoryCode: number;
}

const ServerList = ({ title, categoryCode }: Props) => {
  const icon = icons[categoryCode];

  return (
    <div className="flex w-[100%] justify-between items-center cursor-pointer">
      <div className="flex w-[150px] justify-center items-center">
        {icon && <img className="width" src={icon} alt="icon" />}
      </div>
      <div className="flex w-[50%] flex-col justify-center items-center gap-3">
        <div className="text-xl font-bold">{title}</div>
        <Button>Stat Up !</Button>
      </div>
    </div>
  );
};

export default ServerList;
