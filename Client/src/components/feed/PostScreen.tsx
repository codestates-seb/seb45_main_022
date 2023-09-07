import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { Link, useParams } from 'react-router-dom';
import FeedEditor from './FeedEditor';
import { useState } from 'react';
import TagEditor from './TagEditor';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { categoryCodeParam } = useParams();

  const handlePost = () => {
    alert(`body: ${body}data: ${data}\ntags: ${tags}`);
  };

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-[580px] h-[755px] bg-[url('/src/assets/common/modal-frame-post.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center pl-[40px] gap-4">
          <FeedEditor
            onEditorBlur={(body, data) => {
              setBody(body || '');
              setData(data || '');
            }}
          />
          <TagEditor tags={tags} setTags={setTags} />
          <div className="flex flex-row gap-7">
            <Button onClick={handlePost}>Post</Button>
            <Link to={`/feed/${categoryCodeParam}`}>
              <Button>Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default PostScreen;
