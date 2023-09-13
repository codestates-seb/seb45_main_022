import React, { Dispatch, SetStateAction } from 'react';
import { FeedListType } from '../../api/feed';

interface FilterProps {
  type: FeedListType;
  setType: Dispatch<SetStateAction<FeedListType>>;
}

const FilterButton: React.FC<FilterProps> = ({ type, setType }) => {
  return (
    <div className="flex justify-center items-center gap-[20px]">
      <button
        style={{
          fontFamily: 'Pretendard',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: type === 'latest' ? '#fcebd7' : '#e8cead',
        }}
        onClick={() => {
          setType('latest');
        }}
      >
        최신순
      </button>
      <button
        style={{
          fontFamily: 'Pretendard',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: type === 'weekly' ? '#fcebd7' : '#e8cead',
        }}
        onClick={() => {
          setType('weekly');
        }}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
