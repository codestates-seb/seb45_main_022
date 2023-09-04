// 코멘트 내용, 작성자 레벨, 작성자, 작성 시간, 프로필 이미지
// 작성자 이름 클릭 시, 프로필 상세 페이지로 이동 (팝업?)
// 코멘트 갯수
import profileImg from '../../assets/common/profile.png';

import PostFrame from '../common/PostFrame';

const UserPost = () => {
  return (
    <PostFrame width={1000} height={500}>
      <div className="flex items-center justify-evenly">
        <div className="w-[10vw]">
          <img src={profileImg} width={90} alt="profile pic" />
        </div>
        <div className="w-[30vw]"></div>
        <div></div>
      </div>
    </PostFrame>
  );
};

export default UserPost;
