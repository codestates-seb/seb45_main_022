import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import board from '../assets/feed/board.png';
import Main from '../components/feed/Main';
import { useParams } from 'react-router';
import useFeedList from '../hooks/useFeedList';
import LoadingBar from '../components/common/LoadingBar';
import { Feed } from '../api/feed';

const FeedPage = () => {
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const sectionStyle = {
    backgroundImage: `url(${board})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const { feedListQuery } = useFeedList(categoryCode);
  const {
    data: feedList,
    isLoading,
    isError,
  } = feedListQuery as {
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
        <div className=" w-[1080px] h-[720px] p-[42px]" style={sectionStyle}>
          <Header categoryCode={categoryCode} />
          <Main feedList={feedList} categoryCode={categoryCode} />
        </div>
      </Backdrop>
    </div>
  );
};

export default FeedPage;
