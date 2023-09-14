import useUserInfoQuery from '../../hooks/useUserInfoQuery';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { useState } from 'react';
import LoadingBar from '../common/LoadingBar';
import { Link, useNavigate } from 'react-router-dom';
import ChangePwTab from './ChangePwTab';
import ProfileHeader from './ProfileHeader';
import useUserFeedListQuery from '../../hooks/useUserFeedListQuery';

interface UserFeed {
  feedId: string;
  body: string;
  commentCount: number;
  createdAt: string;
}

const ProfileScreen = () => {
  const [tab, setTab] = useState<'password' | 'post'>('post');

  const { isLoading, data: userInfo } = useUserInfoQuery();
  const { data: userFeedList, isLoading: isFeedLoading } =
    useUserFeedListQuery();

  console.log('userFeedList is being listed', userFeedList);

  const navigate = useNavigate();

  // loading 안주면 map iteration이 안됨
  if (isFeedLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

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
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[32px]">
        <div className="relative w-[500px] h-[600px] p-[40px] bg-[url('/src/assets/common/modal-frame-paper.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-between">
          <ProfileHeader userInfo={userInfo} />
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
                MY POST
              </button>
              <button
                style={{
                  backgroundColor: tab === 'password' ? '#bf916b' : '#ffc98f',
                }}
                className="text-[.7rem] flex-1 rounded-t-[6px]"
                onClick={() => {
                  setTab('password');
                }}
              >
                CHANGE PASSWORD
              </button>
            </div>
            {/* 탭 내용 */}
            <div className="w-full h-[260px] p-[8px] bg-[#bf916b] rounded-b-[6px]">
              {/* 마이포스트 */}
              {tab === 'post' && (
                <div className="w-full h-full overflow-y-scroll">
                  {userFeedList.map((feed: UserFeed) => (
                    <div
                      className="cursor-pointer font-[Pretendard]  flex flex-col justify-between  text-[10px] w-[90%] h-[3.25rem]  rounded-lg p-2 mx-auto mb-4 border border-black  bg-[#ffc98f]"
                      key={feed.feedId}
                    >
                      <p className="text-[12px] font-bold">
                        {feed.body.length > 25
                          ? feed.body.slice(0, 25) + '...'
                          : feed.body}
                      </p>
                      <div className="flex items-center justify-between">
                        <span>{feed.commentCount} comments</span>
                        <span>{feed.createdAt.slice(0, 10)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'password' && <ChangePwTab />}
            </div>
          </div>
        </div>
        <Link to="/main">
          <Button>Close</Button>
        </Link>
      </div>
    </Backdrop>
  );
};

export default ProfileScreen;
