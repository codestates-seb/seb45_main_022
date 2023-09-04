// 코멘트 내용, 작성자 레벨, 작성자, 작성 시간, 프로필 이미지
// 작성자 이름 클릭 시, 프로필 상세 페이지로 이동 (팝업?)
// 코멘트 갯수
import profileImg from '../../assets/common/profile.png';

import PostFrame from '../common/PostFrame';

const UserPost = () => {
  return (
    // <PostFrame width={1100} height={550}>
    <div className="flex flex-col items-center justify-around w-[900px] h-[700px] bg-black">
      <div className="flex">
        <div className="  py-2 flex flex-col items-center w-[200px] h-[300px] bg-amber-500">
          <img src={profileImg} width={90} alt="profile pic" />
          <span>동훈</span>
        </div>
        <div className="flex flex-col items-center py-2 w-[600px] bg-slate-400 text-[12px]">
          <img
            width={150}
            src="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/1648545238/B.jpg?597000000"
            alt=""
          />
          <p className="font-sm p-6 font-[Pretendard]">
            솔직히 3대 200도 못들면 헬스 접는게 맞음 ㄹㅇ ㅋㅋ 벤치 40에 스쾃 80
            데드 80만 들어도 3대 ㅋㅋ
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col  bg-slate-500  w-[800px] h-[350px] ">
          <div className="flex flex-col   p-2 m">
            <div className="  text-[13px] mb-1 ">
              <p className=" text-xl mr-1 font-bold font-[Pretendard]">
                하이 (Level 2)
              </p>
              <p className=" font-[Pretendard]">클럽 땡기네 ㅋㅋ 헬스클럽</p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                흑용 (Level 3):
              </p>
              <p className=" font-[Pretendard]">
                클럽 땡기네 ㅋㅋ 크리스마스날 저랑 헬스장 가실 분? pre-workout
                음료 잘 타드립니다
              </p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                보조 (Level 1):
              </p>
              <p className=" font-[Pretendard]">
                저 보조 잘합니다 흑용님~ 같이 하시죠. 보조만 잘합니다 ^^
              </p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                덤밸 (Level 1):
              </p>
              <p className=" font-[Pretendard]">프리웨이트만 합니다. 머신 X.</p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                계란 (Level 7):
              </p>
              <p className=" font-[Pretendard]">🏋️‍♀️</p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                동훈 (Level 22):
              </p>
              <p className=" font-[Pretendard]">🧸</p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                성일 (Level 22):
              </p>
              <p className=" font-[Pretendard]">하이</p>
            </div>
            <div className="  text-[13px] mb-1 ">
              <p className="w-[100px] mr-1 font-bold font-[Pretendard]">
                동훈 (Level 22):
              </p>
              <p className=" font-[Pretendard]">🧸</p>
            </div>

            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    // </PostFrame>
  );
};

export default UserPost;
