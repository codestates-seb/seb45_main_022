import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LatestFeedItem from './LatestFeedItem';
import useFeedList from '../../hooks/useFeedList';
import Backdrop from '../common/Backdrop';
import LoadingBar from '../common/LoadingBar';
import useInfiniteScroll from '../../utility/scrollUtils';
import { useRef } from 'react';

interface Props {
  categoryCode: CategoryCode;
}

const Main = ({ categoryCode }: Props) => {
  const [currentNewestPage, setCurrentNewestPage] = useState(1);
  const [currentBestPage, setCurrentBestPage] = useState(1);
  const { feedListQuery, bestFeedQuery } = useFeedList(
    categoryCode,
    currentNewestPage,
    currentBestPage,
  );
  const QUERY_MAP = { latest: feedListQuery, best: bestFeedQuery };
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [tab, setTab] = useState<'latest' | 'best'>('latest');
  const flexBox = useRef<HTMLDivElement | null>(null);

  const showFeed = QUERY_MAP[tab].data?.data.data;

  const plusFeed = () => {
    setFeedList((prev) => {
      const newFeedList = [...prev, ...showFeed];
      return newFeedList;
    });
  };

  const fetchNextPage = () => {
    setCurrentNewestPage((prevPage) => prevPage + 1);
    setCurrentBestPage((prevPage) => prevPage + 1);
  };

  useInfiniteScroll(flexBox, fetchNextPage);

  useEffect(() => {
    if (showFeed && showFeed.length > 0) {
      plusFeed();
    }
  }, [showFeed]);

  if (feedListQuery.isLoading || bestFeedQuery.isLoading) {
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );
  }

  const handleFilterNewest = () => {
    if (tab !== 'latest') {
      setTab('latest');
      setCurrentNewestPage(1);
      setFeedList([]);
      console.log('최신순');
    }
  };

  const handleFilterByBest = () => {
    if (tab !== 'best') {
      setTab('best');
      setCurrentBestPage(1);
      setFeedList([]);
      console.log('주간 베스트');
    }
  };

  return (
    <div className="relative w-full h-[500px] flex flex-col justify-start items-center mt-[55px] ml-[4px] ">
      <div className="w-full h-[48px] flex justify-around items-center bg-[#f8d8ae] gap-[320px]">
        <FilterButton
          tab={tab}
          handleFilterNewest={handleFilterNewest}
          handleFilterByBest={handleFilterByBest}
        />
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div
        className="flex items-center justify-around w-[1000px] flex-wrap p-[12px] overflow-y-scroll flexBox"
        ref={flexBox}
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
      </div>
      <Link to={`/feed/${categoryCode}/post`}>
        <button className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] bg-[#f8d8ae] bg-[url('/src/assets/icons/btn-pencil.png')] bg-no-repeat bg-cover rounded-full p-[8px] duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110" />
      </Link>
    </div>
  );
};

export default Main;
