import React, {useState} from 'react';
import {Button, Card, Input, PageHeader} from "antd";
import QuillEditor from "./QuillEditor";
import {CloudUploadOutlined} from "@ant-design/icons";
import FileUploader from "./FileUploader";
import {UploadFile} from "antd/es/upload/interface";

interface BoardEditor {
    title: string,          // 제목 State
    content: string,        // 내용 State
    files: UploadFile[]         // 업로드 된 파일
    header: string          // Header
    subHeader: string       // SubHeader
    loading: boolean
    onTitleChanged: (title: string) => void
    onContentChanged: (content: string) => void
    onFileChanged: (files: UploadFile[]) => void
    onSubmitPressed: () => void
    onGoBack?: () => void
}

const BoardWriter = ({ title, content, files, header, subHeader, loading, onTitleChanged, onContentChanged, onFileChanged, onSubmitPressed, onGoBack }: BoardEditor) => {
    const [uploading, setUploading] = useState(false)

    const onUploadStateChanged = (uploading: boolean) => {
        setUploading(uploading)
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                style={{ marginBottom: 32 }}
                onBack={onGoBack}
                title={header}
                subTitle={subHeader}
            />

            <Card bodyStyle={{ padding: 8 }}>
                <Input
                    id="board-writer-title"
                    placeholder="제목을 입력해주세요."
                    size="large"
                    value={title}
                    onChange={(value) => onTitleChanged(value.target.value)}
                />
            </Card>

            <br />
            <QuillEditor
                onChange={(content: string) => onContentChanged(content)}
                value={content} />
            <div style={{ paddingTop: 32 }} />
            <FileUploader
                defaultFiles={files}
                onFileChanged={onFileChanged}
                onUploadStateChanged={onUploadStateChanged} />

            <div style={{ marginTop: 16 }}>
                {
                    uploading ? (
                        <Button
                            type="primary"
                            style={{ width: "100%", maxWidth: 300, float: "right" }}
                            onClick={onSubmitPressed}
                            disabled={uploading}><CloudUploadOutlined /> 파일 처리중...</Button>
                    ) : (
                        <Button
                            type="primary"
                            style={{ width: "100%", maxWidth: 300, float: "right" }}
                            onClick={onSubmitPressed}
                            loading={loading}><CloudUploadOutlined /> 개시</Button>
                    )
                }

            </div>
        </div>
    );
};

BoardWriter.defaultProps = {
    files: []
}

export default BoardWriter;