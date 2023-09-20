import { useRef, useState } from 'react';
import Button from '../common/Button';
import { validatePassword } from '../../utils/validation';
import { changePassword } from '../../api/user';
import axios from 'axios';

const ChangePwTab = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    if (password === '' || confirmPassword === '') {
      setErrorMsg('Please enter your password.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMsg(
        '8-16 characters, lowercase & uppercase, numbers, and characters',
      );
      return;
    }
    try {
      const resData = await changePassword(password);
      if (resData === 'password patch success') {
        alert('Password change successful!');
        return;
      }
      alert('Password change failed.');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        if (
          error.response.data.message ===
          '현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.'
        ) {
          setErrorMsg('Please enter a different password');
          return;
        }
        if (
          error.response.data.message[0].reason ===
          '비밀번호는 특수문자, 영문자, 숫자를 포함한 8글자 이상 16글자 이하로 구성되어야 합니다.'
        ) {
          setErrorMsg(
            '8-16 characters, lowercase & uppercase, numbers, and characters',
          );
          return;
        }
      }
      setErrorMsg('Password change failed.');
    } finally {
      passwordRef.current!.value = '';
      confirmPasswordRef.current!.value = '';
    }
  };

  const resetErrorMsg = () => {
    setErrorMsg('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col justify-evenly items-center"
    >
      <p className="h-[20px] text-[10px] my-[4px] text-red-500 text-center">
        {errorMsg}
      </p>
      <input
        ref={passwordRef}
        placeholder="New Password"
        type="password"
        className="text-sm border-solid border-[2px] p-[8px] rounded-[8px]"
        onFocus={resetErrorMsg}
      />
      <input
        ref={confirmPasswordRef}
        placeholder="Confirm New Password"
        type="password"
        className="text-sm border-solid border-[2px] p-[8px] rounded-[8px]"
        onFocus={resetErrorMsg}
      />
      <Button>Change</Button>
    </form>
  );
};

export default ChangePwTab;
