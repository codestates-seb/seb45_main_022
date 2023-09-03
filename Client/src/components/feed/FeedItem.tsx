import feedItem from '../../assets/feed/feedItem.png';

interface FeedItemProps {
  image: string;
  nickname: string;
  icon: string;
  level: number;
  uploadImage: string;
  content: string;
  timestamp: string;
  likeIcon: string;
  likeCount: number;
  commentIcon: string;
  commentCount: number;
}

const FeedItem: React.FC<FeedItemProps> = ({
  image,
  nickname,
  icon,
  level,
  uploadImage,
  content,
  timestamp,
  likeIcon,
  likeCount,
  commentIcon,
  commentCount,
}) => {
  const FeedBoard = {
    backgroundImage: `url(${feedItem})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="w-[295px] h-[137px]" style={FeedBoard}>
      <div className="w-full h-full p-7 flex">
        {/* 왼쪽 구간 (전체 너비 1/3) */}
        <div className="w-[70px] h-full flex flex-col justify-between items-start gap-1">
          <div className="w-[35px] h-[35px] mt-[3px] ml-[10px]">
            <img src={image} alt="profile" />
          </div>
          <div
            className="w-[45px] mt-1 ml-[6px] flex justify-center items-center"
            style={{
              fontFamily: 'Pretendard',
              fontSize: nickname.length > 3 ? '0.5rem' : '1rem',
            }}
          >
            {nickname}
          </div>
          <div className="w-full flex justify-start items-center gap-1 -mt-1">
            <div className=" w-[10px] ">
              <img src={icon} alt="아이콘" />
            </div>
            <div className="text-[0.1rem]">Lv {level}</div>
          </div>
        </div>

        {/* 오른쪽 구간 (전체 너비 2/3) */}
        {/* <div className="w-[66%] ">
          이미지
          <img src={uploadImage} alt="업로드 이미지" />
          
          이미지 위에 텍스트
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4">
            내용
            <div>{content}</div>
            
            생성일시
            <div>{timestamp}</div>
            
            좋아요 아이콘 및 개수
            <div>
              <img src={likeIcon} alt="좋아요 아이콘" />
              {likeCount}
            </div>
            
            코멘트 아이콘 및 개수
            <div>
              <img src={commentIcon} alt="코멘트 아이콘" />
              {commentCount}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FeedItem;
