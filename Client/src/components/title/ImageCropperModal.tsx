import { useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';

interface Props {
  onCloseBtnClick: () => void;
}

const ImageCropperModal = ({ onCloseBtnClick }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  // 유저가 첨부한 이미지
  const [inputImage, setInputImage] = useState('');
  // 유저가 선택한 영역만큼 크롭된 이미지
  const [croppedImage, setCroppedImage] = useState('');

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper?.getCroppedCanvas().toDataURL() || '');
  };

  return (
    <Backdrop>
      <div className="w-[600px] h-[600px] bg-white p-5 overflow-scroll">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setInputImage(
              e.target.files ? URL.createObjectURL(e.target.files[0]) : '',
            )
          }
        />
        <Cropper
          src={inputImage}
          crop={onCrop}
          ref={cropperRef}
          viewMode={1}
          aspectRatio={1}
          style={{ height: 400, width: 400 }}
        />
        <img src={croppedImage} />
        <Button size="medium" onClick={onCloseBtnClick}>
          Close
        </Button>
      </div>
    </Backdrop>
  );
};

export default ImageCropperModal;
