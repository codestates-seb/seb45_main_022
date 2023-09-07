import { useRef, useState, useEffect } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Backdrop from './Backdrop';
import Button from './Button';

interface Props {
  onCloseBtnClick: () => void;
  onConfirmBtnClick: (imageURL?: string) => void;
}

type StepType = 'upload' | 'crop' | 'preview';

const ImageUploadModal = ({ onCloseBtnClick, onConfirmBtnClick }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [step, setStep] = useState<StepType>('upload');
  const [inputImage, setInputImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper?.getCroppedCanvas().toDataURL() || '');
  };

  useEffect(() => {
    if (inputImage !== '') {
      setStep('crop');
    }
  }, [inputImage]);

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
        <div className="w-[450px] h-[600px] bg-[url('/src/assets/common/modal-frame-cropper.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
          <div className="flex flex-col h-[400px] justify-between items-center">
            {step === 'upload' && (
              <>
                <div className="w-[260px] h-[260px] bg-[url('/src/assets/common/no-image.png')] bg-no-repeat bg-cover p-[15px] shadow-[0_0_10px_#000]"></div>
                <form className="w-fit h-fit">
                  <label className="w-fit h-fit block" htmlFor="image-input">
                    <Button size="large">Upload Image</Button>
                  </label>
                  <input
                    id="image-input"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setInputImage(
                        e.target.files
                          ? URL.createObjectURL(e.target.files[0])
                          : '',
                      )
                    }
                  />
                </form>
              </>
            )}
            {step === 'crop' && (
              <>
                <div className="w-[260px] h-[260px] bg-[url('/src/assets/common/loading-image.png')] bg-no-repeat bg-cover p-[15px] shadow-[0_0_10px_#000]">
                  <Cropper
                    src={inputImage}
                    crop={onCrop}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    aspectRatio={1}
                    style={{ height: 230, width: 230 }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setInputImage('');
                      setStep('upload');
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('preview');
                    }}
                    size="large"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 'preview' && (
              <>
                <img
                  className="w-[260px] h-[260px] rounded-md"
                  src={croppedImage}
                />
                <div className="flex flex-col gap-3">
                  <Button onClick={() => setStep('crop')}>Back</Button>
                  <Button
                    onClick={() => {
                      onConfirmBtnClick(croppedImage);
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <Button onClick={onCloseBtnClick}>Cancel</Button>
      </div>
    </Backdrop>
  );
};

export default ImageUploadModal;
