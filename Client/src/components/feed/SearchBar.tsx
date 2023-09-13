import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { CategoryCode } from '../../api/category';
import { FeedSearchType } from '../../api/feed';

interface Props {
  categoryCode: CategoryCode;
}

const SearchBar = ({ categoryCode }: Props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<FeedSearchType>('content');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === '') return;
    navigate(`/feed/${categoryCode}/search/${searchType}/${keyword}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <select
        onChange={(e) => {
          setSearchType(e.target.value as FeedSearchType);
        }}
      >
        <option defaultChecked value="content">
          내용
        </option>
        <option value="user">작성자</option>
        <option value="hashTag">해시태그</option>
      </select>
      <input
        className="p-[16px] w-[320px] h-[40px] focus:outline-none focus:ring focus:ring-cyan-300"
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
