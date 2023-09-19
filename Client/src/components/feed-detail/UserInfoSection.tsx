import { CategoryCode } from '../../api/category';
import { FeedDetail } from '../../api/feed';
import { CATEGORY_STATUS_MAP } from '../../utils/category';
import { STATUS_ICON } from '../../utils/status';

interface Props {
  feedDetail: FeedDetail;
  categoryCode: CategoryCode;
}

const UserInfoSection = ({ feedDetail, categoryCode }: Props) => {
  return (
    <div className="flex flex-col bg-orange-100  p-4 w-[200px]">
      <div className="flex flex-col items-center p-4">
        <img
          src={feedDetail.profileImage}
          width={90}
          alt="profile pic"
          className="mb-[8px] w-16 h-16 rounded-full object-cover "
        />
        <span className="font-[Pretendard] font-semibold text-[20px] ">
          {feedDetail.nickname}
        </span>
        <div className="flex mt-1 items-center -ml-2">
          <img
            src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
            alt="stat icon"
            width={20}
          />
          <span className="font-[Pretendard] ml-2 font-semibold">
            Lv. {feedDetail.level}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-2 "></div>
    </div>
  );
};

export default UserInfoSection;
