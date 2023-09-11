import icon from '../../assets/icons/status-strength.png';
import { FaThumbsUp } from 'react-icons/fa';

import useUserFeed from '../../hooks/useUserFeed';
// import { STATUS_ICON } from '../../utility/status';
// import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { useState } from 'react';
import { Feed } from '../../api/feed';
// import { Feed } from '../../api/feed';

interface PostProps {
  feed: Feed;
  setOpenFeedItem: (openFeedItem: boolean) => void;
}

interface Comment {
  commentId: number;
  nickname: string;
  profileImage: string;
  level: number;
  body: string;
  createdDate: string;
}

const UserPost = ({ setOpenFeedItem, feed }: PostProps) => {
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
        className=" bg-white relative top-[40px] right-0 bottom-[40px] left-0 mx-auto p-[16px] flex flex-col items-center w-[800px] rounded-[12px] border-[20px] border-solid border-[#444657]"
      >
        <button
          onClick={handleCloseScreen}
          className="absolute top-[16px] right-[16px] text-3xl "
        >
          X
        </button>
        <div className="flex justify-between py-[16px]">
          <div className="px-[16px] flex flex-col items-center border-[1px] border-solid border-gray-400 ">
            <img
              src={userFeed.profileImage}
              width={90}
              alt="profile pic"
              className="mb-[8px]"
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
          </div>
        </div>
        <div className="flex items-center justify-between p-[16px] border-[1px] border-solid border-gray-400 w-full">
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
        <div className="flex items-center justify-center border-[1px] border-solid border-gray-400 w-full py-[16px]">
          <input
            type="search"
            // onChange={(e) => setAddComment(e.target.value)}
            // value={addComment}
            className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[400px]"
          />
          <button className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white py-[8px] px-[12px] text-sm font-semibold ml-[16px] w-[200px] rounded-[12px]">
            Add a comment
          </button>
        </div>

        <div className="max-w-[800px] w-full">
          {userFeed.comments
            .slice(0, displayComments)
            .map((comment: Comment) => (
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
                    {comment.createdDate}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-5">
          {userFeed.comments.length > 3 && (
            <button
              onClick={expandComments}
              className=" hover:brightness-110 duration-300 cursor-pointer border border-solid bg-emerald-500 text-white p-[12px] font-semibold text-sm ml-[16px] rounded-[12px]"
            >
              View More Comments
            </button>
          )}

          {displayComments > 3 && (
            <button
              onClick={hideComments}
              className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-red-400 text-white p-[12px] font-semibold text-sm ml-[16px] rounded-[12px]"
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
