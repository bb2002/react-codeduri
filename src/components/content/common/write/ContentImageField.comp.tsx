import React, {useEffect, useState} from 'react';
import ImgCrop from 'antd-img-crop';
import Dragger from "antd/es/upload/Dragger";
import {FILE_DOWNLOAD_SERVER, FILE_UPLOAD_SERVER} from "../../../../libraries/config/AxiosConfig";
import {Button, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/lib/upload/interface";
import {UploadFile} from "antd/es/upload/interface";

interface ContentImageFieldCompProps {
    onUpdateStateChanged: (isUploading: boolean) => void
    onUploadedFileChanged: (file: string) => void
    uploadedFile: string | undefined
}

const ContentImageFieldComp = ({ onUpdateStateChanged, onUploadedFileChanged, uploadedFile }: ContentImageFieldCompProps) => {
    const [imageUrl, setImageUrl] = useState("")

    const beforeUploadValidation = (file: { type: string, size: number }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error(".jpg 또는 .png 파일만 지원합니다.");
        }
        return isJpgOrPng;
    }

    const props = {
        name: 'file',
        multiple: false,
        action: FILE_UPLOAD_SERVER,
        onChange(info: UploadChangeParam) {
            const { status } = info.file

            if(status === "done") {
                message.success("썸네일 이미지를 등록했습니다.")
                onUpdateStateChanged(false)
            } else if(status === "error") {
                message.error("썸네일 이미지 등록을 실패했습니다.")
                onUpdateStateChanged(false)
            } else if(status === "uploading") {
                onUpdateStateChanged(true)
            }

            for(let i of info.fileList) {
                if(i.status === "done" && i.response) onUploadedFileChanged(i.response)
            }
        }
    };

    useEffect(() => {
        if(uploadedFile === undefined) {
            setImageUrl("")
        } else {
            setImageUrl(uploadedFile)
        }
    }, [uploadedFile])

    return (
        <div>
            <p style={{ marginBottom: 2 }}><b>썸네일 이미지 업로드</b>(지원 확장자: png, jpg)</p>
            {
                imageUrl === "" && (
                    <ImgCrop rotate aspect={450/250} modalOk="확인" modalCancel="취소" modalTitle="이미지 편집기">
                        <Dragger {...props} beforeUpload={beforeUploadValidation}>
                            <p className="ant-upload-drag-icon">
                                <br/><br/><br/>
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">썸네일 이미지 업로드</p>
                            <p className="ant-upload-hint">
                                이미지를 Drag&Drop 하거나 클릭하여 업로드하세요.
                            </p><br/><br/><br/><br/>
                        </Dragger>
                    </ImgCrop>
                )
            }

            {
                imageUrl !== "" && (
                    <>
                        <img src={`${FILE_DOWNLOAD_SERVER}${imageUrl}`}  alt="업로드 된 이미지" style={{ width: "100%", maxWidth: 800 }}/>
                    </>
                )
            }


        </div>
    );
};

export default ContentImageFieldComp;