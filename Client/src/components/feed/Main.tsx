import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import FeedItem from './FeedItem';
import feedData from '../../../public/feed/feedData.tsx';

const Main = () => {
  return (
    <div className="w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton />
        <SearchBar />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-3">
        {feedData.slice(0, 9).map((item) => (
          <FeedItem
            key={item.id}
            image={item.image}
            nickname={item.nickname}
            icon={item.icon}
            level={item.level}
            uploadImage={item.uploadImage}
            content={item.content}
            timestamp={item.timestamp}
            likeIcon={item.likeIcon}
            likeCount={item.likeCount}
            commentIcon={item.commentIcon}
            commentCount={item.commentCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
