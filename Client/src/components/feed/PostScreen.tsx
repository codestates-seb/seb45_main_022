import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { Link, Navigate, useParams } from 'react-router-dom';
import FeedEditor from './FeedEditor';
import { useState } from 'react';
import TagEditor from './TagEditor';
import useFeedPostMutation from '../../hooks/useFeedPostMutation';
import LoadingBar from '../common/LoadingBar';
import { useQueryClient } from '@tanstack/react-query';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const { mutate: postFeed, isLoading, isSuccess } = useFeedPostMutation();

  const handlePost = () => {
    if (body === '' || data === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    postFeed({ body, data, tags, categoryCode });
  };

  if (isSuccess) {
    queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
    return <Navigate to={`/feed/${categoryCode}`} />;
  }

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-[12px]">
        {isLoading ? (
          <LoadingBar />
        ) : (
          <div className="w-[580px] h-[755px] bg-[url('/src/assets/common/modal-frame-post.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center pl-[40px] gap-[16px]">
            <div className="w-[430px] h-[500px]">
              <FeedEditor
                onEditorChange={(body, data) => {
                  setBody(body || '');
                  setData(data || '');
                }}
              />
            </div>
            <div className="w-[430px]">
              <TagEditor tags={tags} setTags={setTags} />
            </div>
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
