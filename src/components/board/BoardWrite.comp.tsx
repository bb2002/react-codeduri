import React, {useEffect, useState} from 'react';
import useBoard from "../../hooks/useBoard";
import {BoardCreateAxios, BoardCreatePayload} from "../../libraries/types/Board.type";
import "../../stylesheet/board/BoardWrite.css"
import {useHistory} from "react-router";
import BoardWriter from "../common/BoardEditor";
import {UploadFile} from "antd/es/upload/interface";
import {message} from "antd";

interface BoardWriteCompProps {
    header: string          // 개시판 해더
    subHeader: string       // 개서판 서브해더
    redirectURL: string     // 리다이렉트 URL
    createAxios: BoardCreateAxios
    canWrite: boolean
}

const BoardWriteComp = ({ header, subHeader, redirectURL, createAxios, canWrite }: BoardWriteCompProps) => {
    const {board, writeItem, checkError, clearRedux} = useBoard()
    const [form, setForm] = useState({
        title: "",
        axios: createAxios,
        files: [],
        content: ""
    } as BoardCreatePayload)
    const [create, setCreate] = useState(false)
    const history = useHistory()

    const onTitleChanged = (title: string) => {
        setForm({ ...form, title: title })
    }

    const onContentChanged = (content: string) => {
        setForm({ ...form, content: content })
    }

    const onFileChanged = (files: UploadFile[]) => {
        let newFiles = files.filter(value => value.status === "done").map(value => ({ ...value, uid: (value.response ? value.response : value.uid) }))
        setForm({
            ...form,
            files: newFiles
        })
    }

    useEffect(() => {
        return () => {
            clearRedux()
        }
    }, [])

    useEffect(() => {
        if(create && !checkError(board.state.create, false)) {
            history.push(`${redirectURL}/${board.createNo}`)
        } else {
            setCreate(false)
        }
    }, [board.state.create])

    const onSubmitPressed = () => {
        setCreate(true)
        writeItem(form)
    }

    const onGoBack = () => {
        history.goBack()
    }

    if(canWrite) {
        return (
            <BoardWriter
                title={form.title}
                content={form.content}
                header={header}
                subHeader={subHeader}
                loading={board.loading.create}
                onTitleChanged={onTitleChanged}
                onContentChanged={onContentChanged}
                onFileChanged={onFileChanged}
                onSubmitPressed={onSubmitPressed}
                onGoBack={onGoBack}/>
        );
    } else {
        message.error("잘못된 접근입니다.")
        setTimeout(() => {
            history.goBack()
        }, 1000)
        return (<></>)
    }
};

export default BoardWriteComp;