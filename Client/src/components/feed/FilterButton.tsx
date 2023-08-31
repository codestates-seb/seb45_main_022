import ModalFrame from '../common/ModalFrame';

const FilterButton = () => {
  return (
    <div className=" flex justify-center items-center gap-3">
      <ModalFrame width={70} height={50}>
        최신순
      </ModalFrame>
      <ModalFrame width={70} height={50}>
        베스트
      </ModalFrame>
    </div>
  );
};

export default FilterButton;
