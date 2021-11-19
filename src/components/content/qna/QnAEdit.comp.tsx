import React, {useEffect, useState} from 'react';
import useQnA from "../../../hooks/useQnA";
import BoardWriter from "../../common/BoardEditor";
import {QnAForm} from "../../../libraries/types/QnA.type";
import {HttpResultCode} from "../../../libraries/Utils";
import {UploadFile} from "antd/es/upload/interface";
import {uuidToOriginalNameAxios} from "../../../libraries/axios/File.axios";
import {FILE_DOWNLOAD_SERVER} from "../../../libraries/config/AxiosConfig";
import {Checkbox, message} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useHistory} from "react-router";

interface QnAEditCompProps {
    match: {
        params: {
            contestId: string
            qno: number
            rno?: number            // 답변 글 수정시
        }
    }
}

const QnAEditComp = ({ match }: QnAEditCompProps) => {
    const [qnaForm, setQnAForm] = useState({
        file: [],
        content: "",
        title: "",
        isSecret: false,
        contestId: match.params.contestId
    } as QnAForm)
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[] | undefined>(undefined)
    const { qna, readOneQnA, updateQnA, resetQnA } = useQnA()
    const history = useHistory()

    useEffect(() => {
        readOneQnA({
            originId: match.params.contestId,
            questionNo: match.params.qno
        })
    }, [match.params.contestId, match.params.qno])

    useEffect(() => {
        if(qna.readOne.state === HttpResultCode.HTTP_200 && qna.readOne.data) {
            setQnAForm({
                file: [],
                content: qna.readOne.data.content,
                title: qna.readOne.data.title,
                contestId: match.params.contestId,
                isSecret: qna.readOne.data.isSecret
            })

            uuidToOriginalNameAxios(qna.readOne.data.file).then((response: any) => {
                const files = qna.readOne.data?.file
                if(files) {
                    const res = response.data as string[]
                    let datas = [] as UploadFile[]

                    for(let i = 0; i < files.length; ++i) {
                        datas.push({
                            uid: files[i],
                            name: res[i],
                            status: "done",
                            url: `${FILE_DOWNLOAD_SERVER}${files[i]}`
                        } as UploadFile)
                    }

                    setUploadedFiles(datas)
                } else {
                    setUploadedFiles([])
                }
            }).catch(ex => {
                setUploadedFiles([])
            })
        }
    }, [qna.readOne.state])

    useEffect(() => {
        if(qna.update.state === HttpResultCode.HTTP_200) {
            history.replace(`/contest/${match.params.contestId}/read/${match.params.qno}`)
            message.success("수정되었습니다.")
        }

        if(qna.update.state === HttpResultCode.HTTP_400) {
            message.error("요청에 오류가 발생했습니다.")
        }

        if(qna.update.state === HttpResultCode.HTTP_500) {
            message.error("내부 서버 오류가 발생했습니다.")
        }
    }, [qna.update.state])

    useEffect(() => {
        return () => {
            resetQnA()
        }
    }, [])

    const onContentChanged = (value: string) => {
        setQnAForm({
            ...qnaForm,
            content: value
        })
    }

    const onTitleChanged = (title: string) => {
        setQnAForm({
            ...qnaForm,
            title: title
        })
    }

    const onFileChanged = (files: UploadFile[]) => {
        setUploadedFiles(files.filter(value => value.status === "done"))
    }

    const onSecretCheckboxChanged = (e: CheckboxChangeEvent) => {
        setQnAForm({
            ...qnaForm,
            isSecret: e.target.checked
        })
    }

    const onSubmitPressed = () => {
        const form = {
            ...qnaForm,
            file: uploadedFiles?.map(value => value.response),
            no: match.params.qno
        } as QnAForm
        updateQnA(form)
    }

    return (
        <div>
            {
                uploadedFiles !== undefined && (
                    <>
                        <BoardWriter
                            onContentChanged={onContentChanged}
                            loading={qna.loading}
                            title={qnaForm.title}
                            subHeader="질문 글을 수정합니다."
                            onSubmitPressed={onSubmitPressed}
                            header="질문 글 수정"
                            files={uploadedFiles}
                            content={qnaForm.content}
                            onGoBack={() => history.push(`/contest/${match.params.contestId}/read/${match.params.qno}`)}
                            onFileChanged={onFileChanged}
                            onTitleChanged={onTitleChanged} />
                        <Checkbox onChange={onSecretCheckboxChanged} value={qnaForm.isSecret}>비밀글로 할까요?</Checkbox>
                    </>

                )
            }
        </div>
    );
};

export default QnAEditComp;