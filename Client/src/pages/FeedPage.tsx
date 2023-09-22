import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import FeedList from '../components/feed/FeedList';
import { Outlet, useParams } from 'react-router';
import { CATEGORY_FEED_MAP } from '../utils/category';
import { CategoryCode } from '../api/category';
import { useState } from 'react';
import { Steps } from 'intro.js-react';

const FeedPage = () => {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const { categoryCodeParam } = useParams();
  const categoryCode: CategoryCode = Number(categoryCodeParam);
  const steps = [
    {
      element: '.category_title',
      title: '카테고리',
      intro: `현재 접속한 카테고리 이름이에요.<br/><br/>다른 카테고리로 이동하고 싶다면 양쪽의 화살표를 클릭해보세요!`,
      position: 'left',
    },
    {
      element: '.my_info',
      title: '내 정보',
      intro: `이 카테고리에서 성장시킬 수 있는 스테이터스의 레벨과 경험치를 확인할 수 있어요.<br/><br/>이름을 클릭하면 프로필 창을, 스테이터스 정보를 클릭하면 스테이터스 창을 볼 수 있어요.`,
      position: 'left',
    },
    {
      element: '.post_btn',
      title: '피드 작성',
      intro: `카테고리 주제에 맞는 경험을 피드로 남길 수 있어요.<br/><br/>작성한 피드가 <b>Like</b>를 받으면 카테고리에 맞는 스테이터스의 경험치를 <b>10</b> 얻습니다.<br/><br/>피드 작성 버튼을 눌러서 피드를 작성해보세요!`,
    },
    {
      element: '.feed_item',
      title: '피드',
      intro: `다른 사람들이 남긴 피드를 확인할 수 있어요.<br/><br/>피드를 클릭하면 피드의 상세 페이지를 볼 수 있어요.<br/><br/>마음에 드는 피드에 <b>Like</b>를 눌러주세요!<br/>단, 자신의 피드에는 <b>Like</b>를 누를 수 없어요.`,
    },
  ];
  return (
    <div
      className={`flex flex-col justify-center items-center w-screen h-screen bg-center bg-cover ${CATEGORY_FEED_MAP[categoryCode]}`}
    >
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-[32px] mt-[32px]">
          <div className=" w-[1080px] h-[720px] p-[42px] bg-board bg-cover bg-center">
            <Header categoryCode={categoryCode} />
            <FeedList
              categoryCode={categoryCode}
              setStepsEnabled={setStepsEnabled}
            />
          </div>
        </div>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={0}
          onExit={() => setStepsEnabled(false)}
        />
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default FeedPage;
