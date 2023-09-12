// import { useState } from 'react';
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FeedEditor.css';
import ImageUploadModal from '../common/ImageUploadModal';
import { uploadImage } from '../../api/post';

interface Props {
  onEditorChange: (body?: string, data?: string) => void;
}

const FeedEditor = ({ onEditorChange }: Props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const toolbarOptions = useMemo(() => {
    return {
      container: [
        [{ size: ['normal', 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: ['', 'center', 'right', 'justify'] }],
        ['link', 'image'],
      ],
      handlers: {
        image: () => {
          setShowImageModal(true);
        },
      },
    };
  }, []);

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        onChange={() => {
          onEditorChange(
            quillRef.current?.getEditor().getText(),
            quillRef.current?.getEditorContents() as string,
          );
        }}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
      {showImageModal && (
        <ImageUploadModal
          onCloseBtnClick={() => {
            setShowImageModal(false);
          }}
          onConfirmBtnClick={async (encodedImage) => {
            if (encodedImage) {
              let imageURL;
              try {
                imageURL = await uploadImage(encodedImage);
              } catch (error) {
                alert('이미지 업로드에 실패했습니다.');
                return;
              }

              const quill = quillRef.current?.getEditor();
              const rangeIndex = quill?.getSelection(true)?.index || 0; // 에디터 커서 위치
              const nextIndex = rangeIndex + 1;
              quill?.insertEmbed(rangeIndex, 'image', imageURL); // 이미지 삽입
              quill?.formatText(rangeIndex, nextIndex, {
                width: '300px',
                height: '300px',
              });
              quill?.setSelection(nextIndex, 0); // 커서 위치 조정
            }
            setShowImageModal(false);
          }}
        />
      )}
    </div>
  );
};

export default FeedEditor;
