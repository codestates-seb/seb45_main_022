import { useState, useRef, useEffect } from 'react';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import { FeedFilterType } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import FeedItem from './FeedItem';
import useFeedListQuery from '../../hooks/useFeedListQuery';
import useInfinteScroll from '../../hooks/useInfiniteScroll';
// import { useQueryClient } from '@tanstack/react-query';

interface Props {
  categoryCode: CategoryCode;
}

const FeedList = ({ categoryCode }: Props) => {
  const [type, setType] = useState<FeedFilterType>('latest');
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useFeedListQuery({
      categoryCode,
      type,
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
  }, [type]);

  // 페이지 이동 시 캐시 삭제하고 싶다면
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.removeQueries(['feedList']);
  // }, [queryClient]);

  return (
    <div className="relative w-full h-[500px] flex flex-col justify-start items-center ml-[4px] ">
      <div className="w-full h-[50px] p-[10px] flex justify-between items-center bg-[#f8d8ae] shadow-[0_5px_5px_#f8d8ae]">
        <FilterButton type={type} setType={setType} />
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div
        ref={feedListContainerRef}
        className="flex items-center justify-start w-[1000px] flex-wrap p-[20px] overflow-y-scroll flexBox gap-[20px]"
      >
        {feedList &&
          feedList.map((feed, index) => {
            return (
              <FeedItem
                key={index}
                categoryCode={categoryCode}
                feed={feed}
                detailURL={`/feed/${categoryCode}/detail/${feed.feedId}`}
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

export default FeedList;
