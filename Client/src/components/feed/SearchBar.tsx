import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (keyword === '') return;
      navigate(`/feed/find/${keyword}`);
    }
  };

  return (
    <input
      className="p-[1rem] w-[20rem] h-[5vh] focus:outline-none focus:ring focus:ring-cyan-300"
      type="text"
      placeholder="Search..."
      value={keyword}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
