import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { CATEGORY_ICON } from '../../utility/icon';
import { CategoryCode } from '../../api/category';

interface Props {
  title: string;
  categoryCode: CategoryCode;
}

const ServerList = ({ title, categoryCode }: Props) => {
  const icon = CATEGORY_ICON[categoryCode];

  return (
    <div className="flex w-[100%] justify-between items-center cursor-pointer">
      <div className="flex w-[150px] justify-center items-center">
        {icon && <img className="width" src={icon} alt="icon" />}
      </div>
      <div className="flex w-[50%] flex-col justify-center items-center gap-3">
        <div className="text-xl font-bold">{title}</div>
        <Link to={`/feed/${categoryCode}`}>
          <Button>Stat Up !</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerList;
