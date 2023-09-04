import { Link } from 'react-router-dom';
import { Status } from '../../api/user';
import { StatusCode } from '../../api/category';
import { STATUS_ICON } from '../../utility/icon';

interface Props {
  status: Status;
  statusCode: StatusCode;
}

const StatusListItem = ({ status, statusCode }: Props) => {
  const { statName, statLevel, statExp, requiredExp } = status;
  return (
    <Link to={`/map/${statusCode}`}>
      <div className="p-3 flex flex-col justify-center items-center gap-2 bg-[#fee1b8] hover:brightness-90 rounded-md duration-300 cursor-pointer shadow-lg">
        {/* 스탯 아이콘, 이름, 레벨 */}
        <div className="flex flex-row justify-center items-end gap-3">
          <img
            className="w-[30px] h-[30px]"
            src={STATUS_ICON[statusCode]}
            alt="icon"
          />
          <span className="text-[1.5rem] font-bold leading-10">{statName}</span>{' '}
          <span className="leading-7">{`Lv.${statLevel}`}</span>
        </div>
        {/* 경험치 바 */}
        <div className="relative w-[400px] h-[24px] p-[2px] bg-gray-300 rounded-full overflow-hidden flex flex-row justify-start items-center">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{
              width: `${(statExp / requiredExp) * 100}%`,
            }}
          ></div>
          <span className="absolute left-3 text-xs text-gray-400">
            {`${statExp} / ${requiredExp}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StatusListItem;
