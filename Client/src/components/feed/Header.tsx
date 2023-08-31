import { titleIcons } from '../../utility/icon';
import { icons } from '../../utility/icon';
import { Link } from 'react-router-dom';
import header from '../../assets/feed/header.png';

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${header})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="p-11 w-[80vw] h-[215px] flex justify-around items-center hover:brightness-110 cursor-pointer"
      style={headerStyle}
    >
      <div className="flex flex-col items-center text-center mt-6">
        {/* 이름 */}
        <span className="text-[1.5rem] font-bold leading-10">헬창용사</span>
      </div>
      {/* 아이콘, 카테고리 이름 */}
      <Link
        to={`/map/0`}
        className="flex justify-start items-center gap-12 mt-[-80px]"
      >
        <img className="w-[80px] h-[80px]" src={icons[0]} alt="Icon" />
        <span className="text-[3.5rem] font-bold">헬스</span>
      </Link>
      {/* 스탯 아이콘, 레벨, 경험치 바 */}
      <div className="flex flex-col justify-right items-center gap-2 p-1 mt-6 mr-[-20px]">
        <div className="flex gap-3 p-1">
          <img
            className="w-[20px] h-[20px]"
            src={titleIcons[0]}
            alt="titleIcon"
          />
          <span className="text-[0.7rem] leading-7">Lv.100</span>
        </div>
        <div className="relative w-[8vw] h-[20px] p-[1px] bg-gray-300 rounded-full overflow-hidden flex justify-start items-center ml-3">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{
              width: `${(0 / 100) * 100}%`,
            }}
          ></div>
          <span className="absolute left-3 text-xs text-gray-400">
            {`${0} / ${100}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
