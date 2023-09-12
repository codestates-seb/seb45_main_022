import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { Link, useParams } from 'react-router-dom';
import FeedEditor from './FeedEditor';
import { useState } from 'react';
import TagEditor from './TagEditor';
import usePost from '../../hooks/usePost';
import LoadingBar from '../common/LoadingBar';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const { postMutation } = usePost(categoryCode);
  const { mutate: post, isLoading, isError } = postMutation;

  const handlePost = async () => {
    post({ body, data, tags, categoryCode });
  };

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (isError) {
    return <p>{isError.toString()}</p>;
  }

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-[12px]">
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
      </div>
    </Backdrop>
  );
};

export default PostScreen;
