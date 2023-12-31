import { FeedDetail, deleteFeed } from '../../api/feed';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';
import useLikeMutation from '../../hooks/useLikeMutation';
import { FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryCode } from '../../api/category';
import likeButton from '../../assets/feed/likeButton.png';
import clickedLikeButton from '../../assets/feed/clickedLikeButton.png';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  feedDetail: FeedDetail;
  categoryCode: CategoryCode;
  onEditBtnClick: () => void;
}

const FeedContentSection = ({
  feedDetail,
  categoryCode,
  onEditBtnClick,
}: Props) => {
  console.log(feedDetail);

  const { feedId, nickname, data, feedHashTags, like, likeCount } = feedDetail;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: userInfo } = useUserInfoQuery();
  const {
    mutate: postLike,
    isSuccess,
    reset,
  } = useLikeMutation({
    feedId,
    categoryCode,
  });

  const isMyFeed = userInfo?.nickname === nickname;

  const handleDeleteBtnClick = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteFeed({ feedId });
        alert('삭제 완료');
        navigate(-1);
      } catch (error) {
        alert('삭제 실패');
      }
    }
  };

  const handleLikeBtnClick: FormEventHandler = () => {
    postLike();
  };

  if (isSuccess) {
    queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
    queryClient.invalidateQueries(['feedDetail', feedId]);
    reset();
  }

  return (
    <div className="w-[500px] h-[600px] bg-[#f1d4ae] flex flex-col justify-between">
      <div className="w-full h-[500px] flex flex-col items-center ">
        {/* 본문 */}
        <div className="w-full h-[420px] font-[Pretendard] text-m p-[20px] ">
          <div
            className="w-full h-full bg-[#fee1b8] p-[10px] rounded-xl overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
        {/* 해시태그 */}
        <div className="w-full fit-content px-[20px]">
          <div className="bg-[#fee1b8] w-full min-h-[50px] flex items-center justify-start flex-wrap gap-[10px] rounded-xl p-[10px]">
            {feedHashTags.length === 0 && (
              <span className="text-gray-500 font-semibold">No Tag</span>
            )}
            {feedHashTags.map((hashtag) => {
              return (
                <Link
                  to={`/feed/${categoryCode}/search/hashTag/${hashtag.body}`}
                  type="button"
                  key={hashtag.hashTagId}
                  className="h-[30px] bg-[#f8d8ae] text-[.8rem] font-[Pretendard] font-bold rounded-[6px] flex justify-center items-center p-[5px] w-fit hover:scale-105 hover:brightness-110 duration-300 cursor-pointer"
                >
                  # {hashtag.body}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="w-full h-[80px] flex flex-row justify-between items-center px-[20px]">
        <button
          className="w-[180px] h-[50px] flex flex-row justify-center items-center bg-[#fee1b8] rounded-xl hover:brightness-125 duration-300"
          type="button"
          onClick={handleLikeBtnClick}
        >
          <img src={like ? clickedLikeButton : likeButton} alt="likeButton" />
          <span className="ml-2 text-gray-500 font-semibold">
            Like! {likeCount}
          </span>
        </button>
        {isMyFeed && (
          <div className="flex flex-row gap-[10px]">
            <button
              onClick={onEditBtnClick}
              className="w-[60px] h-[50px] font-[Pretendard] text-[1.2rem] flex flex-row justify-center items-center bg-[#fee1b8] rounded-xl hover:brightness-125 duration-300"
              type="button"
            >
              <span className="text-gray-500 font-semibold">수정</span>
            </button>
            <button
              onClick={handleDeleteBtnClick}
              className="w-[60px] h-[50px] font-[Pretendard] text-[1.2rem] flex flex-row justify-center items-center bg-[#fee1b8] rounded-xl hover:brightness-125 duration-300"
              type="button"
            >
              <span className="text-gray-500 font-semibold">삭제</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedContentSection;
