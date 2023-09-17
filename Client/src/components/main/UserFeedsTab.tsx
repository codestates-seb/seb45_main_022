import { Link } from 'react-router-dom';
import useUserFeedListQuery from '../../hooks/useUserFeedListQuery';
import { useEffect, useRef } from 'react';
import useInfinteScroll from '../../hooks/useInfiniteScroll';
import Backdrop from '../common/Backdrop';
import LoadingBar from '../common/LoadingBar';

interface UserFeed {
  feedId: string;
  body: string;
  commentCount: number;
  createdAt: string;
  statId: number;
}

const UserFeedsTab = () => {
  const {
    data: userFeedList,
    isLoading: isFeedLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useUserFeedListQuery();

  const fetchTriggerRef = useRef<HTMLDivElement>(null);
  const feedListContainerRef = useRef<HTMLDivElement>(null);

  const userFeedItems = userFeedList?.pages.flatMap((page) => page.data) || [];

  useInfinteScroll({
    targetEl: fetchTriggerRef.current,
    hasMore: hasNextPage || false,
    onIntersect: fetchNextPage,
  });

  useEffect(() => {
    feedListContainerRef.current?.scrollTo(0, 0);
  }, []);

  if (isFeedLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  return (
    <div className="w-full h-full overflow-y-scroll" ref={feedListContainerRef}>
      {userFeedItems &&
        userFeedItems.map((feed: UserFeed) => (
          <Link
            to={`/feed/${feed.statId}/detail/${feed.feedId}`}
            key={feed.feedId}
          >
            <div className="cursor-pointer font-[Pretendard]  flex flex-col justify-between  text-[10px] w-[90%] h-[3.25rem]  rounded-lg p-2 mx-auto mb-4 border border-black  bg-[#ffc98f]">
              <p className="text-[12px] font-bold">
                {feed.body.length > 25
                  ? feed.body.slice(0, 25) + '...'
                  : feed.body}
              </p>
              <div className="flex items-center justify-between">
                <span>{feed.commentCount} comments</span>
                <span>{feed.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          </Link>
        ))}
      <div ref={fetchTriggerRef} onClick={() => fetchNextPage()}></div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default UserFeedsTab;
