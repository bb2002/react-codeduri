import React, {useEffect, useState} from 'react';
import useQnA from "../../../hooks/useQnA";
import {Button, Card, message, Modal, Spin, Upload} from "antd";
import "../../../stylesheet/content/qna/QnAReadOne.css"
import {useHistory} from "react-router";
import {
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    QuestionOutlined,
    WarningOutlined
} from "@ant-design/icons";
import QuillEditor from "../../common/QuillEditor";
import {QnAForm} from "../../../libraries/types/QnA.type";
import Title from "antd/es/typography/Title";
import FileUploader from "../../common/FileUploader";
import {UploadFile} from "antd/es/upload/interface";
import moment from "moment";
import {HttpResultCode} from "../../../libraries/Utils";
import "../../../stylesheet/common/quilleditor.css"
import {uuidToOriginalNameAxios} from "../../../libraries/axios/File.axios";
import {FILE_DOWNLOAD_SERVER} from "../../../libraries/config/AxiosConfig";
import useLogin from "../../../hooks/useLogin";

interface QnAReadOneComp {
    match: {
        params: {
            qno: number,
            contestId: string
        }
    }
}

interface QnAItemViewerInterface {
    isReply: boolean,
    title: string,
    createdAt: string,
    author: any,
    files: string[]
    viewCnt: number,
    content: string,
    match: any
    replyNo?: number
}

function QnAItemViewer({ isReply, title, createdAt, author, files, viewCnt, content, match, replyNo }: QnAItemViewerInterface) {
    interface OriginFile {
        uid: string,
        name: string,
        url: string,
    }

    const [originFiles, setOriginFiles] = useState<OriginFile[] | undefined>(undefined)
    const { login } = useLogin()
    const { qna, updateQnA, deleteQnA, resetQnA, readOneQnA } = useQnA()
    const history = useHistory()

    const [isEditMode, setIsEditMode] = useState(false)
    const [replyForm, setReplyForm] = useState({
        file: files,
        title: "답변수정에서는타이틀안씀",
        content: content,
        isSecret: false,
        contestId: match.params.contestId,
        parentNo: Number(match.params.qno),
        no: replyNo
    } as QnAForm)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        uuidToOriginalNameAxios(files).then((response: any) => {
            const res = response.data as string[]
            let datas = [] as OriginFile[]
            for(let i = 0; i < files.length; ++i) {
                datas.push({
                    uid: files[i],
                    name: res[i],
                    url: `${FILE_DOWNLOAD_SERVER}${files[i]}`,
                } as OriginFile)
            }
            setOriginFiles(datas)
        }).catch(ex => {
            setOriginFiles(undefined)
        })
    }, [files])

    const onDeleteButtonPressed = () => {
        Modal.confirm({
            title: '삭제 확인',
            icon: <ExclamationCircleOutlined />,
            content: '이 질문을 삭제하시겠습니까? 삭제 후 되돌릴 수 없습니다!',
            okText: '삭제',
            cancelText: '취소',
            onOk: () => {
                deleteQnA({
                    originId: match.params.contestId,
                    questionNo: isReply ? replyNo : match.params.qno
                })
                history.replace(`/contest/${match.params.contestId}`)
            }
        });
    }

    const onUploadedFileChanged = (files: UploadFile[]) => {
        setReplyForm({
            ...replyForm,
            file: files.filter(value => value.status === "done").map(value => value.response)
        })
    }

    const onReplyEditSubmitButtonPressed = () => {
        updateQnA(replyForm)
    }

    useEffect(() => {
        if(qna.update.state === HttpResultCode.HTTP_200) {
            resetQnA()
            readOneQnA({
                originId: match.params.contestId,
                questionNo: match.params.qno
            })
        }
    }, [qna.update])

    return (
        <div className="qna-item">

            {
                isReply ? (
                    <p style={{ fontSize: 48, color: "#3b3b3b", marginBottom: 0 }}>A</p>
                ) : (
                    <QuestionOutlined style={{ fontSize: 48, color: "#00B3FA", marginBottom: 16 }}/>
                )
            }
            {
                !isReply && (
                    <h2>{title}</h2>
                )
            }

            <p><span>{createdAt}</span> | <span>{author.name}</span>  { !isReply && (<>| <span>{viewCnt}회</span></>) }</p>
            <br />
            {   // 답변을 수정하는 경우
                isEditMode && (
                    <div style={{ width: "100%" }}>
                        <QuillEditor
                            onChange={(value: string) => setReplyForm({ ...replyForm, content: value })}
                            value={replyForm.content}
                            height={200}/>
                    </div>
                )
            }

            {   // 글을 읽는 경우
                !isEditMode && (
                    <div dangerouslySetInnerHTML={{ __html: content }} className="ql-viewer" style={{ width: "100%" }}/>
                )
            }


            {   // 글을 읽는 경우
                (!isEditMode && originFiles) && (
                    <div style={{ width: "100%" }}>
                        <Upload defaultFileList={originFiles} showUploadList={{ showRemoveIcon: false }}/>
                    </div>
                )
            }

            {   // 답변을 수정하는 경우 (파일 업로더)
                (isEditMode && originFiles) && (
                    <div style={{ width: "100%" }}>
                        <br />
                        <FileUploader
                            onFileChanged={onUploadedFileChanged}
                            onUploadStateChanged={(state: boolean) => setUploading(state)}
                            defaultFiles={originFiles} />
                        <br />
                    </div>
                )
            }

            {   // 답변을 수정하는 경우 (저장 버튼)
                (isEditMode && originFiles) && (
                    <div style={{ display: "flex" }}>
                        <Button
                            type="primary"
                            onClick={onReplyEditSubmitButtonPressed}
                            disabled={uploading || qna.loading}><CloudUploadOutlined /> 저장</Button>
                        <Button type="link">취소</Button>
                    </div>
                    
                )
            }

            <br />
            <div className="qna-button-container">
                {
                    (login.isLogged && login.profile?.studentId === author.sId && !isReply) && (
                        <>
                            <Button type="link" onClick={() => history.push(`/contest/${match.params.contestId}`)}>목록으로</Button>
                            <Button type="primary" onClick={() => history.push(`/contest/${match.params.contestId}/edit/${match.params.qno}`)} icon={<EditOutlined />}> 수정</Button>
                            <Button type="primary" danger={true} icon={<DeleteOutlined />} onClick={onDeleteButtonPressed}> 삭제</Button>
                        </>
                    )
                }

                {
                    (login.isLogged && login.profile?.studentId === author.sId && isReply && !isEditMode) && (
                        <>
                            <Button type="primary" onClick={() => setIsEditMode(true)} icon={<EditOutlined />}> 수정</Button>
                            <Button type="primary" danger={true} icon={<DeleteOutlined />} onClick={onDeleteButtonPressed}> 삭제</Button>
                        </>
                    )
                }
            </div>
        </div>
    )
}



