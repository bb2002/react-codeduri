import React from 'react';
import AceEditor from "react-ace";
import {Language} from "../../libraries/config/SupportLanguage";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-monokai"

interface CodeEditorProps {
    mode: Language
    value: string
    onValueChanged: (value: string) => void
    width: string
    height: string
    readonly: boolean
}

const CodeEditor = ({ mode, value, onValueChanged, width, height, readonly }: CodeEditorProps) => {
    return (
        <AceEditor
            readOnly={readonly}
            mode={function() {
                switch(mode) {
                    case Language.C: case Language.CPP: return "c_cpp"
                    case Language.PYTHON3:  return "python"
                    case Language.JAVA: return "java"
                }
            }()}
            theme="monokai"
            value={value}
            onChange={(value: string) => onValueChanged(value)}
            width={width}
            height={height}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4
            }}
        />
    )
};

CodeEditor.defaultProps = {
    readonly: false
}

export default CodeEditor;