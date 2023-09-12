import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';

import useUserFeed from '../../hooks/useUserFeed';
import { STATUS_ICON } from '../../utility/status';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
// import { useState } from 'react';
import { Feed } from '../../api/feed';
import Comments from './Comments';
import { CategoryCode } from '../../api/category';
// import { Feed } from '../../api/feed';

interface PostProps {
  feed: Feed;
  setOpenFeedItem: (openFeedItem: boolean) => void;
  categoryCode: CategoryCode;
}

interface Comment {
  commentId: number;
  nickname: string;
  profileImage: string;
  level: number;
  body: string;
  createDate: string;
}

const UserPost = ({ setOpenFeedItem, feed, categoryCode }: PostProps) => {
  // const [likes, setlikes] = useState(3);

  // const handleLikePost = () => {
  //   setlikes(likes + 1);
  // };
  // const [displayComments, setDisplayComments] = useState(3);
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

  // const expandComments = () => {
  //   setDisplayComments(displayComments + 3);
  // };

  // const hideComments = () => {
  //   setDisplayComments(3);
  // };

  // 게시글 컴포넌트 클릭했을 때는 닫힘하지 않기
  const handleContainerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <p>Error..</p>;
  }

  return (
    <div
      onClick={handleCloseScreen}
      className="overflow-y-scroll z-2 fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)]"
    >
      <div
        onClick={handleContainerClick}
        className="bg-white relative top-[50px] right-0 bottom-[40px] left-0 mx-auto flex justify-evenly w-[1000px] h-[80vh] rounded-[12px] overflow-hidden"
      >
        <button
          onClick={handleCloseScreen}
          className="absolute top-[8px] right-[8px] text-3xl"
        >
          X
        </button>
        <div className="flex flex-col bg-orange-100 p-4 w-[12rem]">
          <div className="flex flex-col items-center p-4">
            <img
              src={userFeed.profileImage}
              width={90}
              alt="profile pic"
              className="mb-[8px] w-16 h-16 rounded-full object-cover"
            />
            <span className="font-[Pretendard] font-semibold text-[20px]">
              {userFeed.nickname}
            </span>
            <div className="flex mt-1 items-center ">
              <img
                src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                alt="stat icon"
                width={20}
              />
              <span className="font-[Pretendard] ml-2">
                Lv. {userFeed.level}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between py-2 "></div>
        </div>
        <div className="flex flex-col w-[80rem]">
          <div className=" h-[5.25rem]  flex items-center px-2">
            {userFeed.feedHashTags.map((hashtag) => {
              return (
                <div key={hashtag.hashTagId} className="">
                  <button className="font-[Pretendard] rounded-xl border-zinc-500 bg-yellow-400 text-sm px-4 py-1  ">
                    #{hashtag.body}
                  </button>{' '}
                </div>
              );
            })}
          </div>

          {/* text +comments */}
          <div className="flex flex-col justify-between  h-full ">
            <div className="flex justify-between  ">
              <div className="w-[500px] border bg-gray-100 border-gray-400">
                <p
                  dangerouslySetInnerHTML={{ __html: userFeed.data }}
                  className="font-[Pretendard] text-m p-4 break-all"
                />
              </div>

              <div className="flex flex-col w-[20rem] h-full ">
                {/* <div className="max-w-[800px] w-full"> */}
                <div className=" overflow-auto scrollbar-width-none">
                  {userFeed.comments
                    // .slice(0, displayComments)
                    .map((comment: Comment) => (
                      <Comments
                        key={comment.commentId}
                        comment={comment}
                        categoryCode={categoryCode}
                      />
                    ))}
                </div>
              </div>
            </div>
            {/* input */}
            <div className="flex  items-center justify-between w-full bg-gray-100">
              <div className="flex items-center justify-evenly  w-full">
                <div className="flex items-center ">
                  <button className="hover:text-green-400 rounded-xl text-xl font-semibold">
                    <FaThumbsUp />
                  </button>
                  <span className="ml-2 text-gray-500 font-semibold">
                    {userFeed.likeCount}
                  </span>
                </div>
                <div className="relative">
                  <button className="hover:text-green-400 rounded-xl text-xl font-semibold">
                    <FaCommentDots />
                  </button>
                  <span className="ml-2 text-gray-500 font-semibold">
                    {userFeed.comments.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center  p-4">
                <input
                  type="text"
                  placeholder="댓글"
                  // onChange={(e) => setAddComment(e.target.value)}
                  // value={addComment}
                  className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[40rem]"
                />
                <button className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white h-[2.5rem] w-[2.5rem] ml-[1rem] text-sm font-semibold rounded-[12px]">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* <div className="">
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
          </div> */}

          {/* <div className="flex items-center justify-center mx-auto p-4">
            <input
              type="text"
              placeholder="댓글"
              // onChange={(e) => setAddComment(e.target.value)}
              // value={addComment}
              className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[20rem]"
            />
            <button className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white h-[2.5rem] w-[2.5rem] ml-[1rem] text-sm font-semibold rounded-[12px]">
              +
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
