import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { Link } from 'react-router-dom';
import FeedItem from './FeedItem';
import useFeedList from '../../hooks/useFeedList';
import { useState } from 'react';

interface Props {
  feedList: Feed[];
  categoryCode: CategoryCode;
}

const Main = ({ categoryCode }: Props) => {
  const [latestFeeds, setLatestFeed] = useState<boolean>(true);
  const [bestFeeds, setBestFeeds] = useState<boolean>(false);

  const { feedListQuery, bestFeedQuery } = useFeedList(categoryCode);

  const latestFeedQueies = feedListQuery.data?.data.data;
  const bestFeedQueries = bestFeedQuery.data;
  console.log(latestFeedQueies);
  console.log('best', bestFeedQueries);

  const handleFilterNewest = () => {
    setLatestFeed(true);
    setBestFeeds(false);
    console.log('최신순');
  };

  const handleFilterByBest = () => {
    setBestFeeds(true);
    setLatestFeed(false);
    console.log('주간 베스트');
  };

  if (feedListQuery.isLoading) {
    return <div>Loading...</div>;
  }

  //현재 좋아요 있는 게시글이 없어서 렌더링 안됨
  if (bestFeedQueries === undefined) {
    console.log('No best feeds Yet. Coming soon!');
  }
  return (
    <div className="relative w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1 ">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton
          latestFeeds={latestFeeds}
          bestFeeds={bestFeeds}
          handleFilterNewest={handleFilterNewest}
          handleFilterByBest={handleFilterByBest}
        />
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div className="flex items-center justify-around w-[1000px] flex-wrap p-3  overflow-y-scroll ">
        {latestFeedQueies.map((feed) => (
          <FeedItem key={feed.id} feed={feed} categoryCode={categoryCode} />
        ))}
        {bestFeedQueries?.map((feed) => (
          <FeedItem key={feed.id} feed={feed} categoryCode={categoryCode} />
        ))}
      </div>
      <Link to="post">
        <button className="absolute bottom-5 right-5 w-[50px] h-[50px] bg-[#f8d8ae] bg-[url('/src/assets/icons/btn-pencil.png')] bg-no-repeat bg-cover rounded-full p-2 duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110" />
      </Link>
    </div>
  );
};

export default Main;
