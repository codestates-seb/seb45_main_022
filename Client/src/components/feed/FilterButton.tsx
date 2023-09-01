import { useState } from 'react';

const FilterButton: React.FC = () => {
  const [clicked, setClicked] = useState<string>('최신순');

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'Pretendard',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const clickedButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#fcebd7',
  };

  const unclickedButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#e8cead',
  };

  const handleButtonClick = (buttonText: string) => {
    setClicked(buttonText);
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <button
        style={clicked === '최신순' ? clickedButtonStyle : unclickedButtonStyle}
        onClick={() => handleButtonClick('최신순')}
      >
        최신순
      </button>
      <button
        style={
          clicked === '주간 베스트' ? clickedButtonStyle : unclickedButtonStyle
        }
        onClick={() => handleButtonClick('주간 베스트')}
      >
        주간 베스트
      </button>
    </div>
  );
};

export default FilterButton;
