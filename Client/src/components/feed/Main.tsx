import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LatestFeedItem from './LatestFeedItem';
// import BestFeedItem from './BestFeedItem';
import useFeedList from '../../hooks/useFeedList';
import Backdrop from '../common/Backdrop';
import LoadingBar from '../common/LoadingBar';

interface Props {
  categoryCode: CategoryCode;
}

const Main = ({ categoryCode }: Props) => {
  const { feedListQuery, bestFeedQuery } = useFeedList(categoryCode);
  const QUERY_MAP = { latest: feedListQuery, best: bestFeedQuery };
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [tab, setTab] = useState<'latest' | 'best'>('latest');

  useEffect(() => {
    if (QUERY_MAP[tab].data?.data?.data) {
      setFeedList(QUERY_MAP[tab].data?.data.data);
    }
  }, [tab, feedListQuery.isLoading, bestFeedQuery.isLoading]);

  if (feedListQuery.isLoading || bestFeedQuery.isLoading) {
    <Backdrop>
      <LoadingBar />
    </Backdrop>;
  }

  // latest | tab
  const handleFilterNewest = () => {
    setTab('latest');
    console.log('최신순');
  };

  const handleFilterByBest = () => {
    setTab('best');
    console.log('주간 베스트');
  };

  console.log(feedList, 'feedlist;;;;;sfa;fa;fa;fsa;');

  return (
    <div className="relative w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1 ">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton
          // latestFeeds={latestFeeds}
          // bestFeeds={bestFeeds}

          handleFilterNewest={handleFilterNewest}
          handleFilterByBest={handleFilterByBest}
        />
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div className="flex items-center justify-around w-[1000px] flex-wrap p-3  overflow-y-scroll ">
        {feedList &&
          feedList.map((feed) => {
            return <LatestFeedItem categoryCode={categoryCode} feed={feed} />;
          })}
      </div>
      <Link to={`/feed/${categoryCode}/post`}>
        <button className="absolute bottom-5 right-5 w-[50px] h-[50px] bg-[#f8d8ae] bg-[url('/src/assets/icons/btn-pencil.png')] bg-no-repeat bg-cover rounded-full p-2 duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110" />
      </Link>
    </div>
  );
};

export default Main;
