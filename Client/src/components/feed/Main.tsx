import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import FeedItem from './FeedItem';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { useState } from 'react';

interface Props {
  feedList: Feed[];
  categoryCode: CategoryCode;
}

const Main = ({ feedList, categoryCode }: Props) => {
  const [sortByBest, setSortByBest] = useState(false);
  const [sortByNewest, setSortByNewest] = useState(true);

  const handleFilterByBest = () => {
    setSortByBest(true);
    setSortByNewest(false);
    console.log('주간 베스트');
  };

  const handleFilterNewest = () => {
    setSortByNewest(true);
    setSortByBest(false);
    console.log('최신순');
  };
  const filterFeedListWithin1Week = (list: Feed[]) => {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    currentDate.setHours(currentDate.getHours() + 9); // 코리안 타임존

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    const sixDaysAgo = new Date(yesterday.getTime() - 6 * 24 * 60 * 60 * 1000);

    return list.filter((feed) => {
      const createdAtDate = new Date(feed.createdAt);
      return createdAtDate >= sixDaysAgo && createdAtDate <= currentDate;
    });
  };

  const filteredFeedList = filterFeedListWithin1Week(feedList);

  return (
    <div className="w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton
          sortByNewest={sortByNewest}
          handleFilterNewest={handleFilterNewest}
          sortByBest={sortByBest}
          handleFilterByBest={handleFilterByBest}
        />
        <SearchBar />
      </div>
      <div className="flex items-center justify-around w-[1000px] flex-wrap p-3  overflow-y-scroll ">
        {sortByNewest &&
          feedList
            //아이로 생성순 정렬
            .sort((a, b) => b.feedId - a.feedId)
            .map((feed, index) => (
              <FeedItem key={index} feed={feed} categoryCode={categoryCode} />
            ))}
        {sortByBest &&
          filteredFeedList
            .sort((a, b) => b.likeCount - a.likeCount)
            .map((feed, index) => (
              <FeedItem key={index} feed={feed} categoryCode={categoryCode} />
            ))}
      </div>
    </div>
  );
};

export default Main;
