import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import Main from '../components/feed/Main';
import { Outlet, useParams } from 'react-router';
import useFeedList from '../hooks/useFeedList';
import LoadingBar from '../components/common/LoadingBar';
import { BackButton } from '../components/common/BackButton';
import { FrontButton } from '../components/common/BackButton';

const FeedPage = () => {
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const { feedListQuery, bestFeedQuery } = useFeedList(categoryCode);

  const { isLoading: isLoadingFeedList, isError: isErrorFeedList } =
    feedListQuery as {
      isLoading: boolean;
      isError: boolean;
    };

  const { isLoading: isLoadingBestFeeds, isError: isErrorBestFeeds } =
    bestFeedQuery as {
      isLoading: boolean;
      isError: boolean;
    };

  const latestFeedQueries = feedListQuery.data?.data.data;
  const bestFeedQueries = bestFeedQuery.data?.data.data;

  if (isLoadingFeedList || isLoadingBestFeeds) {
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );
  }

  if (isErrorFeedList || isErrorBestFeeds) {
    return <p>Error</p>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-8 mt-8">
          <div className=" w-[1080px] h-[720px] p-[42px] bg-board bg-cover bg-center">
            <Header categoryCode={categoryCode} />
            <Main
              latestFeedQueries={latestFeedQueries}
              categoryCode={categoryCode}
              bestFeedQueries={bestFeedQueries}
            />
          </div>
          <div className="flex gap-[900px]">
            {categoryCode !== 1 && <BackButton categoryCode={categoryCode} />}
            {categoryCode !== 13 && <FrontButton categoryCode={categoryCode} />}
          </div>
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default FeedPage;
