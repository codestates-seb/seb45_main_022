import { useState } from 'react';
import profileImg from '../../assets/common/profile.png';
import icon from '../../assets/icons/status-strength.png';
import Comments from './Comments';
import { getPostInfo } from '../../api/post';
import { useQuery } from 'react-query';
import PostFrame from '../common/PostFrame';

interface Comment {
  id: number;
  profileImg: string;
  nickname: string;
  label: string;
  text: string;
  timeCreated: string;
}

const UserPost = ({ handleCloseScreen, handleLikePost, likeCount }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      profileImg: profileImg,
      nickname: '하이',
      label: 'Lv. 01',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '1H',
    },
    {
      id: 2,
      profileImg: profileImg,
      nickname: '바이',
      label: 'Lv. 03',
      text: 'Lorem ipsum dolor sit, psum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturpsum dolor sit, amet cons ectetur adipisicing el ecteturamet cons ectetur adipisicing el ectetur adipisicing elit. Iusto, consequuntur?',
      timeCreated: '5H',
    },
    {
      id: 3,
      profileImg: profileImg,
      nickname: 'React',
      label: 'Lv. 05',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, consequuntur?',
      timeCreated: '1M',
    },
    {
      id: 4,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '5M',
    },
    {
      id: 5,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '2D',
    },
    {
      id: 6,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '3D',
    },
    {
      id: 7,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '12H',
    },
    {
      id: 9,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '5h',
    },
    {
      id: 9,
      profileImg: profileImg,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
      timeCreated: '1D',
    },
  ]);

  const [displayComments, setDisplayComments] = useState(3);
  const [addComment, setAddComment] = useState('');

  const expandComments = () => {
    setDisplayComments(displayComments + 3);
  };

  const hideComments = () => {
    setDisplayComments(3);
  };

  // 게시글 컴포넌트 클릭했을 때는 닫힘하지 않기
  const handleContainerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  // 명세서 나오면 추가 예정
  // const { isLoading, data: userPost } = useQuery(['postInfo'], getPostInfo);
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div
      onClick={handleCloseScreen}
      className=" overflow-y-scroll z-2 fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] "
    >
      <div
        onClick={handleContainerClick}
        className=" bg-white relative top-10 right-0 bottom-10 left-0 mx-auto p-4 flex flex-col items-center w-[800px] rounded-xl border-[20px] border-solid border-[#444657]"
      >
        <button
          onClick={handleCloseScreen}
          className="absolute top-4 right-4 text-3xl "
        >
          X
        </button>
        <div className="flex  p-6 ">
          <div className="  px-4 flex flex-col items-center border-r border-solid border-gray-400">
            <img
              src={profileImg}
              width={90}
              alt="profile pic"
              className="mb-2"
            />
            <span className="font-[Pretendard]">동훈</span>
            <div className="flex items-center justify-around w-[100px]">
              <img src={icon} alt="muscle icon" width={35} />
              <span className="font-[Pretendard]">Lv. 01</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center  py-2 w-[500px]">
            <p className="font-[Pretendard] p-6 font-semibold overflow-hidden overflow-ellipsis">
              솔직히 3대 200도 못들면 헬스 접는게 맞음 ㄹㅇ ㅋㅋ 벤치 40에 스쾃
              80 데드 80만 들어도 3대 ㅋㅋ 솔직히 3대 200도 못들면 헬스 접는게
              맞음 ㄹㅇ ㅋㅋ 벤치 40에 스쾃 80 데드 80만 들어도 3대 ㅋㅋ
            </p>
            <img
              width={150}
              src="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/1648545238/B.jpg?597000000"
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-solid border-gray-400 w-full">
          <div>
            <span className="border border-solid bg-yellow-700 text-white text-sm font-semibold  rounded-xl p-3">
              Total Comments
            </span>
            <span className="ml-4 text-m text-gray-500 font-semibold">
              {comments.length}
            </span>
          </div>
          <div>
            <button
              onClick={handleLikePost}
              className="hover:brightness-110 duration-300 rounded-xl text-white bg-green-500 font-semibold p-2"
            >
              Like Post
            </button>
            <span className="ml-4 text-m text-gray-500 font-semibold">
              {likeCount}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center  border-b border-solid border-gray-400 w-full py-4">
          <input
            type="search"
            onChange={(e) => setAddComment(e.target.value)}
            value={addComment}
            className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[400px]"
          />
          <button className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white py-2 px-3 text-sm font-semibold ml-4 w-[200px] rounded-xl">
            Add a comment
          </button>
        </div>

        <div className="max-w-[800px] w-full">
          <div className="flex flex-col justify-evenly">
            {comments.slice(0, displayComments).map((comment) => (
              <Comments
                key={comment.id}
                profileImg={comment.profileImg}
                nickname={comment.nickname}
                label={comment.label}
                text={comment.text}
                timeCreated={comment.timeCreated}
              />
            ))}
          </div>
        </div>
        <div className="mt-5">
          {comments.length > 3 && (
            <button
              onClick={expandComments}
              className=" hover:brightness-110 duration-300 cursor-pointer border border-solid bg-emerald-500 text-white p-3 font-semibold text-sm ml-4 rounded-xl"
            >
              View More Comments
            </button>
          )}

          {displayComments > 3 && (
            <button
              onClick={hideComments}
              className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-red-400 text-white p-3 font-semibold text-sm ml-4 rounded-xl"
            >
              Hide Comments
            </button>
          )}
        </div>
      </div>
    </div>

    //     <span className="w-[180px]  text-xl mr-5 font-bold font-[Pretendard]">
    //     {comment.nickname}
    //   </span>
    //   <span className="font-[Pretendard]">{comment.text}</span>
    // </div>
  );
};

export default UserPost;
