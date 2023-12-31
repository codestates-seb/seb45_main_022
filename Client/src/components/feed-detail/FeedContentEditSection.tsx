import { useState } from 'react';
import FeedEditor from '../feed/FeedEditor';
// import TagEditor from '../feed/TagEditor';
import { FeedDetail } from '../../api/feed';
import useFeedPatchMutation from '../../hooks/useFeedPatchMutation';
import { CategoryCode } from '../../api/category';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  categoryCode: CategoryCode;
  feedDetail: FeedDetail;
  finishEditing: () => void;
}

const FeedContentEditSection = ({
  feedDetail,
  finishEditing,
  categoryCode,
}: Props) => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');

  const queryClient = useQueryClient();

  const { mutate: patchFeed, isSuccess } = useFeedPatchMutation({
    feedId: feedDetail.feedId,
  });

  const handleSaveBtnClick = async () => {
    if (body === '' || data === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    if (data === feedDetail.data) {
      alert('변경된 내용이 없습니다.');
      return;
    }
    patchFeed({ body, data });
  };

  if (isSuccess) {
    queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
    queryClient.invalidateQueries(['feedDetail', feedDetail.feedId]);
    finishEditing();
  }

  return (
    <div className="w-[500px] h-[600px] bg-[#f1d4ae] flex flex-col justify-evenly items-center">
      {/* 본문 에디터 */}
      <div className="w-[450px] h-[500px]">
        <FeedEditor
          onEditorChange={(body, data) => {
            setBody(body || '');
            setData(data || '');
          }}
          value={feedDetail.data}
        />
      </div>
      {/* 태그 에디터 */}
      {/* <div className="w-[450px]">
        <TagEditor tags={tags} setTags={setTags} />
      </div> */}
      {/* 버튼 */}
      <div className="w-full flex flex-row justify-center items-center gap-[10px]">
        <button
          onClick={handleSaveBtnClick}
          className="w-[60px] h-[50px] font-[Pretendard] text-[1.2rem] flex flex-row justify-center items-center bg-[#fee1b8] rounded-xl hover:brightness-125 duration-300"
          type="button"
        >
          <span className="text-gray-500 font-semibold">저장</span>
        </button>
        <button
          onClick={finishEditing}
          className="w-[60px] h-[50px] font-[Pretendard] text-[1.2rem] flex flex-row justify-center items-center bg-[#fee1b8] rounded-xl hover:brightness-125 duration-300"
          type="button"
        >
          <span className="text-gray-500 font-semibold">취소</span>
        </button>
      </div>
    </div>
  );
};

export default FeedContentEditSection;
