import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import ModalFrame from '../components/common/ModalFrame';
import ServerList from '../components/map/ServerList';
import { STATUS_CATEGORY_MAP } from '../utils/status';
import { StatusCode, CategoryCode } from '../api/category';
import { ReturnToMainButton } from '../components/common/BackButton';
import GuideButton from '../components/common/GuideButton';
import { Steps } from 'intro.js-react';

const MapPage = () => {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryCode[]>([]);
  const { statusCodeParam } = useParams<{ statusCodeParam: string }>();
  const statusCode: StatusCode = Number(statusCodeParam);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setCategoryList(STATUS_CATEGORY_MAP[statusCode]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCategoryData();
  }, [statusCode]);

  const steps = [
    {
      element: '.server_list',
      title: '나의 관심사는 ?',
      intro: `선택한 스테이터스를 성장시킬 수 있는 카테고리들입니다.<br/>관심있는 분야를 선택해 보세요.`,
      position: 'right',
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-full absolute bg-map bg-center bg-cover">
      <Backdrop>
        <ModalFrame width={1020} height={680}>
          <div className="flex flex-row justify-between items-center w-full h-full px-[50px] pb-[20px]">
            <div>
              <ReturnToMainButton />
            </div>
            <div className="flex justify-center items-center text-4xl">
              Servers
            </div>
            <GuideButton
              onClick={() => {
                setStepsEnabled(true);
              }}
            />
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-[800px] h-[480px] flex flex-col justify-around items-center p-[40px] server_list">
            {categoryList.map((categoryCode, index) => (
              <ServerList key={index} categoryCode={categoryCode} />
            ))}
          </div>
          <Steps
            enabled={stepsEnabled}
            steps={steps}
            initialStep={0}
            onExit={() => setStepsEnabled(false)}
          />
        </ModalFrame>
      </Backdrop>
    </div>
  );
};

export default MapPage;
