import Button from '../common/Button';

const ChangePwTab = () => {
  return (
    <form className="w-full h-full flex flex-col justify-evenly items-center">
      <input
        placeholder="New Password"
        type="password"
        className="text-sm border-solid border-2 p-2 rounded-lg"
      />
      <input
        placeholder="Confirm New Password"
        type="password"
        className="text-sm border-solid border-2 p-2 rounded-lg"
      />
      <Button size="medium">Change</Button>
    </form>
  );
};

export default ChangePwTab;
