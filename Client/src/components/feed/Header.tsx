import { STATUS_ICON } from '../../utils/status';
import {
  CATEGORY_ICON,
  CATEGORY_NAME,
  CATEGORY_STATUS_MAP,
} from '../../utils/category';
import { useNavigate, Link } from 'react-router-dom';
import { CategoryCode } from '../../api/category';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';
import Backdrop from '../common/Backdrop';
import LoadingBar from '../common/LoadingBar';
import { BackButton } from '../../components/common/BackButton';
import { FrontButton } from '../../components/common/BackButton';
import { AiTwotoneHome } from 'react-icons/ai';
import { BsMapFill } from 'react-icons/bs';

interface Props {
  categoryCode: CategoryCode;
}

const Header = ({ categoryCode }: Props) => {
  const nav = useNavigate();

  const { isLoading, data: userInfo } = useUserInfoQuery();

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (userInfo) {
    return (
      <div className="w-full h-[110px] flex justify-between items-center">
        <div className="w-[160px] h-[110px] flex flex-row justify-start items-center gap-[10px]">
          <Link
            className="w-[75px] h-[75px] shadow-md rounded-lg p-[5px] overflow-hidden hover:bg-[rgba(0,0,0,0.1)] duration-150 flex flex-col justify-center items-center"
            to="/main"
          >
            <AiTwotoneHome size={40} />
            HOME
          </Link>
          <Link
            className="w-[75px] h-[75px] shadow-md rounded-lg p-[5px] overflow-hidden hover:bg-[rgba(0,0,0,0.1)] duration-150 flex flex-col justify-center items-center"
            to={`/map/${CATEGORY_STATUS_MAP[categoryCode]}`}
          >
            <div className="w-[40px] h-[40px] flex justify-center items-center">
              <BsMapFill size={30} />
            </div>
            MAP
          </Link>
        </div>

        {/* 아이콘, 카테고리 이름 */}
        <div className="w-[520px] h-[110px] flex flex-row justify-between category_title">
          <div className="w-[35px] mt-[50px]">
            {categoryCode !== 1 && <BackButton categoryCode={categoryCode} />}
          </div>
          <div className="w-[250px] flex justify-between cursor-pointer">
            <img
              className="w-[50px] h-[50px]"
              src={CATEGORY_ICON[categoryCode]}
              alt="Icon"
            />
            <span
              className="text-[2rem] font-bold mb-[8px]"
              onClick={() => {
                nav(`/map/${CATEGORY_STATUS_MAP[categoryCode]}`);
              }}
            >
              {CATEGORY_NAME[categoryCode]}
            </span>
            <img
              className="w-[50px] h-[50px]"
              src={CATEGORY_ICON[categoryCode]}
              alt="Icon"
            />
          </div>
          <div className="w-[35px] mt-[50px]">
            {categoryCode !== Object.keys(CATEGORY_STATUS_MAP).length && (
              <FrontButton categoryCode={categoryCode} />
            )}
          </div>
        </div>
        {/* 스탯 아이콘, 레벨, 경험치 바 */}
        <div className="h-[110px] flex flex-col justify-center items-end gap-[8px] cursor-pointer pb-[5px] my_info">
          <Link to={`/feed/${categoryCode}/profile`}>
            <p className="w-[144px] h-[30px] flex flex-row justify-end text-[1.5rem] font-bold cursor-pointer font-[Pretendard] whitespace-nowrap">
              ⚔️ {userInfo.nickname} 님
            </p>
          </Link>
          <Link to={`/feed/${categoryCode}/status`}>
            <div className="flex flex-row items-center gap-[16px]">
              <img
                className="w-[16px] h-[16px]"
                src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                alt="titleIcon"
              />
              <span className="text-[1rem]">
                Lv.
                {
                  userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                    .statLevel
                }
              </span>
            </div>
          </Link>
          <div className="flex">
            <div className="relative w-[144px] h-[16px] p-[8px] bg-gray-300 rounded-full overflow-hidden flex justify-start items-center">
              <div
                className="absolute h-full left-[0px] bg-yellow-500 rounded-full"
                style={{
                  width: `${
                    (userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                      .statExp /
                      (userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                        .requiredExp +
                        userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                          .statExp)) *
                    100
                  }%`,
                }}
              ></div>
              <span className="absolute left-[16px] text-xs text-gray-400">
                {`${
                  userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                    .statExp
                } / ${
                  userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                    .requiredExp +
                  userInfo.statuses[CATEGORY_STATUS_MAP[categoryCode] - 1]
                    .statExp
                }`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
