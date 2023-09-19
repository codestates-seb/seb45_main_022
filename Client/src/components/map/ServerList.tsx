import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { CATEGORY_ICON } from '../../utils/category';
import { CategoryCode } from '../../api/category';
import { CATEGORY_NAME } from '../../utils/category';

interface Props {
  categoryCode: CategoryCode;
}

const ServerList = ({ categoryCode }: Props) => {
  return (
    <div className="flex w-full justify-between items-center cursor-pointer">
      <div className="flex w-[150px] justify-center items-center">
        {categoryCode && (
          <img className="width" src={CATEGORY_ICON[categoryCode]} alt="icon" />
        )}
      </div>
      <div className="flex w-[50%] flex-col justify-center items-center gap-[12px]">
        <div className="text-xl font-bold">{CATEGORY_NAME[categoryCode]}</div>
        <Link to={`/feed/${categoryCode}`}>
          <Button>Stat Up !</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerList;