const QnAReadOneComp = ({ match }: QnAReadOneComp) => {
    const { qna, readOneQnA, createQnA, resetQnA } = useQnA()
    const initialState = {
        title: "답변글의제목은사용하지않음",          // 답변에서는 사용하지 않음
        content: "",
        isSecret: false,    // 답변에서는 항상 공개
        file: [],
        contestId: match.params.contestId,
        parentNo: match.params.qno
    } as QnAForm
    const [replyForm, setReplyForm] = useState(initialState)
    const [uploading, setUploading] = useState(false)
    const history = useHistory()


    useEffect(() => {
        readOneQnA({
            originId: match.params.contestId,
            questionNo: match.params.qno
        })
    }, [match.params.contestId, match.params.qno])

    useEffect(() => {
        if(qna.create.state === HttpResultCode.HTTP_200) {
            message.success("등록되었습니다.")
            resetQnA()
            readOneQnA({
                originId: match.params.contestId,
                questionNo: match.params.qno
            })
        }
    }, [qna.create])

    useEffect(() => {
        return () => {
            resetQnA()
        }
    }, [])


    const onSubmitPressed = () => {
        resetQnA()
        createQnA(replyForm)
        setReplyForm(initialState)
    }


    if(qna.loading || !qna.readOne.data) {
        return (
            <div className="qna-read-loading-container">
                <Spin size="large" />
            </div>
        )
    } else {
        return (
            <div>
                <QnAItemViewer
                    isReply={false}
                    title={qna.readOne.data.title}
                    createdAt={qna.readOne.data.createdAt.format("YYYY년 MM월 DD일")}
                    author={qna.readOne.data.author}
                    files={qna.readOne.data.file}
                    match={match}
                    viewCnt={qna.readOne.data.viewCnt}
                    content={qna.readOne.data.content} />

                <div style={{ height: 64, width: "100%" }} />
                {
                    (qna.readOne.data.reply === undefined || qna.readOne.data.reply.length === 0) && (
                        <Card>
                            <div className="qna-no-reply-container">
                                <WarningOutlined style={{ fontSize: 48, marginBottom: 16, color: "#d63031" }}/>
                                <h3>아직 등록된 답변이 없습니다.</h3>
                                <p>이 질문의 첫 번째 답변자가 되어보세요</p>
                            </div>
                        </Card>
                    )
                }

                {
                    (qna.readOne.data.reply !== undefined && qna.readOne.data.reply.length !== 0) && (
                        qna.readOne.data.reply.map((ans: any) => {
                            return (
                                <>
                                    <Card>
                                        <QnAItemViewer
                                            isReply={true}
                                            title=""
                                            createdAt={moment(ans.updatedAt).format("YYYY년 MM월 DD일")}
                                            author={ans.author}
                                            viewCnt={ans.views}
                                            files={ans.files}
                                            match={match}
                                            replyNo={ans.no}
                                            content={ans.content}/>
                                    </Card>
                                    <div style={{ height: 16, width: "100%" }} />
                                </>

                            )
                        })
                    )
                }
                <div style={{ height: 64, width: "100%" }} />

                <Title level={2}>답변</Title>
                <QuillEditor
                    height={350}
                    onChange={(text: string) => setReplyForm({ ...replyForm, content: text })}
                    value={replyForm.content} />
                <br />
                <FileUploader onFileChanged={(files: UploadFile[]) => setReplyForm({
                    ...replyForm,
                    file: files.filter(value => value.status === "done").map(value => value.response)
                })} onUploadStateChanged={(newState: boolean) => setUploading(newState)} />
                <br />
                <Button
                    type="primary"
                    style={{ width: "100%", maxWidth: 300, float: "right" }}
                    onClick={() => onSubmitPressed()}
                    disabled={uploading || qna.loading}><CloudUploadOutlined /> 답변 개시</Button>
            </div>
        )
    }
};

export default QnAReadOneComp;