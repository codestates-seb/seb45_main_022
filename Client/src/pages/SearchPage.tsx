import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import { Outlet, useParams } from 'react-router';
import SearchResult from '../components/feed/SearchResult';
import { CATEGORY_FEED_MAP } from '../utility/category';
import { CategoryCode } from '../api/category';

const SearchPage = () => {
  const { categoryCodeParam, searchType, keyword } = useParams();
  const categoryCode: CategoryCode = Number(categoryCodeParam);

  return (
    <div
      className={`flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover ${CATEGORY_FEED_MAP[categoryCode]}`}
    >
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-[32px] mt-[32px]">
          <div className=" w-[1080px] h-[720px] p-[42px] bg-board bg-cover bg-center">
            <Header categoryCode={categoryCode} />
            <SearchResult
              categoryCode={categoryCode}
              searchType={searchType || ''}
              keyword={keyword || ''}
            />
          </div>
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default SearchPage;
