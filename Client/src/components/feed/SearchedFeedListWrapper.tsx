import { useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import LatestFeedItem from './LatestFeedItem';
import useFeedListQuery from '../../hooks/useFeedListQuery';
import useInfinteScroll from '../../hooks/useInfiniteScroll';
// import { useQueryClient } from '@tanstack/react-query';

interface Props {
  categoryCode: CategoryCode;
  keyword: string;
}

const FeedListWrapper = ({ categoryCode, keyword }: Props) => {
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useFeedListQuery({
      categoryCode,
      type: 'content',
      keyword: keyword,
    });
  const fetchTriggerRef = useRef<HTMLDivElement>(null);
  const feedListContainerRef = useRef<HTMLDivElement>(null);

  const feedList = data?.pages.map((page) => page.data).flat();

  useInfinteScroll({
    targetEl: fetchTriggerRef.current,
    hasMore: hasNextPage || false,
    onIntersect: fetchNextPage,
  });

  useEffect(() => {
    feedListContainerRef.current?.scrollTo(0, 0);
  }, []);

  // 페이지 이동 시 캐시 삭제하고 싶다면
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.removeQueries(['feedList']);
  // }, [queryClient]);

  return (
    <div className="relative w-full h-[500px] flex flex-col justify-start items-center mt-[55px] ml-[4px] ">
      <div className="w-full h-[48px] flex justify-around items-center bg-[#f8d8ae] gap-[320px]">
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div
        ref={feedListContainerRef}
        className="flex items-center justify-around w-[1000px] flex-wrap p-[12px] overflow-y-scroll flexBox"
      >
        {feedList &&
          feedList.map((feed, index) => {
            return (
              <LatestFeedItem
                categoryCode={categoryCode}
                feed={feed}
                key={index}
              />
            );
          })}
        <div
          ref={fetchTriggerRef}
          onClick={() => {
            fetchNextPage();
          }}
        ></div>
        {isLoading || (isFetching && <p>Loading...</p>)}
      </div>
      <Link to={`/feed/${categoryCode}/post`}>
        <button className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] bg-[#f8d8ae] bg-[url('/src/assets/icons/btn-pencil.png')] bg-no-repeat bg-cover rounded-full p-[8px] duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110" />
      </Link>
    </div>
  );
};

export default FeedListWrapper;
