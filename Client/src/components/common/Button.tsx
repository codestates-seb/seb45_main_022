import { ButtonHTMLAttributes } from 'react';

const Button = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="bg-[url('/src/assets/common/button.png')] bg-cover bg-no-repeat bg-center flex justify-center items-center flex-wrap w-[200px] h-[50px] hover:brightness-110 duration-150 cursor-pointer text-center p-[8px]"
    >
      {rest.children}
    </button>
  );
};

export default Button;
