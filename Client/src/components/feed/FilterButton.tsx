import { useState } from 'react';

const FilterButton = ({
  handleFilterNewest,
  handleFilterByBest,
  sortByNewest,
  sortByBest,
}) => {
  const buttonStyle = {
    fontFamily: 'Pretendard',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const clickedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#fcebd7',
  };

  const unclickedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e8cead',
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <button
        style={sortByNewest ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleFilterNewest}
      >
        최신순
      </button>
      <button
        style={sortByBest ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleFilterByBest}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
