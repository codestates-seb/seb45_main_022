import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import FeedItem from './FeedItem';
import { Feed } from '../../api/feed';
import { CategoryCode } from '../../api/category';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  feedList: Feed[];
  categoryCode: CategoryCode;
}

const Main = ({ feedList, categoryCode }: Props) => {
  return (
    <div className="relative w-full h-[31.25rem] flex flex-col justify-start items-center mt-[55px] ml-1">
      <div className="w-full h-[3rem] flex justify-around items-center bg-[#f8d8ae] gap-[20rem]">
        <FilterButton />
        <SearchBar categoryCode={categoryCode} />
      </div>
      <div className="flex items-center justify-around w-[1000px] flex-wrap p-3  overflow-y-scroll ">
        {feedList
          //아이로 생성순 정렬
          .sort((a, b) => b.feedId - a.feedId)
          .map((feed, index) => (
            <FeedItem key={index} feed={feed} categoryCode={categoryCode} />
          ))}
      </div>
      <Link to="post">
        <button className="absolute bottom-5 right-5 w-[50px] h-[50px] bg-[#f8d8ae] bg-[url('/src/assets/icons/btn-pencil.png')] bg-no-repeat bg-cover rounded-full p-2 duration-300 shadow-[0_0_5px_#e1772d] hover:brightness-110 hover:scale-110" />
      </Link>
    </div>
  );
};

export default Main;
