// 코멘트 내용, 작성자 레벨, 작성자, 작성 시간, 프로필 이미지
// 작성자 이름 클릭 시, 프로필 상세 페이지로 이동 (팝업?)
// 코멘트 갯수
import { useState } from 'react';
import profileImg from '../../assets/common/profile.png';
import icon from '../../assets/icons/weight.png';

interface Comment {
  id: number;
  nickname: string;
  label: string;
  text: string;
}

const UserPost = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      nickname: '하이',
      label: 'Lv. 01',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 2,
      nickname: '바이',
      label: 'Lv. 03',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, consequuntur?',
    },
    {
      id: 3,
      nickname: 'React',
      label: 'Lv. 05',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, consequuntur?',
    },
    {
      id: 4,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 5,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 6,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 7,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 9,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
    {
      id: 9,
      nickname: 'Redux',
      label: 'Lv. 08',
      text: '클럽 땡기네 ㅋㅋ 헬스클럽',
    },
  ]);
  const [displayComments, setDisplayComments] = useState(3);

  const expandComments = () => {
    setDisplayComments(displayComments + 3);
  };

  const hideComments = () => {
    setDisplayComments(3);
  };

  return (
    // <PostFrame width={1100} height={550}>
    <div className="   p-4 flex flex-col items-center w-[900px] border border-solid border-black ">
      <div className="flex ">
        <div className=" border border-solid border-black py-2 flex flex-col items-center justify-center w-[200px]  ">
          <img src={profileImg} width={90} alt="profile pic" className="mb-2" />
          <span className="font-[Pretendard]">동훈</span>
          <div className="flex items-center justify-around w-[100px]">
            <img src={icon} alt="muscle icon" width={35} />
            <span className="font-[Pretendard]">Lv. 01</span>
          </div>
        </div>
        <div className="border border-solid border-black  flex flex-col items-center py-2 w-[600px] ">
          <p className="font-[Pretendard] p-6 font-semibold ">
            솔직히 3대 200도 못들면 헬스 접는게 맞음 ㄹㅇ ㅋㅋ 벤치 40에 스쾃 80
            데드 80만 들어도 3대 ㅋㅋ
          </p>
          <img
            width={150}
            src="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/1648545238/B.jpg?597000000"
            alt=""
          />
        </div>
      </div>
      <div>
        {comments.length > 3 && (
          <button
            onClick={expandComments}
            className="font-[Pretendard] ml-4 bg-white w-[200px]  rounded-xl text-xm"
          >
            View More Comments
          </button>
        )}

        {displayComments > 3 && (
          <button
            onClick={hideComments}
            className="font-[Pretendard] ml-4 bg-white w-[200px]  rounded-xl text-xm"
          >
            Hide Comments
          </button>
        )}
      </div>
      <div className="border border-solid border-black w-[800px] ">
        <div className="   flex flex-col justify-evenly  ">
          {comments.slice(0, displayComments).map((comment) => (
            <div className="flex items-center justify-start p-2 mb-1  text-xl mr-5 font-bold">
              <ul key={comment.id} className="">
                <li className="font-[Pretendard]">
                  {comment.nickname} ({comment.label}) : {comment.text}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>

    //     <span className="w-[180px]  text-xl mr-5 font-bold font-[Pretendard]">
    //     {comment.nickname}
    //   </span>
    //   <span className="font-[Pretendard]">{comment.text}</span>
    // </div>

    // </PostFrame>
  );
};

export default UserPost;
