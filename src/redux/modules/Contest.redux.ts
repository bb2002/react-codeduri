import {ActionType, createAction, createReducer} from "typesafe-actions";
import {ContestForm, ContestItem} from "../../libraries/types/Contest.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const CONTEST_READONE = "contest.readone"
export const CONTEST_READALL = "contest.readall"
export const CONTEST_CREATE = "contest.create"
export const CONTEST_UPDATE = "contest.update"
export const CONTEST_DELETE = "contest.delete"
export const CONTEST_RESTORE = "contest.restore"

export const CONTEST_READONE_OK = "contest.readone_OK"
export const CONTEST_READALL_OK = "contest.readall_OK"
export const CONTEST_CREATE_OK = "contest.create_OK"
export const CONTEST_UPDATE_OK = "contest.update_OK"
export const CONTEST_DELETE_OK = "contest.delete_OK"
export const CONTEST_RESTORE_OK = "contest.restore_OK"

export const CONTEST_READONE_FAIL = "contest.readone_FAIL"
export const CONTEST_READALL_FAIL = "contest.readall_FAIL"
export const CONTEST_CREATE_FAIL = "contest.create_FAIL"
export const CONTEST_UPDATE_FAIL = "contest.update_FAIL"
export const CONTEST_DELETE_FAIL = "contest.delete_FAIL"
export const CONTEST_RESTORE_FAIL = "contest.restore_FAIL"

export const CONTEST_LOADING = "contest.loading"
export const CONTEST_RESET = "contest.reset"

// **************************
// Action Method
// **************************
export const contestReadOne = createAction(CONTEST_READONE)<string>()
export const contestReadAll = createAction(CONTEST_READALL)()
export const contestCreate = createAction(CONTEST_CREATE)<ContestForm>()
export const contestUpdate = createAction(CONTEST_UPDATE)<ContestForm>()
export const contestDelete = createAction(CONTEST_DELETE)<string>()
export const contestRestore = createAction(CONTEST_RESTORE)<string>()

export const contestReadOneOk = createAction(CONTEST_READONE_OK)<ContestItem>()
export const contestReadAllOk = createAction(CONTEST_READALL_OK)<ContestItem[]>()
export const contestCreateOk = createAction(CONTEST_CREATE_OK)<string>()
export const contestUpdateOk = createAction(CONTEST_UPDATE_OK)()
export const contestDeleteOk = createAction(CONTEST_DELETE_OK)()
export const contestRestoreOk = createAction(CONTEST_RESTORE_OK)()

export const contestReadOneFail = createAction(CONTEST_READONE_FAIL)<HttpResultCode>()
export const contestReadAllFail = createAction(CONTEST_READALL_FAIL)<HttpResultCode>()
export const contestCreateFail = createAction(CONTEST_CREATE_FAIL)<HttpResultCode>()
export const contestUpdateFail = createAction(CONTEST_UPDATE_FAIL)<HttpResultCode>()
export const contestDeleteFail = createAction(CONTEST_DELETE_FAIL)<HttpResultCode>()
export const contestRestoreFail = createAction(CONTEST_RESTORE_FAIL)<HttpResultCode>()

export const contestLoading = createAction(CONTEST_LOADING)<boolean>()
export const contestReset = createAction(CONTEST_RESET)()

const actions = {
    contestReadOne,
    contestReadAll,
    contestCreate,
    contestUpdate,
    contestDelete,
    contestRestore,
    contestReadOneOk,
    contestReadAllOk,
    contestCreateOk,
    contestUpdateOk,
    contestDeleteOk,
    contestRestoreOk,
    contestReadOneFail,
    contestReadAllFail,
    contestCreateFail,
    contestUpdateFail,
    contestDeleteFail,
    contestRestoreFail,
    contestLoading,
    contestReset
}

export type ContestAction = ActionType<typeof actions>

export type ContestState = {
    readAll: {
        result: ContestItem[] | undefined
        deletedItems: ContestItem[] | undefined
        state: HttpResultCode
    },
    readOne: {
        result: ContestItem | undefined
        state: HttpResultCode
    },
    create: {
        result: string | undefined
        state: HttpResultCode
    },
    update: {
        state: HttpResultCode
    },
    remove: {
        state: HttpResultCode
    },
    restore: {
        state: HttpResultCode
    },
    loading: boolean
}

const initialState: ContestState = {
    readAll: {
        result: undefined,
        deletedItems: undefined,
        state: HttpResultCode.NONE
    },
    readOne: {
        result: undefined,
        state: HttpResultCode.NONE
    },
    create: {
        result: undefined,
        state: HttpResultCode.NONE
    },
    update: {
        state: HttpResultCode.NONE
    },
    remove: {
        state: HttpResultCode.NONE
    },
    restore: {
        state: HttpResultCode.NONE
    },
    loading: false
}

const contest = createReducer<ContestState, ContestAction>(initialState, {
    [CONTEST_READONE_OK]: (state, action) => produce(state, draft => {
        draft.readOne.result = action.payload
        draft.readOne.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_READALL_OK]: (state, action) => produce(state, draft => {
        draft.readAll.result = action.payload.filter(value => !value.isDeleted)
        draft.readAll.deletedItems = action.payload.filter(value => value.isDeleted)
        draft.readAll.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_CREATE_OK]: (state, action) => produce(state, draft => {
        draft.create.result = action.payload
        draft.create.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_UPDATE_OK]: (state, action) => produce(state, draft => {
        draft.update.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_DELETE_OK]: (state, action) => produce(state, draft => {
        draft.remove.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_RESTORE_OK]: (state, action) => produce(state, draft => {
        draft.restore.state = HttpResultCode.HTTP_200
    }),
    [CONTEST_READONE_FAIL]: (state, action) => produce(state, draft => {
        draft.readOne.result = undefined
        draft.readOne.state = action.payload
    }),
    [CONTEST_READALL_FAIL]: (state, action) => produce(state, draft => {
        draft.readAll.result = undefined
        draft.readAll.state = action.payload
    }),
    [CONTEST_CREATE_FAIL]: (state, action) => produce(state, draft => {
        draft.create.result = undefined
        draft.create.state = action.payload
    }),
    [CONTEST_UPDATE_FAIL]: (state, action) => produce(state, draft => {
        draft.update.state = action.payload
    }),
    [CONTEST_DELETE_FAIL]: (state, action) => produce(state, draft => {
        draft.remove.state = action.payload
    }),
    [CONTEST_RESTORE_FAIL]: (state, action) => produce(state, draft => {
        draft.restore.state = action.payload
    }),
    [CONTEST_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [CONTEST_RESET]: () => initialState
})

export default contest