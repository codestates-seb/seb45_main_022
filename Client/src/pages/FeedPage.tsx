import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import board from '../assets/feed/board.png';
import Main from '../components/feed/Main';
import { useEffect, useState } from 'react';
import { getFeedList } from '../api/feed';
import { Feed } from '../api/feed';
import { Outlet, useParams } from 'react-router';

const FeedPage = () => {
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const sectionStyle = {
    backgroundImage: `url(${board})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const feedList = await getFeedList(categoryCode);
        setFeedList(feedList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchFeedData();
  }, [categoryCode]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className=" w-[1080px] h-[720px] p-[42px]" style={sectionStyle}>
          <Header categoryCode={categoryCode} />
          <Main feedList={feedList} categoryCode={categoryCode} />
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default FeedPage;
