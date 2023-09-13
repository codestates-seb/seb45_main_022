import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === '') return;
    navigate(`/feed/${categoryCode}/search/${searchType}/${keyword}`);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const inputClassName =
    isFocused || keyword !== ''
      ? 'p-[10px] pl-[70px] w-[320px] h-[40px] bg-clickedSearchBar bg-cover bg-center focus:outline-none bg-[#f8d8ae]'
      : 'p-[10px] pl-[70px] w-[320px] h-[40px] bg-searchBar bg-cover bg-center focus:outline-none bg-[#f8d8ae]';

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center items-center"
    >
      <select
        className="pb-[5px] w-[75px] h-[40px] focus:outline-none text-center bg-[#f8d8ae]"
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
        ref={inputRef}
        className={inputClassName}
        type="text"
        value={keyword}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
    </form>
  );
};

export default SearchBar;
