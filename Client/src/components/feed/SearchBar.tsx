import { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');

  return (
    <input
      className="p-2 w-[22vw] focus:outline-none focus:ring focus:ring-cyan-300"
      type="text"
      placeholder="Search..."
      value={keyword}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        console.log(keyword);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (keyword === '') return;
          navigate(`/feed/find/${keyword}`);
        }
      }}
    />
  );
};

export default SearchBar;
