import React, {useEffect, useState} from 'react';
import {
    BoardCreatePayload,
    BoardReadOneAxios,
    BoardUpdateAxios,
    BoardUpdatePayload
} from "../../libraries/types/Board.type";
import BoardWriter from "../common/BoardEditor";
import useBoard from "../../hooks/useBoard";
import Loading from "../atom/Loading";
import {useHistory} from "react-router";
import {UploadFile} from "antd/lib/upload/interface";
import {HttpResultCode} from "../../libraries/Utils";
import {message} from "antd";

interface BoardEditCompProps {
    no: number
    header: string
    subHeader: string
    redirectURL: string
    updateAxios: BoardUpdateAxios
    readOneAxios: BoardReadOneAxios
    canEdit: boolean
}

const BoardEditComp = ({ no, header, subHeader, redirectURL, updateAxios, readOneAxios, canEdit }: BoardEditCompProps) => {
    const { board, readOneItem, updateItem, checkError, clearRedux } = useBoard()
    const [form, setForm] = useState({
        no: no,
        title: "",
        content: "",
        files: [],
        axios: updateAxios
    } as BoardUpdatePayload)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const onTitleChanged = (title: string) => {
        setForm({ ...form, title: title })
    }

    const onContentChanged = (content: string) => {
        setForm({ ...form, content: content })
    }

    const onFileChanged = (files: UploadFile[]) => {
        let newFiles = files.filter(value => value.status === "done")
        setForm({
            ...form,
            files: newFiles
        })
    }

    const onSubmitPressed = () => {
        setUpdate(true)
        updateItem(form)
    }

    const onGoBack = () => {
        history.goBack()
    }

    useEffect(() => {
        readOneItem(readOneAxios, no)

        return () => {
            clearRedux()
        }
    }, [])

    useEffect(() => {
        if(board.state.readOne === HttpResultCode.HTTP_200 && board.item !== undefined) {
            setForm({
                no: no,
                axios: updateAxios,
                title: board.item.title,
                content: board.item.content,
                files: board.item.files
            } as BoardUpdatePayload)
            setLoading(false)
        } else {
            checkError(board.state.readOne, true)
        }
    }, [board.item, board.state.readOne])

    useEffect(() => {
        if(update && !checkError(board.state.update, false)) {
            history.push(`${redirectURL}/${no}`)
        } else {
            setUpdate(false)
        }
    }, [board.state.update])

    if(canEdit) {
        return (
            !loading ? (
                <BoardWriter
                    title={form.title}
                    content={form.content}
                    files={form.files}
                    header={header}
                    subHeader={subHeader}
                    loading={board.loading.update}
                    onTitleChanged={onTitleChanged}
                    onContentChanged={onContentChanged}
                    onFileChanged={onFileChanged}
                    onSubmitPressed={onSubmitPressed}
                    onGoBack={onGoBack} />
            ) : (
                <Loading />
            )
        );
    } else {
        message.error("잘못된 접근입니다.")
        history.goBack()
        return (<></>)
    }

};

export default BoardEditComp;