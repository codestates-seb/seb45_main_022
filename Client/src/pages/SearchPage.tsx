import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import Main from '../components/feed/Main';
import { Outlet, useParams } from 'react-router';
import useSearch from '../hooks/useSearch';
import LoadingBar from '../components/common/LoadingBar';
import { Feed } from '../api/feed';
import { BackButton } from '../components/common/BackButton';
import { FrontButton } from '../components/common/BackButton';
import { CATEGORY_STATUS_MAP } from '../utility/category';

const SearchPage = () => {
  const { categoryCodeParam, keyword } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const { searchFeedsQuery } = useSearch(categoryCode, keyword);
  const { isLoading, isError } = searchFeedsQuery as {
    data: Feed[];
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (isError) {
    return <p>{isError.toString()}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-[32px] mt-[32px]">
          <div className=" w-[1080px] h-[720px] p-[42px] bg-board bg-cover bg-center">
            <Header categoryCode={categoryCode} />
            <Main categoryCode={categoryCode} />
          </div>
          <div className="flex gap-[900px]">
            {categoryCode !== 1 && <BackButton categoryCode={categoryCode} />}
            {categoryCode !== Object.keys(CATEGORY_STATUS_MAP).length && (
              <FrontButton categoryCode={categoryCode} />
            )}
          </div>
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default SearchPage;
