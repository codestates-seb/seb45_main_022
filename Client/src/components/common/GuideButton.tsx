import { ButtonHTMLAttributes } from 'react';

const GuideButton = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      type="button"
      className="w-[50px] h-[50px] bg-[url('/src/assets/common/guide-button.png')] bg-cover bg-no-repeat bg-center animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer rounded-full shadow-[1px_1px_3px_#000]"
    ></button>
  );
};

export default GuideButton;
