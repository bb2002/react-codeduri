import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

interface QuillEditorProps {
    useImageUploader: boolean
    onChange: (content: string) => void
    height: number
    value: string
}

const QuillEditor = ({ useImageUploader, onChange, height, value }: QuillEditorProps) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link',
        'align', 'color', 'background',
    ]

    return (
        <ReactQuill
            theme="snow"
            style={{ height: height, border: "none", marginBottom: 42 }}
            modules={modules}
            formats={formats}
            value={value || ""}
            onChange={(content, delta, source, editor) => onChange(editor.getHTML())}/>
    );
};

QuillEditor.defaultProps = {
    height: 600,
    useImageUploader: false
}

export default QuillEditor;