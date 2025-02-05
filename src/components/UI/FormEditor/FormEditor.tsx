import { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Size = Quill.import('attributors/style/size');

const fontSizeArr = [
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '32px',
  '42px',
  '48px',
  '54px',
  '68px',
  '84px',
  '98px',
];

Size.whitelist = fontSizeArr;
Quill.register(Size, true);

function FormEditor({ value, onChange }: any) {
  const Editor = useMemo(() => {
    return {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            [{ size: fontSizeArr }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          ],
        },

        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      },
      formats: [
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
      ],
    };
  }, []);

  const onChangeVaule = (values: any) => {
    const val = values === '<p><br></p>' ? '' : values;
    onChange(val);
  };

  return (
    <ReactQuill
      modules={Editor?.modules}
      formats={Editor?.formats}
      theme='snow'
      value={value}
      onChange={onChangeVaule}
    />
  );
}

export default FormEditor;
