import useOtherUserInfoQuery from '../../hooks/useOtherUserInfoQuery';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { useState } from 'react';
import LoadingBar from '../common/LoadingBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OtherUserProfileHeader from './OtherUserProfileHeader';
import OtherUserFeedsTab from './OtherUserFeedsTab';
import { CategoryCode } from '../../api/category';
import { Feed } from '../../api/feed';

const OtherUserProfileScreen = () => {
  const [tab, setTab] = useState<'password' | 'post'>('post');

  const { categoryCodeParam } = useParams();
  const { nickname } = useParams();
  const categoryCode = Number(categoryCodeParam) as CategoryCode;

  const { isLoading, data: userInfo } = useOtherUserInfoQuery({ categoryCode });

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (!userInfo) {
    alert('정보를 불러오는 데 실패했습니다.');
    navigate('/main');
    return;
  }
  const matchingUserInfo: Feed[] = userInfo.filter(
    (user: { nickname: string }) => user.nickname === nickname,
  );

  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[32px]">
        <div className="relative w-[500px] h-[600px] p-[40px] bg-[url('/src/assets/common/modal-frame-paper.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-between">
          <OtherUserProfileHeader matchingUserInfo={matchingUserInfo} />
          {/* 탭 메뉴 */}
          <div className="w-[400px] h-[310px]">
            {/* 탭 버튼 */}
            <div className="h-[50px] flex flex-row">
              <button
                style={{
                  backgroundColor: tab === 'post' ? '#bf916b' : '#ffc98f',
                }}
                className="text-[.7rem] flex-1 rounded-t-[6px]"
                onClick={() => {
                  setTab('post');
                }}
              >
                User POST
              </button>
            </div>
            {/* 탭 내용 */}
            <div className="w-full h-[260px] p-[8px] bg-[#bf916b] rounded-b-[6px]">
              {tab === 'post' && (
                <OtherUserFeedsTab
                  matchingUserInfo={matchingUserInfo}
                  categoryCode={categoryCode}
                />
              )}
            </div>
          </div>
        </div>
        <Link to="..">
          <Button>Close</Button>
        </Link>
      </div>
    </Backdrop>
  );
};

export default OtherUserProfileScreen;
