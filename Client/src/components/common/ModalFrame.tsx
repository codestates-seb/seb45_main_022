interface Props {
  width?: number;
  height?: number;
  opacity?: number;
  children?: React.ReactNode;
}

const ModalFrame = ({
  width = 500,
  height = 300,
  opacity = 0.9,
  children,
}: Props) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="flex justify-center items-center relative"
    >
      <div
        style={{
          opacity: opacity,
        }}
        className="w-full h-full absolute top-0 left-0 bg-[url('/src/assets/common/modal-frame.png')] bg-cover bg-no-repeat bg-center"
      ></div>
      <div className="z-10">{children}</div>
    </div>
  );
};

export default ModalFrame;
