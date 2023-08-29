interface Props {
  title: string;
  numberOfPosts: string;
}

export const ServerList = ({ title, numberOfPosts }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 cursor-pointer">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-gray-600">{numberOfPosts}</div>
    </div>
  );
};
