import { STATUS_ICON } from '../../utility/status';
import {
  CATEGORY_ICON,
  CATEGORY_NAME,
  CATEGORY_STATUS_MAP,
} from '../../utility/category';
import { useNavigate } from 'react-router-dom';
import { CategoryCode } from '../../api/category';

interface Props {
  categoryCode: CategoryCode;
}

const Header = ({ categoryCode }: Props) => {
  const nav = useNavigate();

  return (
    <div
      className={`w-full h-[60px] flex justify-center items-center gap-[220px]`}
    >
      {/* 닉네임 */}
      <p
        className="w-[144px] text-[1.5rem] font-bold mt-[100px] cursor-pointer"
        style={{ fontFamily: 'Pretendard' }}
      >
        ⚔️ 헬창용사님
      </p>

      {/* 아이콘, 카테고리 이름 */}
      <div
        className="w-[250px] flex justify-between items-center cursor-pointer ml-[8px]"
        onClick={() => {
          nav(`/map/${CATEGORY_STATUS_MAP[categoryCode]}`);
        }}
      >
        <img
          className="w-[50px] h-[50px]"
          src={CATEGORY_ICON[categoryCode]}
          alt="Icon"
        />
        <span className="text-[2rem] font-bold mb-[8px]">
          {CATEGORY_NAME[categoryCode]}
        </span>
        <img
          className="w-[50px] h-[50px]"
          src={CATEGORY_ICON[categoryCode]}
          alt="Icon"
        />
      </div>

      {/* 스탯 아이콘, 레벨, 경험치 바 */}
      <div className="flex flex-col justify-center items-end gap-[8px] cursor-pointer mt-[100px]">
        <div className="flex gap-[16px]">
          <img
            className="w-[16px] h-[16px]"
            src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
            alt="titleIcon"
          />
          <span className="text-[1rem]">Lv.100</span>
        </div>

        <div className="flex">
          <div className="relative w-[144px] h-[16px] p-[8px] bg-gray-300 rounded-full overflow-hidden flex justify-start items-center">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{
                width: `${(0 / 100) * 100}%`,
              }}
            ></div>
            <span className="absolute left-[16px] text-xs text-gray-400">
              {`${0} / ${100}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
