import useFeedDetailQuery from '../../hooks/useFeedDetailQuery';
import { CategoryCode } from '../../api/category';
import { Link, useParams } from 'react-router-dom';
import LoadingBar from '../common/LoadingBar';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import CommentSection from './CommentSection';
import UserInfoSection from './UserInfoSection';
import FeedContentSection from './FeedContentSection';

const UserPost = () => {
  const { categoryCodeParam, feedIdParam } = useParams();
  const categoryCode = Number(categoryCodeParam) as CategoryCode;
  const feedId = Number(feedIdParam);

  const {
    data: feedDetail,
    isLoading,
    isFetching,
  } = useFeedDetailQuery(feedId);

  if (isLoading || isFetching) return <LoadingBar />;

  if (!feedDetail) return null;

  return (
    <Backdrop>
      <div className="flex flex-col justify-center items-center gap-[20px]">
        <div className="bg-white flex flex-row justify-between w-[1200px] h-[600px] rounded-2xl overflow-hidden">
          <UserInfoSection
            feedDetail={feedDetail}
            categoryCode={categoryCode}
          />
          <FeedContentSection
            feedDetail={feedDetail}
            categoryCode={categoryCode}
          />
          <CommentSection
            comments={feedDetail.comments}
            categoryCode={categoryCode}
            feedId={feedId}
          />
        </div>
        <Link to="..">
          <Button>Close</Button>
        </Link>
      </div>
    </Backdrop>
  );
};

export default UserPost;
