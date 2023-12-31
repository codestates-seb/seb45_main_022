import { useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import FeedItem from './FeedItem';
import useFeedListQuery from '../../hooks/useFeedListQuery';
import useInfinteScroll from '../../hooks/useInfiniteScroll';
import { FeedSearchType } from '../../api/feed';
import NotFoundFeedItem from './NotFoundFeedItem';
import { AiOutlineRollback } from 'react-icons/ai';

interface Props {
  categoryCode: CategoryCode;
  searchType: string;
  keyword: string;
}

const SearchResult = ({ categoryCode, searchType, keyword }: Props) => {
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useFeedListQuery({
      categoryCode,
      type: searchType as FeedSearchType,
      keyword: keyword,
    });
  const fetchTriggerRef = useRef<HTMLDivElement>(null);
  const feedListContainerRef = useRef<HTMLDivElement>(null);

  const feedList = data?.pages.map((page) => page.data).flat() || [];

  useInfinteScroll({
    targetEl: fetchTriggerRef.current,
    hasMore: hasNextPage || false,
    onIntersect: fetchNextPage,
  });

  useEffect(() => {
    feedListContainerRef.current?.scrollTo(0, 0);
  }, []);

  const SEARCH_TYPE_MAP: Record<string, string> = {
    content: '본문',
    user: '작성자',
    hashTag: '태그',
  };

  // 페이지 이동 시 캐시 삭제하고 싶다면
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.removeQueries(['feedList']);
  // }, [queryClient]);

  return (
    <div className="relative w-full h-[500px] flex flex-col justify-start items-center ml-[4px] ">
      <div className="w-full h-[50px] p-[10px] flex justify-between items-center bg-[#f8d8ae] shadow-[0_5px_5px_#f8d8ae]">
        <div className="flex justify-center items-end font-[Pretendard] text-[1.2rem] font-bold gap-2">
          <span className="text-[1.5rem]">"{keyword}"</span>
          {SEARCH_TYPE_MAP[searchType]} 검색 결과
        </div>
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div
        ref={feedListContainerRef}
        className="flex items-center justify-start w-[1000px] flex-wrap p-[20px] overflow-y-auto flexBox gap-[20px]"
      >
        {feedList.length > 0 ? (
          feedList.map((feed, index) => {
            return (
              <FeedItem
                first_item={false}
                key={index}
                categoryCode={categoryCode}
                feed={feed}
                detailURL={`/feed/${categoryCode}/search/${searchType}/${keyword}/detail/${feed.feedId}`}
              />
            );
          })
        ) : (
          <NotFoundFeedItem />
        )}
        <div
          ref={fetchTriggerRef}
          onClick={() => {
            fetchNextPage();
          }}
        ></div>
        {isLoading || (isFetching && <p>Loading...</p>)}
      </div>
      <Link to={`/feed/${categoryCode}`}>
        <button className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] bg-[#f8d8ae] rounded-full p-[8px] duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110 flex justify-center items-center">
          <AiOutlineRollback size={40} />
        </button>
      </Link>
    </div>
  );
};

export default SearchResult;
