import React from 'react';

interface FilterProps {
  tab: string;
  handleFilter: (selectedTab: 'latest' | 'best') => void;
}

const FilterButton: React.FC<FilterProps> = ({ tab, handleFilter }) => {
  return (
    <div className="flex justify-center items-center gap-[20px]">
      <button
        style={{
          fontFamily: 'Pretendard',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: tab === 'latest' ? '#fcebd7' : '#e8cead',
        }}
        onClick={() => handleFilter('latest')}
      >
        최신순
      </button>
      <button
        style={{
          fontFamily: 'Pretendard',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: tab === 'best' ? '#fcebd7' : '#e8cead',
        }}
        onClick={() => handleFilter('best')}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
