import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {
    BoardCreateAxios, BoardCreatePayload,
    BoardDeleteAxios,
    BoardReadAllAxios,
    BoardReadOneAxios, BoardUpdateAxios, BoardUpdatePayload
} from "../libraries/types/Board.type";
import {
    boardCreate,
    boardDelete,
    boardReadAll,
    boardReadOne,
    boardReset,
    boardUpdate
} from "../redux/modules/Board.redux";
import {Modal} from "antd";
import {useHistory} from "react-router";
import {HttpResultCode} from "../libraries/Utils";

export default function useBoard() {
    const board = useSelector((state: RootState) => state.board)
    const dispatch = useDispatch()
    const history = useHistory()

    const readAllItems = (axios: BoardReadAllAxios) => {
        dispatch(boardReadAll({ axios: axios }))
    }

    const readOneItem = (axios: BoardReadOneAxios, no: number) => {
        dispatch(boardReadOne( { axios: axios, item: no }))
    }

    const writeItem = (payload: BoardCreatePayload) => {
        dispatch(boardCreate(payload))
    }

    const deleteItem = (axios: BoardDeleteAxios, no: number) => {
        dispatch(boardDelete({ axios: axios, no: no }))
    }

    const updateItem = (payload: BoardUpdatePayload) => {
        dispatch(boardUpdate(payload))
    }

    const clearRedux = () => {
        dispatch(boardReset())
    }

    /**
     * HTTP 응답 코드를 확인하고, 모달을 띄웁니다.
     * @param code          응답 코드
     * @return boolean      성공시 false, 실패시 true
     */
    const checkError = (code: HttpResultCode, goBack = false) => {
        const checkGoBack = () => {
            if(goBack) {
                history.goBack()
            }
        }

        switch(code) {
            case HttpResultCode.NONE:
            case HttpResultCode.HTTP_200:
            case HttpResultCode.HTTP_201:
                return false
            case HttpResultCode.HTTP_400:
                Modal.error({ title: "400 오류",
                    content: "요청을 처리 할 수 없습니다. 다시 시도하십시오.",
                    onOk: checkGoBack
                })

                return true
            case HttpResultCode.HTTP_401:
                Modal.error({ title: "401 오류",
                    content: "권한이 없습니다.",
                    onOk: checkGoBack})
                return true
            case HttpResultCode.HTTP_404:
                Modal.error({ title: "404 오류",
                    content: "페이지가 존재하지 않습니다.",
                    onOk: checkGoBack
                })
                return true
            case HttpResultCode.HTTP_500:
                Modal.error({ title: "500 오류",
                    content: "내부서버 오류가 발생했습니다.",
                    onOk: checkGoBack})
                return true
            case HttpResultCode.HTTP_502:
                Modal.error({ title: "502 오류",
                    content: "프록시 서버가 응답하지 않습니다.",
                    onOk: checkGoBack})
                return true
            case HttpResultCode.HTTP_RESULT_FAILED:
                Modal.error({ title: "요청 오류",
                    content: "서버에 요청을 보낼 수 없습니다.",
                    onOk: checkGoBack})
                return true
        }
    }

    return {
        board,
        readAllItems,
        readOneItem,
        writeItem,
        deleteItem,
        updateItem,
        checkError,
        clearRedux
    }
}