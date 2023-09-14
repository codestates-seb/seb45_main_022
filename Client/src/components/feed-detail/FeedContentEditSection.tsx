import { useState } from 'react';
import FeedEditor from '../feed/FeedEditor';
// import TagEditor from '../feed/TagEditor';
import { FeedDetail } from '../../api/feed';
import usePatchFeedMutation from '../../hooks/usePatchFeedMutation';
import { CategoryCode } from '../../api/category';

interface Props {
  categoryCode: CategoryCode;
  feedDetail: FeedDetail;
  finishEditing: () => void;
}

const FeedContentEditSection = ({
  categoryCode,
  feedDetail,
  finishEditing,
}: Props) => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  // const [tags, setTags] = useState<string[]>([]);

  // useEffect(() => {
  //   setTags(feedDetail.feedHashTags.map((tag) => tag.body));
  // }, [feedDetail]);

  const { mutate: patchFeed } = usePatchFeedMutation({
    categoryCode,
    feedId: feedDetail.feedId,
    onPatchFeedSuccess: finishEditing,
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
