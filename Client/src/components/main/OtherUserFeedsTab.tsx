import { Link } from 'react-router-dom';
import { CategoryCode } from '../../api/category';
import { Feed } from '../../api/feed';

const OtherUserFeedsTab = ({
  matchingUserInfo,
  categoryCode,
}: {
  matchingUserInfo: Feed[];
  categoryCode: CategoryCode;
}) => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      {matchingUserInfo.map((feed: Feed) => (
        <Link
          to={`/feed/${categoryCode}/detail/${feed.feedId}`}
          key={feed.feedId}
        >
          <div className="cursor-pointer font-[Pretendard] flex flex-col justify-between text-[10px] w-[90%] h-[3.25rem] rounded-lg p-2 mx-auto mb-4 border border-black bg-[#ffc98f]">
            <p className="text-[12px] font-bold line-clamp-1">{feed.body}</p>
            <div className="flex items-center justify-between">
              <span>{feed.commentCount} comments</span>
              <span>{feed.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OtherUserFeedsTab;
