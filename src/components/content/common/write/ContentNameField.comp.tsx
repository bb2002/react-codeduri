import React from 'react';
import {Input} from "antd";
import TextArea from "antd/es/input/TextArea";

interface ContentNameFieldCompProps {
    titleHeader: string
    contentHeader: string
    onTitleChanged: (value: string) => void
    onContentChanged: (value: string) => void
    title: string
    content: string
}

const ContentNameFieldComp = ({ titleHeader, contentHeader, onTitleChanged, onContentChanged, title, content }: ContentNameFieldCompProps) => {
    return (
        <div>
            <p style={{ marginBottom: 2 }}><b>{titleHeader}</b>(최대 30자)</p>
            <Input
                maxLength={30}
                onChange={(e) => { onTitleChanged(e.target.value) }}
                className="content-default-input-field"
                value={title}
            />

            <div style={{ marginTop: 32, marginBottom: 32 }} />

            <p style={{ marginBottom: 2 }}><b>{contentHeader}</b>(최대 100자)</p>
            <TextArea
                showCount
                maxLength={100}
                onChange={(e) => { onContentChanged(e.target.value) }}
                rows={4}
                value={content}
                className="content-default-input-field">
                {content}
            </TextArea>
        </div>
    );
};

export default ContentNameFieldComp;