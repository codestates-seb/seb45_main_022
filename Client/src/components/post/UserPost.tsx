import profileImg from '../../assets/common/profile.png';
import icon from '../../assets/icons/status-strength.png';
import { FaThumbsUp } from 'react-icons/fa';

import useUserFeed from '../../hooks/useUserFeed';
import { STATUS_ICON } from '../../utility/status';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { useState } from 'react';

const UserPost = ({ setOpenFeedItem, feed }) => {
  // const [likes, setlikes] = useState(3);

  // const handleLikePost = () => {
  //   setlikes(likes + 1);
  // };
  const [displayComments, setDisplayComments] = useState(3);
  // const [addComment, setAddComment] = useState('');

  const { getUserFeedQuery } = useUserFeed(feed.feedId);
  const { isLoading, isError } = getUserFeedQuery as {
    isLoading: boolean;
    isError: boolean;
  };

  // console.log(getUserFeedQuery.data?.data.comments);

  const userFeed = getUserFeedQuery.data?.data;
  console.log(getUserFeedQuery.data?.data);
  console.log(getUserFeedQuery.data?.data.comments);

  // console.log(userFeed.comments);
  /// readt query

  const handleCloseScreen = () => {
    setOpenFeedItem(false);
  };

  const expandComments = () => {
    setDisplayComments(displayComments + 3);
  };

  const hideComments = () => {
    setDisplayComments(3);
  };

  // 게시글 컴포넌트 클릭했을 때는 닫힘하지 않기
  const handleContainerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error..</p>;
  }

  return (
    <div
      onClick={handleCloseScreen}
      className=" overflow-y-scroll z-2 fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] "
    >
      <div
        onClick={handleContainerClick}
        className=" bg-white relative top-10 right-0 bottom-10 left-0 mx-auto p-4 flex flex-col items-center w-[800px] rounded-xl border-[20px] border-solid border-[#444657]"
      >
        <button
          onClick={handleCloseScreen}
          className="absolute top-4 right-4 text-3xl "
        >
          X
        </button>
        <div className="flex  justify-between  py-4 ">
          <div className="  px-4 flex flex-col items-center border-r border-solid border-gray-400 ">
            <img
              src={userFeed.profileImage}
              width={90}
              alt="profile pic"
              className="mb-2"
            />
            <span className="font-[Pretendard] font-semibold">
              {userFeed.nickname}
            </span>
            <div className="flex mt-1 items-center justify-around w-[100%]">
              <img
                // src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                alt="스탯 아이콘"
              />
              <span className="font-[Pretendard]">Lv. {userFeed.level}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between  py-2 w-[500px]">
            <div
              dangerouslySetInnerHTML={{ __html: userFeed.data }}
              className=" font-[Pretendard] p-6 font-semibold overflow-hidden overflow-ellipsis"
            />

            <span className="font-[Pretendard] text-[12px] text-right w-full">
              {new Date(userFeed.createdAt).toLocaleTimeString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-solid border-gray-400 w-full">
          <div>
            <span className=" text-sm font-semibold  rounded-xl p-3">
              Total Comments
            </span>
            <span className="ml-2 text-m text-gray-500 font-semibold">
              {userFeed.comments.length}
            </span>
          </div>
          <div className="relative mr-6 ">
            <button
              // onClick={handleLikePost}
              className="hover:brightness-110 duration-200 hover:text-green-400 rounded-xl text-xl font-semibold "
            >
              <FaThumbsUp />
            </button>
            <span className="absolute  top-0 ml-3 text-sm text-gray-500 font-semibold ">
              {userFeed.likeCount}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center  border-b border-solid border-gray-400 w-full py-4">
          <input
            type="search"
            // onChange={(e) => setAddComment(e.target.value)}
            // value={addComment}
            className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[400px]"
          />
          <button className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white py-2 px-3 text-sm font-semibold ml-4 w-[200px] rounded-xl">
            Add a comment
          </button>
        </div>

        <div className="max-w-[800px] w-full">
          {userFeed.comments.slice(0, displayComments).map((comment) => (
            <div
              key={comment.commentId}
              className="border-b border-solid border-gray-400  py-2 flex p-4 "
            >
              <div className="flex flex-col items-center justify-center w-20">
                <img
                  src={comment.profileImage}
                  alt="profile image"
                  width={45}
                />
                <span className="font-[Pretendard] font-semibold">
                  {comment.nickname}
                </span>

                <div className="flex mt-1 items-center justify-around w-[100%]">
                  <img src={icon} alt="muscle icon" width={15} />
                  <span className="font-[Pretendard] text-sm">
                    Lv. {comment.level}
                  </span>
                </div>
              </div>
              <div className="flex text-sm   w-full p-4">
                <span className="font-[Pretendard] font-normal">
                  {comment.body}
                </span>
              </div>
              <div className="w-10 text-center">
                <span className="font-[Pretendard] text-sm text-gray-500 ">
                  {comment.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          {userFeed.comments.length > 3 && (
            <button
              onClick={expandComments}
              className=" hover:brightness-110 duration-300 cursor-pointer border border-solid bg-emerald-500 text-white p-3 font-semibold text-sm ml-4 rounded-xl"
            >
              View More Comments
            </button>
          )}

          {displayComments > 3 && (
            <button
              onClick={hideComments}
              className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-red-400 text-white p-3 font-semibold text-sm ml-4 rounded-xl"
            >
              Hide Comments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
