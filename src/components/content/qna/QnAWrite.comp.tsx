import React, {useEffect, useState} from 'react';
import BoardWriter from "../../common/BoardEditor";
import {QnAForm} from "../../../libraries/types/QnA.type";
import {UploadFile} from "antd/es/upload/interface";
import produce from "immer"
import {useHistory} from "react-router";
import {Checkbox, message} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import useQnA from "../../../hooks/useQnA";
import {HttpResultCode} from "../../../libraries/Utils";

interface QnAWriteComp {
    match: {
        params: {
            contestId: string
        }
    },
    parentNo?: number
}

const QnAWriteComp = ({ match, parentNo }: QnAWriteComp) => {
    const [qnaForm, setQnAForm] = useState({
        file: [],
        content: "",
        title: "",
        isSecret: false,
        contestId: match.params.contestId
    } as QnAForm)
    const { qna, createQnA, resetQnA } = useQnA()
    const history = useHistory()

    useEffect(() => {
        if(qna.create.state === HttpResultCode.HTTP_200) {
            history.replace(`/contest/${match.params.contestId}/read/${qna.create.data?.no}`)
        } else if(qna.create.state === HttpResultCode.HTTP_500) {
            message.error("내부 서버 오류가 발생했습니다.")
        } else if(qna.create.state === HttpResultCode.HTTP_400) {
            message.error("인증 정보가 잘못되었습니다.")
            history.replace("/")
        }
    }, [qna.create])

    useEffect(() => {
        return () => {
            resetQnA()
        }
    }, [])

    const onContentChanged = (content: string) => {
        setQnAForm(produce(qnaForm, draft => {
            draft.content = content
        }))
    }

    const onFileChanged = (files: UploadFile[]) => {
        setQnAForm(produce(qnaForm, draft => {
            draft.file = files.map(value => value.response)
        }))
    }

    const onTitleChanged = (title: string) => {
        setQnAForm(produce(qnaForm, draft => {
            draft.title = title
        }))
    }

    const onCheckboxChanged = (e: CheckboxChangeEvent) => {
        setQnAForm(produce(qnaForm, draft => {
            draft.isSecret = e.target.checked
        }))
    }

    const onSubmitPressed = () => {
        createQnA(qnaForm)
    }

    const onGoBackPressed = () => {
        history.push(`/contest/${qnaForm.contestId}`)
    }

    return (
        <div>
            <BoardWriter
                onContentChanged={onContentChanged}
                onFileChanged={onFileChanged}
                onTitleChanged={onTitleChanged}
                loading={qna.loading}
                title={qnaForm.title}
                subHeader={parentNo ? "새 답변을 작성합니다." : "새로운 질문을 작성합니다."}
                onSubmitPressed={onSubmitPressed}
                onGoBack={parentNo ? undefined : onGoBackPressed}
                header={parentNo ? "답변 작성" : "질의 응답"}
                content={qnaForm.content} />
            <Checkbox onChange={onCheckboxChanged}>비밀글로 할까요?</Checkbox>
        </div>
    );
};

export default QnAWriteComp;