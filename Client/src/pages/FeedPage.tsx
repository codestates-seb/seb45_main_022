import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import Main from '../components/feed/Main';
import { Outlet, useParams } from 'react-router';
import { BackButton } from '../components/common/BackButton';
import { FrontButton } from '../components/common/BackButton';
import { CATEGORY_STATUS_MAP } from '../utility/category';
import { useState } from 'react';
import { Feed } from '../api/feed';

const FeedPage = () => {
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [currentPage, setCurrentPage] = useState<{
    latest: number;
    best: number;
  }>({ latest: 1, best: 1 });

  const removeFeed = () => {
    setCurrentPage({ latest: 1, best: 1 });
    setFeedList([]);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-[32px] mt-[32px]">
          <div className=" w-[1080px] h-[720px] p-[42px] bg-board bg-cover bg-center">
            <Header categoryCode={categoryCode} removeFeed={removeFeed} />
            <Main
              categoryCode={categoryCode}
              feedList={feedList}
              setFeedList={setFeedList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="flex gap-[900px]">
            {categoryCode !== 1 && (
              <BackButton categoryCode={categoryCode} removeFeed={removeFeed} />
            )}
            {categoryCode !== Object.keys(CATEGORY_STATUS_MAP).length && (
              <FrontButton
                categoryCode={categoryCode}
                removeFeed={removeFeed}
              />
            )}
          </div>
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default FeedPage;
