// 이메일 포멧
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
// 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

//한글 또는 영어, 2-6길이
const nicknameRegex = /^[가-힣a-zA-Z]{2,6}$/;

export const validateEmail = (email: string) => {
  return emailRegEx.test(email);
};

export const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};

export const validateNickname = (nickname: string) => {
  return nicknameRegex.test(nickname);
};
