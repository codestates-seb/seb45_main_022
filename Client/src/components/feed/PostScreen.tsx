import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { Link, useParams } from 'react-router-dom';
import FeedEditor from './FeedEditor';
import { useState } from 'react';
import TagEditor from './TagEditor';
import usePostFeedMutation from '../../hooks/usePostFeedMutation';
import LoadingBar from '../common/LoadingBar';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const { mutate: postFeed, isLoading } = usePostFeedMutation(categoryCode);

  const handlePost = () => {
    if (body === '' || data === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    postFeed({ body, data, tags, categoryCode });
  };

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-[12px]">
        {isLoading ? (
          <LoadingBar />
        ) : (
          <div className="w-[580px] h-[755px] bg-[url('/src/assets/common/modal-frame-post.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center pl-[40px] gap-[16px]">
            <FeedEditor
              onEditorChange={(body, data) => {
                setBody(body || '');
                setData(data || '');
              }}
            />
            <TagEditor tags={tags} setTags={setTags} />
            <div className="flex flex-row gap-[28px]">
              <Button onClick={handlePost}>Post</Button>
              <Link to={`/feed/${categoryCode}`}>
                <Button>Cancel</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Backdrop>
  );
};

export default PostScreen;
