import {
    BOARD_CREATE, BOARD_DELETE,
    BOARD_READ_ALL, BOARD_READ_ONE, BOARD_UPDATE,
    boardCreateLoading,
    boardCreateNo,
    boardCreateResult,
    boardDeleteLoading,
    boardDeleteResult,
    boardReadAllFailure,
    boardReadAllLoading,
    boardReadAllSuccess,
    boardReadOneFailure,
    boardReadOneLoading,
    boardReadOneSuccess,
    boardUpdateLoading,
    boardUpdateResult
} from "../../redux/modules/Board.redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    BoardCreatePayload,
    BoardDeletePayload,
    BoardItem,
    BoardReadAllPayload,
    BoardReadOnePayload,
    BoardUpdatePayload
} from "../../libraries/types/Board.type";
import {uuidToOriginalNameAxios} from "../../libraries/axios/File.axios";
import {UploadFile} from "antd/es/upload/interface";
import {HttpResultCode, networkErrorMacro} from "../../libraries/Utils";
import {anyToBoardItem} from "../../libraries/parser/AnyToItem";

function* boardReadAll(action: { payload: BoardReadAllPayload }) {
    yield put(boardReadAllLoading(true))

    try {
        // @ts-ignore
        const response = yield call(action.payload.axios)
        const body = response.data as any[]
        const items = body.map(value => anyToBoardItem(value))
        yield put(boardReadAllSuccess(items))
    } catch(ex) {
        networkErrorMacro(ex, boardReadAllFailure)
    }

    yield put(boardReadAllLoading(false))
}

function* boardReadOne(action: { payload: BoardReadOnePayload }) {
    yield put(boardReadOneLoading(true))

    try {
        // @ts-ignore
        const response = yield call(action.payload.axios, action.payload.item)
        const body = response.data as any
        const item = anyToBoardItem(body)

        if(body.files && body.files.length !== 0) {
            // @ts-ignore
            const oriResponse = yield call(uuidToOriginalNameAxios, body.files)
            const originalNames = oriResponse.data as string[]

            for(let i = 0; i < originalNames.length; ++i) {

                item.files.push({
                    name: originalNames[i],
                    uid: body.files[i],
                    status: "done",
                    url: body.files[i]
                } as UploadFile)
            }

        }

        yield put(boardReadOneSuccess(item))
    } catch(ex) {
        networkErrorMacro(ex, boardReadOneFailure)
    }

    yield put(boardReadOneLoading(false))
}

function* boardUpdate(action: { payload: BoardUpdatePayload }) {
    yield put(boardUpdateLoading(true))

    try {
        // @ts-ignore
        yield call(action.payload.axios, action.payload)
        yield put(boardUpdateResult(HttpResultCode.HTTP_200))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(boardUpdateResult(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(boardUpdateResult(ex.response.status))
        }
    }

    yield put(boardUpdateLoading(false))
}

function* boardCreate(action: { payload: BoardCreatePayload }) {
    yield put(boardCreateLoading(true))

    try {
        // @ts-ignore
        const response = yield call(action.payload.axios, action.payload)
        const no = response.data.no
        yield put(boardCreateNo(no))
        yield put(boardCreateResult(HttpResultCode.HTTP_200))
    } catch(ex) {
        networkErrorMacro(ex, boardCreateResult)
    }

    yield put(boardCreateLoading(false))
}

function* boardDelete(action: { payload: BoardDeletePayload }) {
    yield put(boardDeleteLoading(true))

    try {
        // @ts-ignore
        yield call(action.payload.axios, action.payload.no)
        yield put(boardDeleteResult(HttpResultCode.HTTP_200))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(boardDeleteResult(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(boardDeleteResult(ex.response.status))
        }
    }

    yield put(boardDeleteLoading(false))
}

export default function* boardSaga() {
    // @ts-ignore
    yield takeLatest(BOARD_READ_ALL, boardReadAll)
    // @ts-ignore
    yield takeLatest(BOARD_READ_ONE, boardReadOne)
    // @ts-ignore
    yield takeLatest(BOARD_CREATE, boardCreate)
    // @ts-ignore
    yield takeLatest(BOARD_UPDATE, boardUpdate)
    // @ts-ignore
    yield takeLatest(BOARD_DELETE, boardDelete)
}