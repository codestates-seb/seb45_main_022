import likeButton from '../../assets/feed/likeButton.png';
import clickedLikeButton from '../../assets/feed/clickedLikeButton.png';
import commentButton from '../../assets/feed/commentButton.png';
import { CategoryCode } from '../../api/category';
import { STATUS_ICON } from '../../utils/status';
import { CATEGORY_STATUS_MAP } from '../../utils/category';
import { Feed } from '../../api/feed';
import { Link } from 'react-router-dom';
import useLikeMutation from '../../hooks/useLikeMutation';
import { FormEventHandler } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  feed: Feed;
  categoryCode: CategoryCode;
  detailURL: string;
}

const FeedItem = ({ feed, categoryCode, detailURL }: Props) => {
  const {
    nickname,
    profileImage,
    feedId,
    level,
    body,
    like,
    likeCount,
    commentCount,
    createdAt,
  } = feed;

  const queryClient = useQueryClient();

  const {
    mutate: postLike,
    isSuccess,
    reset,
  } = useLikeMutation({
    feedId,
    categoryCode,
  });

  const handleLikeBtnClick: FormEventHandler = () => {
    postLike();
  };

  if (isSuccess) {
    queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'content']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'hashTag']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'user']);
    reset();
  }

  return (
    <>
      <div className="w-[300px] h-[140px] bg-cover bg-center bg-feedBox">
        <div className="w-full h-full p-[28px] flex flex-row justify-between">
          {/* 왼쪽 구간 (전체 너비 1/3) */}
          <div className="w-[60px] h-full flex flex-col justify-between items-center">
            <div className="bg-[url('/src/assets/common/profile-frame.png')] bg-cover bg-no-repeat w-[50px] h-[50px] p-[5px]">
              <img src={profileImage} alt="profile" />
            </div>
            <div
              className={`w-full flex justify-center items-center ${
                nickname.length > 3 ? 'text-[0.625rem]' : 'text-sm'
              }`}
            >
              {nickname}
            </div>
            <div className="w-full flex justify-center items-center -mt-[4px] gap-[2px]">
              <div className="w-[10px] -mt-[3px]">
                <img
                  src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
                  alt="스탯 아이콘"
                />
              </div>
              <div className="text-[0.625rem]">Lv.{level}</div>
            </div>
          </div>

          {/* 오른쪽 구간 (전체 너비 2/3) */}
          <div className="w-[175px] h-full flex flex-col justify-between items-start">
            <div className="w-full h-[20px] pr-[5px] font-[Pretendard] overflow-hidden text-ellipsis whitespace-nowrap">
              <Link className="hover:underline" to={detailURL}>
                {body}
              </Link>
            </div>
            <div className="w-[170px] h-[30px] flex flex-row flex-wrap justify-start items-center gap-[5px] overflow-y-auto">
              {feed.feedHashTags.map((hashtag) => {
                return (
                  <Link
                    to={`/feed/${categoryCode}/search/hashTag/${hashtag.body}`}
                    type="button"
                    key={hashtag.hashTagId}
                    className="w-fit h-[20px] bg-[#d4c692] text-[.5rem] font-[Pretendard] font-bold rounded-[6px] flex justify-center items-center p-[5px] hover:brightness-110 duration-300 cursor-pointer whitespace-nowrap"
                  >
                    # {hashtag.body}
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex justify-end items-center gap-[6px]">
              <div className="text-[0.625rem] font-[Pretendard]">
                {new Date(createdAt).toLocaleTimeString('ko-KR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <button
                onClick={handleLikeBtnClick}
                className="flex gap-[4px] text-[0.625rem] mr-[4px]"
              >
                <img
                  src={like ? clickedLikeButton : likeButton}
                  alt="좋아요 아이콘"
                  width={15}
                />
                {likeCount}
              </button>
              <div className="flex gap-[4px] text-[0.625rem] mr-[4px]">
                <img src={commentButton} alt="코멘트 아이콘" width={15} />
                {commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedItem;
