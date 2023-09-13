import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';
import useUserFeed from '../../hooks/useUserFeed';
import { STATUS_ICON } from '../../utility/status';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { Feed } from '../../api/feed';
import Comments from './Comments';
import { CategoryCode } from '../../api/category';
import { useEffect, useState } from 'react';
import usePostCommentMutation from '../../hooks/usePostCommentMutation';
import { UserInfo } from '../../api/user';
import { useQuery } from '@tanstack/react-query';

import { deleteFeedData, editFeedData } from '../../api/editFeed';

interface PostProps {
  feed: Feed;
  feedId: Feed['feedId'];
  setOpenFeedItem: (openFeedItem: boolean) => void;
  categoryCode: CategoryCode;
  userId: UserInfo;
}

interface Comment {
  commentId: number;
  nickname: string;
  profileImage: string;
  level: number;
  body: string;
  createDate: string;
}

interface Hashtag {
  hashTagId: number;
  body: string;
}

const UserPost = ({
  setOpenFeedItem,
  feed,
  categoryCode,
  feedId,
}: PostProps) => {
  const [displayedCommentCount, setDisplayedCommentCount] = useState(3);
  const [addComment, setAddComent] = useState('');
  const [isNicknameMatched, setIsNicknameMatched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [feedText, setFeedText] = useState('.......수정 필요');

  const { getUserFeedQuery } = useUserFeed(feed.feedId);
  const { isLoading, isError } = getUserFeedQuery as {
    isLoading: boolean;
    isError: boolean;
  };
  const userFeed = getUserFeedQuery.data?.data;
  const { mutate: postComment } = usePostCommentMutation({
    feedId: feed.feedId,
  });
  //게시글 업로즈한 사용자 조회
  // const userNickname = userFeed.nickname;
  // console.log(userNickname);

  const { data: userInfo } = useQuery(['userInfo']);

  // console.log(userFeed.feedId, 'feedId is called here');

  // 로그인 사용자 === 작성자 ? true : false
  useEffect(() => {
    if (userInfo && userFeed) {
      const loggedInUser = userInfo.nickname;

      if (userFeed.nickname === loggedInUser) {
        console.log('feed user and logged in user are the same');
        // setFeedText(userFeed.body);
        setIsNicknameMatched(true);
      } else {
        console.log('feed user and logged in user are different');
        setIsNicknameMatched(false);
      }
    }
  }, [userInfo, userFeed]);

  const handleDeleteFeed = async (feedId: number) => {
    try {
      await deleteFeedData({ feedId });
      alert('피드 삭제완료');
    } catch (error) {
      alert('살제 실패');
    }
  };

  const handleEditFeed = async (feedId: number) => {
    try {
      await editFeedData({
        feedId,
        body: feedText,
      });
      // setFeedText(userFeed.body);
      setIsEditing(false);
      alert('댓글 수정완료');
    } catch {
      alert('수정 실패');
    }
  };

  const handleCloseScreen = () => {
    setOpenFeedItem(false);
  };

  const handleContainerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleSubmitComment = () => {
    console.log(addComment);

    postComment(addComment);

    setAddComent('');
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
        className=" bg-white relative top-[50px] right-0 bottom-[40px] left-0 mx-auto flex justify-evenly w-[75rem] min-h-[35rem]  rounded-2xl overflow-hidden"
      >
        <button
          onClick={handleCloseScreen}
          className="absolute top-[8px] right-[8px] text-3xl"
        >
          X
        </button>
        <div className="flex flex-col bg-orange-100  p-4 w-[12rem]">
          <div className="flex flex-col items-center p-4">
            <img
              src={userFeed.profileImage}
              width={90}
              alt="profile pic"
              className="mb-[8px] w-16 h-16 rounded-full object-cover "
            />
            <span className="font-[Pretendard] font-semibold text-[20px] ">
              {userFeed.nickname}
            </span>
            <div className="flex mt-1 items-center ">
              <img
                src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                alt="stat icon"
                width={20}
              />
              <span className="font-[Pretendard] ml-2 font-semibold">
                Lv. {userFeed.level}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between py-2 "></div>
        </div>

        {/* text +comments */}
        <div className="flex flex-col justify-between   ">
          <div className="flex justify-between ">
            <div className="w-[31.25rem] oveflow-y-scroll  ">
              <div className=" flex items-center justify-around w-[8rem] text-sm font-semibold   p-4">
                {isNicknameMatched && (
                  <>
                    {isEditing ? (
                      <button
                        onClick={() => handleEditFeed(userFeed.feedId)}
                        className="font-[Pretendard] text-sm text-gray-500"
                      >
                        저장
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="font-[Pretendard] text-sm text-gray-500"
                      >
                        수정
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteFeed(userFeed.feedId)}
                      className="font-[Pretendard] text-sm text-gray-500"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={feedText}
                  onChange={(e) => setFeedText(e.target.value)}
                  className="font-[Pretendard] font-normal bg-gray-100 p-3"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: feedText }}
                  className="font-[Pretendard] text-m p-6 break-all mt-[-1.25rem]"
                />
              )}
            </div>

            <div className="flex flex-col w-[31.25rem] py-3 mt-2">
              <div className="flex flex-col w-[31.25rem]">
                <div className="overflow-y-auto scrollbar-width-none">
                  {userFeed.comments
                    .slice(0, displayedCommentCount)
                    .map((comment: Comment) => (
                      <Comments
                        key={comment.commentId}
                        comment={comment}
                        categoryCode={categoryCode}
                        feedId={userFeed.feedId}
                      />
                    ))}
                </div>
                <div className="flex items-center justify-around mx-auto  w-[14rem] font-semibold">
                  {userFeed.comments.length > displayedCommentCount && (
                    <button
                      className="cursor-pointer bg-blue-500 text-white w-[5rem] h-[2rem]  rounded-xl mt-1 text-sm font-[Pretendard]"
                      onClick={() =>
                        setDisplayedCommentCount(displayedCommentCount + 4)
                      }
                    >
                      {/* <FaRegArrowAltCircleDown />
                       */}
                      더 보기
                    </button>
                  )}
                  {displayedCommentCount > 3 && (
                    <button
                      className="cursor-pointer bg-red-500 text-white w-[5rem] h-[2rem]  rounded-xl mt-1 text-sm font-[Pretendard]"
                      onClick={() =>
                        setDisplayedCommentCount(displayedCommentCount - 4)
                      }
                    >
                      숨기기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* input */}

          <div className="flex flex-col ml-[-3px]">
            <div className=" h-[4.25rem]  flex items-center justify-evenly px-4">
              {userFeed.feedHashTags?.map((hashtag: Hashtag) => {
                return (
                  <div key={hashtag.hashTagId} className="">
                    <button className="font-[Pretendard] rounded-xl border-zinc-500 bg-yellow-400 text-sm px-4 py-2  ">
                      #{hashtag.body}
                    </button>{' '}
                  </div>
                );
              })}
            </div>

            <div className="flex  items-center justify-between  bg-gray-100">
              <div className="flex items-center justify-evenly w-[10rem]">
                <div className="flex items-center ">
                  <button className=" rounded-xl text-xl font-semibold">
                    <FaThumbsUp size={24} />
                  </button>
                  <span className="ml-2 text-gray-500 font-semibold">
                    {userFeed.likeCount}
                  </span>
                </div>
                <div className="relative">
                  <button className=" rounded-xl text-xl font-semibold">
                    <FaCommentDots size={24} />
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
                  value={addComment}
                  onChange={(e) => setAddComent(e.target.value)}
                  className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[30rem]"
                />
                <button
                  onClick={handleSubmitComment}
                  className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white h-[2.5rem] w-[2.5rem] ml-[1rem] text-sm font-semibold rounded-[12px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
