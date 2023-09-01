// 이메일 포멧
const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
// 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

//한글 또는 영어, 2-6길이
const nicknameRegex = /^[가-힣a-zA-Z]{2,6}$/;


export const validateEmail = (email: string, setEmailErr: (value: boolean) => void) => {
    if (!emailRegEx.test(email)) {
        setEmailErr(true);
    } else {
        setEmailErr(false);
    }
};

export const validatePass = (password: string, setPasswordErr: (value: boolean) => void) => {
    if (!passwordRegex.test(password)) {
        setPasswordErr(true);
    } else {
        setPasswordErr(false);
    }
};

export const validateNickname = (nickname: string, setNicknameErr: (value: boolean) => void) => {
    if (!nicknameRegex.test(nickname)) {
        setNicknameErr(true);
    } else {
        setNicknameErr(false);
    }
};