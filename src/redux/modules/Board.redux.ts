import {ActionType, createAction, createReducer} from "typesafe-actions";
import {
    BoardItem,
    BoardReadOnePayload,
    BoardReadAllPayload, BoardCreatePayload, BoardUpdatePayload, BoardDeletePayload
} from "../../libraries/types/Board.type";
import produce from "immer";
import {HttpResultCode} from "../../libraries/Utils";

export const BOARD_READ_ONE         = "board.read_one"
export const BOARD_READ_ALL         = "board.read_all"
export const BOARD_CREATE           = "board.create"
export const BOARD_UPDATE           = "board.update"
export const BOARD_DELETE           = "board.delete"
export const BOARD_READ_ONE_SUCCESS = "board.read_one.success"
export const BOARD_READ_ALL_SUCCESS = "board.read_all.success"
export const BOARD_READ_ONE_FAILURE = "board.read_one.failure"
export const BOARD_READ_ALL_FAILURE = "board.read_all.failure"
export const BOARD_CREATE_RESULT    = "board.create.result"
export const BOARD_CREATE_NO        = "board.create.no"
export const BOARD_UPDATE_RESULT    = "board.update.result"
export const BOARD_DELETE_RESULT    = "board.delete.result"
export const BOARD_READ_ONE_LOADING = "board.read_one.loading"
export const BOARD_READ_ALL_LOADING = "board.read_all.loading"
export const BOARD_CREATE_LOADING   = "board.create.loading"
export const BOARD_UPDATE_LOADING   = "board.update.loading"
export const BOARD_DELETE_LOADING   = "board.delete.loading"
export const BOARD_RESET            = "board.reset"

/**
 * @Date 07.11 2021
 * Board Actions.
 */
export const boardReadOne = createAction(BOARD_READ_ONE)<BoardReadOnePayload>()
export const boardReadAll = createAction(BOARD_READ_ALL)<BoardReadAllPayload>()
export const boardCreate = createAction(BOARD_CREATE)<BoardCreatePayload>()
export const boardUpdate = createAction(BOARD_UPDATE)<BoardUpdatePayload>()
export const boardDelete = createAction(BOARD_DELETE)<BoardDeletePayload>()

export const boardReadOneSuccess = createAction(BOARD_READ_ONE_SUCCESS)<BoardItem>()
export const boardReadAllSuccess = createAction(BOARD_READ_ALL_SUCCESS)<BoardItem[]>()
export const boardReadOneFailure = createAction(BOARD_READ_ONE_FAILURE)<HttpResultCode>()
export const boardReadAllFailure = createAction(BOARD_READ_ALL_FAILURE)<HttpResultCode>()
export const boardCreateResult   = createAction(BOARD_CREATE_RESULT)<HttpResultCode>()
export const boardCreateNo       = createAction(BOARD_CREATE_NO)<number>()
export const boardUpdateResult   = createAction(BOARD_UPDATE_RESULT)<HttpResultCode>()
export const boardDeleteResult   = createAction(BOARD_DELETE_RESULT)<HttpResultCode>()

export const boardReadOneLoading = createAction(BOARD_READ_ONE_LOADING)<boolean>()
export const boardReadAllLoading = createAction(BOARD_READ_ALL_LOADING)<boolean>()
export const boardCreateLoading = createAction(BOARD_CREATE_LOADING)<boolean>()
export const boardUpdateLoading = createAction(BOARD_UPDATE_LOADING)<boolean>()
export const boardDeleteLoading = createAction(BOARD_DELETE_LOADING)<boolean>()

export const boardReset = createAction(BOARD_RESET)()

const actions = {
    boardReadOne,
    boardReadAll,
    boardCreate,
    boardUpdate,
    boardDelete,
    boardReadOneSuccess,
    boardReadAllSuccess,
    boardReadOneFailure,
    boardReadAllFailure,
    boardCreateResult,
    boardCreateNo,
    boardUpdateResult,
    boardDeleteResult,
    boardReadOneLoading,
    boardReadAllLoading,
    boardCreateLoading,
    boardUpdateLoading,
    boardDeleteLoading,
    boardReset
}

export type BoardAction = ActionType<typeof actions>

/**
 * State
 */
export type BoardState = {
    loading: {
        readOne: boolean
        readAll: boolean
        create: boolean
        update: boolean
        delete: boolean
    },
    state: {
        readOne: HttpResultCode
        readAll: HttpResultCode
        create: HttpResultCode
        update: HttpResultCode
        delete: HttpResultCode
    },
    item?: BoardItem,
    items?: BoardItem[],
    createNo: number
}

const initialState: BoardState = {
    loading: {
        readOne: false,
        readAll: false,
        create: false,
        update: false,
        delete: false,
    },
    state: {
        readOne: HttpResultCode.NONE,
        readAll: HttpResultCode.NONE,
        create: HttpResultCode.NONE,
        update: HttpResultCode.NONE,
        delete: HttpResultCode.NONE,
    },
    item: undefined,
    items: undefined,
    createNo: 0
}

const board = createReducer<BoardState, BoardAction>(initialState, {
    [BOARD_READ_ONE_SUCCESS]: (state, action) => produce(state, draft => {
        draft.state.readOne = HttpResultCode.HTTP_200
        draft.item = action.payload
    }),
    [BOARD_READ_ALL_SUCCESS]: (state, action) => produce(state, draft => {
        draft.state.readAll = HttpResultCode.HTTP_200
        draft.items = action.payload
    }),
    [BOARD_READ_ONE_FAILURE]: (state, action) => produce(state, draft => {
        draft.state.readOne = action.payload
        draft.item = undefined
    }),
    [BOARD_READ_ALL_FAILURE]: (state, action) => produce(state, draft => {
        draft.state.readAll = action.payload
        draft.items = undefined
    }),
    [BOARD_CREATE_RESULT]: (state, action) => produce(state, draft => {
        draft.state.create = action.payload
    }),
    [BOARD_CREATE_NO]: (state, action) => produce(state, draft => {
        draft.createNo = action.payload
    }),
    [BOARD_UPDATE_RESULT]: (state, action) => produce(state, draft => {
        draft.state.update = action.payload
    }),
    [BOARD_DELETE_RESULT]: (state, action) => produce(state, draft => {
        draft.state.delete = action.payload
    }),
    [BOARD_READ_ALL_LOADING]: (state, action) => produce(state, draft => {
        draft.loading.readAll = action.payload
    }),
    [BOARD_READ_ONE_LOADING]: (state, action) => produce(state, draft => {
        draft.loading.readOne = action.payload
    }),
    [BOARD_CREATE_LOADING]: (state, action) => produce(state, draft => {
        draft.loading.create = action.payload
    }),
    [BOARD_UPDATE_LOADING]: (state, action) => produce(state, draft => {
        draft.loading.update = action.payload
    }),
    [BOARD_DELETE_LOADING]: (state, action) => produce(state, draft => {
        draft.loading.delete = action.payload
    }),
    [BOARD_RESET]: () => initialState
})

export default board