import { Link } from 'react-router-dom';
import { CATEGORY_ICON } from '../../utils/category';
import { CategoryCode } from '../../api/category';
import { CATEGORY_NAME } from '../../utils/category';

interface Props {
  categoryCode: CategoryCode;
}

const ServerList = ({ categoryCode }: Props) => {
  return (
    <Link
      to={`/feed/${categoryCode}`}
      className="flex w-full h-[160px] justify-between items-center duration-150 hover:bg-[rgba(0,0,0,0.1)] rounded-lg shadow-md px-[20px]"
    >
      <div className="flex w-[150px] justify-center items-center">
        {categoryCode && (
          <img className="width" src={CATEGORY_ICON[categoryCode]} alt="icon" />
        )}
      </div>
      <div className="w-[150px] flex flex-row justify-center items-center text-[2rem] font-extrabold font-[Pretendard]">
        {CATEGORY_NAME[categoryCode]}
      </div>
    </Link>
  );
};

export default ServerList;
