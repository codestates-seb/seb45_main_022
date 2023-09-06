import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import FeedItem from './FeedItem';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';

interface Props {
  feedList: Feed[];
  categoryCode: CategoryCode;
}

const Main = ({ feedList, categoryCode }: Props) => {
  return (
    <div className="w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton />
        <SearchBar />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-3">
        {feedList !== null ? (
          feedList.map((feed, index) => (
            <FeedItem key={index} feed={feed} categoryCode={categoryCode} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Main;
