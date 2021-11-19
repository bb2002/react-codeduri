import React, {CSSProperties} from 'react';
import { Upload } from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/lib/upload/interface";
import {FILE_UPLOAD_SERVER} from "../../libraries/config/AxiosConfig";
import {UploadFile} from "antd/es/upload/interface";

const { Dragger } = Upload;

interface FileUploaderProps {
    defaultFiles: UploadFile[]
    onFileChanged: (files: UploadFile[]) => void
    onUploadStateChanged: (uploading: boolean) => void
    style?: CSSProperties
}

const FileUploader = ({ defaultFiles, onFileChanged, onUploadStateChanged, style }: FileUploaderProps) => {
    const props = {
        name: 'file',
        multiple: true,
        action: FILE_UPLOAD_SERVER,
        onChange(info: UploadChangeParam) {
            let uploading = false
            for(let i of info.fileList) {
                if(i.status === "uploading") uploading = true;
            }

            onFileChanged(info.fileList)
            onUploadStateChanged(uploading)
        },
        defaultFileList: defaultFiles
    };
    return (
        <>
            {
                style ? (
                    <div style={style}>
                        <Dragger {...props} style={style}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">파일 업로드</p>
                            <p className="ant-upload-hint">
                                이곳을 클릭하거나 Drag&Drop 하여 파일을 업로드 할 수 있습니다.
                            </p>
                        </Dragger>
                    </div>
                ) : (
                    <Dragger {...props} style={style}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">파일 업로드</p>
                        <p className="ant-upload-hint">
                            이곳을 클릭하거나 Drag&Drop 하여 파일을 업로드 할 수 있습니다.
                        </p>
                    </Dragger>
                )
            }
        </>


    );
};

FileUploader.defaultProps = {
    defaultFiles: []
}

export default FileUploader;