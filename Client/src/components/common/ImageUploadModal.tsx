import { useRef, useState, useEffect } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Backdrop from './Backdrop';
import Button from './Button';

interface Props {
  onCloseBtnClick: () => void;
  onConfirmBtnClick: (encodedImage: string) => void;
}

type StepType = 'upload' | 'crop' | 'preview';

const ImageUploadModal = ({ onCloseBtnClick, onConfirmBtnClick }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [step, setStep] = useState<StepType>('upload');
  const [inputImageURL, setInputImageURL] = useState('');
  const [encodedCroppedImage, setEncodedCroppedImage] = useState('');

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setEncodedCroppedImage(cropper?.getCroppedCanvas().toDataURL() || '');
  };

  useEffect(() => {
    if (inputImageURL !== '') {
      setStep('crop');
    }
  }, [inputImageURL]);

  return (
    <Backdrop>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
        <div className="w-[450px] h-[600px] bg-[url('/src/assets/common/modal-frame-cropper.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
          <div className="flex flex-col h-[400px] justify-between items-center">
            {step === 'upload' && (
              <>
                <div className="w-[260px] h-[260px] bg-[url('/src/assets/common/no-image.png')] bg-no-repeat bg-cover p-[15px] shadow-[0_0_10px_#000]"></div>
                <form className="w-fit h-fit">
                  <label className="w-fit h-fit" htmlFor="image-input">
                    <div className="w-[200px] h-[50px] bg-[#cbb393] flex justify-center items-center p-[10px] text-[.8rem] cursor-pointer rounded-md hover:brightness-110 duration-150 shadow-[0_0_3px_#000]">
                      Upload Image
                    </div>
                  </label>
                  <input
                    id="image-input"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setInputImageURL(
                        e.target.files
                          ? URL.createObjectURL(e.target.files[0])
                          : '',
                      );
                    }}
                  />
                </form>
              </>
            )}
            {step === 'crop' && (
              <>
                <div className="w-[260px] h-[260px] bg-[url('/src/assets/common/loading-image.png')] bg-no-repeat bg-cover p-[15px] shadow-[0_0_10px_#000]">
                  <Cropper
                    src={inputImageURL}
                    crop={onCrop}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    aspectRatio={1}
                    style={{ height: 230, width: 230 }}
                  />
                </div>
                <div className="w-full flex flex-row justify-evenly">
                  <div
                    className="w-[100px] h-[50px] bg-[#cbb393] flex justify-center items-center p-[10px] text-[.8rem] cursor-pointer rounded-md hover:brightness-110 duration-150 shadow-[0_0_3px_#000]"
                    onClick={() => {
                      setInputImageURL('');
                      setStep('upload');
                    }}
                  >
                    Back
                  </div>
                  <div
                    className="w-[100px] h-[50px] bg-[#cbb393] flex justify-center items-center p-[10px] text-[.8rem] cursor-pointer rounded-md hover:brightness-110 duration-150 shadow-[0_0_3px_#000]"
                    onClick={() => {
                      setStep('preview');
                    }}
                  >
                    Next
                  </div>
                </div>
              </>
            )}
            {step === 'preview' && (
              <>
                <img
                  className="w-[260px] h-[260px] rounded-md"
                  src={encodedCroppedImage}
                />
                <div className="w-full flex flex-row justify-evenly">
                  <div
                    className="w-[100px] h-[50px] bg-[#cbb393] flex justify-center items-center p-[10px] text-[.8rem] cursor-pointer rounded-md hover:brightness-110 duration-150 shadow-[0_0_3px_#000]"
                    onClick={() => setStep('crop')}
                  >
                    Back
                  </div>
                  <div
                    className="w-[100px] h-[50px] bg-[#cbb393] flex justify-center items-center p-[10px] text-[.8rem] cursor-pointer rounded-md hover:brightness-110 duration-150 shadow-[0_0_3px_#000]"
                    onClick={async () => {
                      onConfirmBtnClick(encodedCroppedImage);
                    }}
                  >
                    Confirm
                  </div>
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
