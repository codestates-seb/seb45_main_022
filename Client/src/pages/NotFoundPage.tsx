import { useState } from 'react';

const NotFoundPage = () => {
  const [displayText, setDisplayText] = useState('can.. you see me..?');

  const handleClick = () => {
    setDisplayText(displayText + ' go.. away..');
  };

  return (
    <div className="w-screen h-screen bg-notFoundPage bg-cover flex justify-center cursor-pointer">
      <div
        className="flex items-end text-red-800 text-[1.5rem]"
        onClick={handleClick}
      >
        {displayText}
      </div>
    </div>
  );
};

export default NotFoundPage;
