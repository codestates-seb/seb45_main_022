import { useState } from 'react';

const FilterButton = () => {
  const [activeNewFeeds, setActiveNewFeeds] = useState(true);
  const [activeBestFeeds, setActiveBestFeeds] = useState(false);

  const handleActiveNewFeeds = () => {
    setActiveNewFeeds(true);
    setActiveBestFeeds(false);
  };

  const handleActiveBestFeeds = () => {
    setActiveBestFeeds(true);
    setActiveNewFeeds(false);
  };

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
        style={activeNewFeeds ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleActiveNewFeeds}
      >
        최신순
      </button>
      <button
        style={activeBestFeeds ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleActiveBestFeeds}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
