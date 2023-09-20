import loading from '../../assets/common/loadinng.gif';

const LoadingBar = () => {
  return (
    <div className="flex items-center justify-center ">
      <img src={loading} alt="loading" width={260} />
    </div>
  );
};

export default LoadingBar;
