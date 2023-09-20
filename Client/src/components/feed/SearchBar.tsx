import { useState, ChangeEvent, FormEvent, useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === '') return;
    navigate(`/feed/${categoryCode}/search/${searchType}/${keyword}`);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center items-center"
    >
      <div className="pl-[70px] pr-[20px] w-[320px] h-[40px] bg-clickedSearchBar bg-cover bg-center focus:outline-none bg-[#f8d8ae] flex flex-row justify-center items-center">
        <input
          ref={inputRef}
          className="bg-transparent focus:outline-none w-[150px] placeholder-black focus:font-[Pretendard] focus:placeholder-transparent"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={handleInputChange}
        />
        <span className="mb-[5px]">│</span>
        <select
          className="w-[70px] h-[20px] font-[Pretendard] font-bold text-center bg-[#f8d8ae] mb-[1px]"
          onChange={(e) => {
            setSearchType(e.target.value as FeedSearchType);
          }}
        >
          <option defaultChecked value="content">
            본문
          </option>
          <option value="user">작성자</option>
          <option value="hashTag">#</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
