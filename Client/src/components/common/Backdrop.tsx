interface Props {
  children?: React.ReactNode;
}
const Backdrop = ({ children }: Props) => {
  return (
    <div className="top-0 left-0 fixed w-screen h-screen bg-[rgba(0,0,0,.5)] flex justify-center items-center">
      {children}
    </div>
  );
};

export default Backdrop;
