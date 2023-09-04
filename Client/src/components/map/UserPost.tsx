// 코멘트 내용, 작성자 레벨, 작성자, 작성 시간, 프로필 이미지
// 작성자 이름 클릭 시, 프로필 상세 페이지로 이동 (팝업?)
// 코멘트 갯수
import { useState } from 'react';
import profileImg from '../../assets/common/profile.png';
import icon from '../../assets/icons/weight.png';

interface Comment {
  id: number;
  nickname: string;
  text: string;
}

const UserPost = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, nickname: '하이', text: '클럽 땡기네 ㅋㅋ 헬스클럽' },
    { id: 2, nickname: '흑룡', text: '나 3대 500임' },
    {
      id: 3,
      nickname: '흑룡',
      text: '나 3대 500임 Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ratione ipsum et placeat inventore ut excepturi amet quia minima reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, recusandae incidunt? Doloremque voluptatum consequatur ab aliquam. Illo inventore adipisci odio',
    },
  ]);

  return (
    // <PostFrame width={1100} height={550}>
    <div className="p-4 flex flex-col items-center w-[900px] h-[700px] bg-[rgba(0,0,0,0.2)] border-4">
      <div className="flex bg-[#cbcbe6] ">
        <div className=" border-r-2 py-2 flex flex-col items-center justify-center w-[200px] h-[300px]  ">
          <img src={profileImg} width={90} alt="profile pic" className="mb-2" />
          <span className="font-[Pretendard]">동훈</span>
          <div className="flex items-center justify-around w-[100px]">
            <img src={icon} alt="muscle icon" width={35} />
            <span className="font-[Pretendard]">Lv. 01</span>
          </div>
        </div>
        <div className="flex flex-col items-center py-2 w-[600px] ">
          <p className="p-6 font-[Pretendard] font-semibold ">
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
      <div className="bg-[#90aa90] h-[280px]  w-[800px]  p-4">
        <div className="   flex flex-col justify-evenly  ">
          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className=" h-[35px] mb-1">
                <span className="w-[180px]  text-xl mr-5 font-bold font-[Pretendard]">
                  {comment.nickname}
                </span>
                <span className="font-[Pretendard]">{comment.text}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="flex item-center m-auto">
        <input
          type="text"
          className="font-[Pretendard] rounded-xl mt-1 w-[400px] h-[40px] border-2 "
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="font-[Pretendard] ml-4 bg-white w-[0px] rounded-xl text-xm">
          Submit
        </button>
      </div>
    </div>

    // </PostFrame>
  );
};

export default UserPost;
