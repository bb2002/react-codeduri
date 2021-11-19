import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import useBoard from "../../hooks/useBoard";
import {BoardDeleteAxios, BoardReadOneAxios} from "../../libraries/types/Board.type";
import {Button, Card, Modal, Upload} from "antd";
import Loading from "../atom/Loading";
import parse from 'html-react-parser';
import "../../stylesheet/board/BoardRead.css"
import "../../stylesheet/common/quilleditor.css"
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import {FILE_DOWNLOAD_SERVER} from "../../libraries/config/AxiosConfig";

interface BoardReadCompProps {
    readOneAxios: BoardReadOneAxios        // 개시글을 읽을때 사용할 Axios
    deleteAxios: BoardDeleteAxios   // 개시글을 삭제할 때 사용할 Axios
    no: number                      // 개시글 번호
    listURL: string                 // 목록으로 버튼 클릭시 이동할 URL
    editURL: string                 // 수정하기 버튼 클릭시 이동할 URL
    canEdit: boolean
    canDelete: boolean
}

const BoardReadComp = ({ readOneAxios, deleteAxios, no, listURL, editURL, canEdit, canDelete }: BoardReadCompProps) => {
    const { board, readOneItem, deleteItem, clearRedux, checkError } = useBoard()
    const [remove, setRemove] = useState(false)
    const history = useHistory()
    const { confirm } = Modal;

    useEffect(() => {
        readOneItem(readOneAxios, no)

        return () => {
            clearRedux()
        }
    }, [])

    useEffect(() => {
        checkError(board.state.readOne, true)
    }, [board.state.readOne])

    useEffect(() => {
        if(remove && !checkError(board.state.delete)) {
            history.replace(listURL)
        } else {
            setRemove(false)
        }
    }, [board.state.delete])

    const onRemovePressed = () => {
        confirm({
            title: '글 삭제',
            icon: <ExclamationCircleOutlined />,
            content: '이 글을 삭제합니다. 이 작업은 되돌릴 수 없습니다!',
            onOk() {
                setRemove(true)
                deleteItem(deleteAxios, no)
            },
            onCancel() {},
        });
    }

    return (
        <div id="board-read-container">
            {
                board.loading.readOne ? (
                    <Loading />
                ) : (
                    <>
                        <h2>
                            <strong>{board.item?.title}</strong>
                        </h2>
                        <div id="board-read-info">
                            <b>{board.item?.author}</b>
                            <span>{board.item?.date.format("YYYY-MM-DD HH:MM:SS")}</span>
                        </div>

                        <div id="board-read-content" className="ql-viewer">
                            {parse(board.item ? board.item.content : "")}
                        </div>

                        {
                            function() {
                                if(board.item !== undefined) {
                                    return <div id="board-file-content">
                                        <Upload
                                            defaultFileList={board.item.files.map(value => ({ ...value, url: FILE_DOWNLOAD_SERVER + value.url }))}
                                            showUploadList={{
                                                showDownloadIcon: false,
                                                showRemoveIcon: false
                                            }}/>
                                    </div>
                                }
                            }()
                        }


                        <div id="board-read-tail">
                            <Button type="text"><Link to={listURL}>목록으로</Link></Button>
                            {
                                canEdit && (
                                    <Button type="link"><Link to={`${editURL}/${no}`}>수정</Link></Button>
                                )
                            }

                            {
                                canDelete && (
                                    <Button type="text" danger={true} onClick={onRemovePressed}>
                                        {
                                            board.loading.delete ? (
                                                "삭제 중..."
                                            ) : (
                                                "삭제"
                                            )
                                        }
                                    </Button>
                                )
                            }
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default BoardReadComp;