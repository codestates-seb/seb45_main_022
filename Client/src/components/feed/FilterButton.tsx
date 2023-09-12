interface FilterProps {
  tab: string;
  handleFilterNewest: () => void;
  handleFilterByBest: () => void;
}

const FilterButton = ({
  tab,
  handleFilterNewest,
  handleFilterByBest,
}: FilterProps) => {
  const buttonStyle = {
    fontFamily: 'Pretendard',
    padding: '8px 16px',
    borderRadius: '4px',
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
    <div className="flex justify-center items-center gap-[20px]">
      <button
        style={tab === 'latest' ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleFilterNewest}
      >
        최신순
      </button>
      <button
        style={tab === 'best' ? clickedButtonStyle : unclickedButtonStyle}
        onClick={handleFilterByBest}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
