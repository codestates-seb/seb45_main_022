interface Props {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const Button = ({ width = 200, height = 50, children }: Props) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="bg-[url('/src/assets/common/button.png')] bg-cover bg-no-repeat bg-center flex justify-center items-center hover:brightness-110 duration-300 cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Button;
