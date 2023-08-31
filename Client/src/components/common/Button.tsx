interface Props {
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ size = 'large', children, onClick }: Props) => {
  const width = {
    small: 120,
    medium: 160,
    large: 200,
  };
  const height = {
    small: 30,
    medium: 40,
    large: 50,
  };
  const fontSize = {
    small: '.6rem',
    medium: '.8rem',
    large: '1rem',
  };

  return (
    <div
      style={{
        width: `${width[size]}px`,
        height: `${height[size]}px`,
        fontSize: `${fontSize[size]}`,
      }}
      className="bg-[url('/src/assets/common/button.png')] bg-cover bg-no-repeat bg-center flex justify-center items-center hover:brightness-110 duration-300 cursor-pointer text-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
