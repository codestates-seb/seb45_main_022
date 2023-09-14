import likeButton from '../../assets/feed/likeButton.png';
import commentButton from '../../assets/feed/commentButton.png';
import { CategoryCode } from '../../api/category';
import { STATUS_ICON } from '../../utility/status';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { Feed } from '../../api/feed';

interface FeedItemProps {
  feed: Feed;
  categoryCode: CategoryCode;
}

const LatestFeedItem = ({ feed, categoryCode }: FeedItemProps) => {
  const {
    nickname,
    profileImage,
    level,
    body,
    likeCount,
    commentCount,
    createdAt,
  } = feed;

  return (
    <>
      <div className="w-[300px] h-[140px] m-[12px] bg-cover bg-center bg-feedBox">
        <div className="w-full h-full p-[28px] flex flex-row justify-between">
          {/* 왼쪽 구간 (전체 너비 1/3) */}
          <div className="w-[60px] h-full flex flex-col justify-between items-center">
            <div className="bg-[url('/src/assets/common/profile-frame.png')] bg-cover bg-no-repeat w-[50px] h-[50px] p-[5px]">
              <img src={profileImage} alt="profile" />
            </div>
            <div
              className={`w-full flex justify-center items-center ${
                nickname.length > 3 ? 'text-xs' : 'text-sm'
              }`}
            >
              {nickname}
            </div>
            <div className="w-full flex justify-center items-center -mt-[4px] gap-[2px]">
              <div className="w-[10px] -mt-[3px]">
                <img
                  src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                  alt="스탯 아이콘"
                />
              </div>
              <div className="text-[0.625rem]">Lv.{level}</div>
            </div>
          </div>

          {/* 오른쪽 구간 (전체 너비 2/3) */}
          <div className="w-[175px] h-full flex flex-col justify-between items-end">
            <div className="w-full h-[50px] pr-[5px] font-[Pretendard] overflow-hidden text-ellipsis whitespace-nowrap">
              {body}
            </div>
            <div className="w-full flex justify-end items-center gap-[6px]">
              <div className="text-[0.625rem] font-[Pretendard]">
                {new Date(createdAt).toLocaleTimeString('ko-KR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex gap-[4px] text-[0.625rem]">
                <img src={likeButton} alt="좋아요 아이콘" width={15} />
                {likeCount}
              </div>
              <div className="flex gap-[4px] text-[0.625rem] mr-[4px]">
                <img src={commentButton} alt="코멘트 아이콘" width={15} />
                {commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestFeedItem;
