import { titleIcons } from '../../utility/icon';
import { icons } from '../../utility/icon';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className={`w-full h-[25vh] flex justify-center items-center gap-[12vw]`}
    >
      {/* 닉네임 */}
      <p className=" text-[1.5vw] font-bold tracking-tighter mt-[10vh]">
        ⚔️ 헬창용사님
      </p>

      {/* 아이콘, 카테고리 이름 */}
      <Link
        to={`/map/0`}
        className="w-[25vw] flex justify-between items-center"
      >
        <img className="w-[20%]" src={icons[0]} alt="Icon" />
        <span className="text-[4.5vh] font-bold mb-[1vh]">헬스</span>
        <img className="w-[20%]" src={icons[0]} alt="Icon" />
      </Link>

      {/* 스탯 아이콘, 레벨, 경험치 바 */}
      <div className="flex flex-col justify-center items-end gap-[1vh] cursor-pointer mt-[10vh]">
        <div className="flex gap-[1vw]">
          <img
            className="w-[1vw] h-[2vh]"
            src={titleIcons[0]}
            alt="titleIcon"
          />
          <span className="text-[1vw]">Lv.100</span>
        </div>
        <div className="flex">
          <div className="relative w-[10vw] h-[2vh] p-[1%] bg-gray-300 rounded-full overflow-hidden flex justify-start items-center">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{
                width: `${(0 / 100) * 100}%`,
              }}
            ></div>
            <span className="absolute left-[1vw] text-xs text-gray-400">
              {`${0} / ${100}`}
            </span>
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

export default Header;
