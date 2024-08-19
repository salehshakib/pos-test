/* eslint-disable no-unused-vars */
import { Form } from "antd";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { GlobalUtilityStyle } from "../../../container/Styled";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Font,
  FontSizeUI,
  Heading,
  Highlight,
  HtmlEmbed,
  Image,
  Italic,
  Link,
  List,
  Markdown,
  Mention,
  Paragraph,
  SourceEditing,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const Ckeditor = ({ value, onChange, name, required, label, initialData }) => {
  const [editor, setEditor] = useState("");

  //   const hangleChange = (content, editor) => {
  //     console.log(content);
  //     console.log(editor);
  //     const data = editor.getData();
  //     setEditor(data);

  //     console.log(data);
  //   };

  //   useImperativeHandle(ref, () => ({
  //     // Add this to expose the function
  //     getEditorData: () => editor,
  //   }));

  return (
    <GlobalUtilityStyle>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required, message: `Please input ${label}!` }]}
        getValueFromEvent={(content, editor) => editor.getData()}
      >
        <CKEditor
          editor={ClassicEditor}
          //   data={editor}
          //   onChange={hangleChange}
          config={{
            menuBar: {
              isVisible: true,
              removeItems: ["insert"],
            },
            toolbar: {
              items: [
                "heading",
                "|",
                "bold",
                "italic",
                "fontSize",
                "fontFamily",
                "|",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "|",
                "undo",
                "redo",
              ],
            },
            plugins: [
              Heading,
              Bold,
              Essentials,
              Italic,
              Mention,
              Paragraph,
              Undo,
              Font,
              FontSizeUI,
              Link,
              List,
              BlockQuote,
              Highlight,
              HtmlEmbed,
              Image,
              Markdown,
              SourceEditing,
              Table,
            ],

            initialData,
          }}
        />
      </Form.Item>
    </GlobalUtilityStyle>
  );
};

export default Ckeditor;
