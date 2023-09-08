import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import board from '../assets/feed/board.png';
import Main from '../components/feed/Main';
import { Outlet, useParams } from 'react-router';
import useFeedList from '../hooks/useFeedList';
import LoadingBar from '../components/common/LoadingBar';
import { Feed } from '../api/feed';
import { BackButton } from '../components/common/BackButton';
import { FrontButton } from '../components/common/BackButton';

const FeedPage = () => {
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const sectionStyle = {
    backgroundImage: `url(${board})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const { feedListQuery, bestFeedQuery } = useFeedList(categoryCode);
  const { isLoading, isError } = feedListQuery as {
    isLoading: boolean;
    isError: boolean;
  };

  const latestFeedQueies = feedListQuery.data?.data.data;
  const bestFeedQueries = bestFeedQuery.data;
  console.log(latestFeedQueies);
  console.log('best', bestFeedQueries);

  //현재 좋아요 있는 게시글이 없어서 렌더링 안됨
  if (bestFeedQueries === undefined) {
    console.log('No best feeds Yet. Coming soon!');
  }

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
        <div className="flex flex-col justify-between items-center gap-8 mt-8">
          <div className=" w-[1080px] h-[720px] p-[42px]" style={sectionStyle}>
          <Header categoryCode={categoryCode} />
          <Main
            latestFeedQueies={latestFeedQueies}
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
