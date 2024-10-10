import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
  data: string;
  onChange: (data: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ data, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={{
        language: "fa",
      }}
      onChange={(event, editor) => {
        const content = editor.getData();
        onChange(content); // فراخوانی تابع تغییر محتوا
      }}
    />
  );
};

export default RichTextEditor;
