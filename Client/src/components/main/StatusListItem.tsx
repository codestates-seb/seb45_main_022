import { Link } from 'react-router-dom';
import { Status } from '../../api/user';
import { STATUS_ICON, STATUS_NAME } from '../../utility/status';

interface Props {
  status: Status;
}

const StatusListItem = ({ status }: Props) => {
  const { statId, statLevel, statExp, requiredExp } = status;
  return (
    <Link to={`/map/${statId}`}>
      <div className="p-[12px] flex flex-col justify-center items-center gap-[8px] bg-[#fee1b8] hover:brightness-90 rounded-[6px] duration-300 cursor-pointer shadow-lg">
        {/* 스탯 아이콘, 이름, 레벨 */}
        <div className="flex flex-row justify-center items-end gap-[12px]">
          <img
            className="w-[30px] h-[30px]"
            src={STATUS_ICON[statId]}
            alt="icon"
          />
          <span className="text-[1.5rem] font-bold leading-[40px]">
            {STATUS_NAME[statId]}
          </span>{' '}
          <span className="leading-[28px]">{`Lv.${statLevel}`}</span>
        </div>
        {/* 경험치 바 */}
        <div className="relative w-[400px] h-[24px] p-[2px] bg-gray-300 rounded-full overflow-hidden flex flex-row justify-start items-center">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{
              width: `${(statExp / (requiredExp + statExp)) * 100}%`,
            }}
          ></div>
          <span className="absolute left-[12px] text-xs text-gray-400">
            {`${statExp} / ${requiredExp + statExp}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StatusListItem;
