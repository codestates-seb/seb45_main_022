import { useRef } from 'react';

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagEditor = ({ tags, setTags }: Props) => {
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-[430px] h-fit bg-[#f2b888] rounded-[8px] flex flex-col justify-evenly items-start gap-[4px] p-[8px] font-[Pretendard] ">
      <div className="flex flex-row flex-wrap gap-[8px]">
        {tags.map((tag, index) => (
          <div
            key={index}
            onClick={() => {
              setTags(tags.filter((t) => t !== tag));
            }}
            className="h-[30px] bg-[#f8d8ae] font-bold rounded-[6px] flex justify-center items-center p-[4px] w-fit hover:scale-105 hover:brightness-110 duration-300 cursor-pointer"
          >
            {tag}
            <span className="text-[#666] pl-[4px]">ｘ</span>
          </div>
        ))}
      </div>
      {tags.length < 5 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!tagInputRef.current?.value) return;
            setTags([...tags, tagInputRef.current?.value]);
            tagInputRef.current.value = '';
          }}
        >
          <input
            ref={tagInputRef}
            size={30}
            maxLength={8}
            placeholder="태그를 입력해주세요. (최대 8자, 5개)"
            className="w-fit h-[30px] bg-transparent outline-none"
            type="text"
          />
        </form>
      )}
    </div>
  );
};

export default TagEditor;
