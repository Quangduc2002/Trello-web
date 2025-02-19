import { useMemo } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Size = Quill.import('attributors/style/size');

Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];
Quill.register(Size, true);

function FormEditor({ value, onChange }: any) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          [{ size: Size.whitelist }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link'],
          ['clean'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ],
      },
    }),
    [],
  );

  const formats = [
    'header',
    'size',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'align',
    'float',
    'alt',
    'height',
    'width',
    'style',
  ];

  const onChangeVaule = (values: any) => {
    const val = values === '<p><br></p>' ? '' : values;
    onChange(val);
  };

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme='snow'
      value={value}
      onChange={onChangeVaule}
    />
  );
}

export default FormEditor;
