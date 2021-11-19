// ***************************
// Action
// ***************************
import {ActionType, createAction, createReducer} from "typesafe-actions";
import {
    ProblemDeleteForm,
    ProblemForm,
    ProblemItem,
    ProblemReadAllForm,
    ProblemUpdateForm
} from "../../libraries/types/Problem.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const PROBLEM_READALL = "problem.readall"
export const PROBLEM_CREATE = "problem.create"
export const PROBLEM_UPDATE = "problem.update"
export const PROBLEM_DELETE = "problem.delete"
export const PROBLEM_RESTORE = "problem.restore"

export const PROBLEM_READALL_OK = "problem.readall_OK"
export const PROBLEM_CREATE_OK = "problem.create_OK"
export const PROBLEM_UPDATE_OK = "problem.update_OK"
export const PROBLEM_DELETE_OK = "problem.delete_OK"
export const PROBLEM_RESTORE_OK = "problem.restore_OK"

export const PROBLEM_READALL_FAIL = "problem.readall_FAIL"
export const PROBLEM_CREATE_FAIL = "problem.create_FAIL"
export const PROBLEM_UPDATE_FAIL = "problem.update_FAIL"
export const PROBLEM_DELETE_FAIL = "problem.delete_FAIL"
export const PROBLEM_RESTORE_FAIL = "problem.restore_FAIL"

export const PROBLEM_LOADING = "problem.loading"
export const PROBLEM_RESET = "problem.reset"

// ***************************
// Action Method
// ***************************
export const problemRead = createAction(PROBLEM_READALL)<ProblemReadAllForm>()
export const problemCreate = createAction(PROBLEM_CREATE)<ProblemForm>()
export const problemUpdate = createAction(PROBLEM_UPDATE)<ProblemUpdateForm>()
export const problemDelete = createAction(PROBLEM_DELETE)<ProblemDeleteForm>()
export const problemRestore = createAction(PROBLEM_RESTORE)<string>()
export const problemReadAllOk = createAction(PROBLEM_READALL_OK)<ProblemItem[]>()
export const problemCreateOk = createAction(PROBLEM_CREATE_OK)<ProblemItem>()
export const problemUpdateOk = createAction(PROBLEM_UPDATE_OK)()
export const problemDeleteOk = createAction(PROBLEM_DELETE_OK)()
export const problemRestoreOk = createAction(PROBLEM_RESTORE_OK)()
export const problemReadAllFail = createAction(PROBLEM_READALL_FAIL)<HttpResultCode>()
export const problemCreateFail = createAction(PROBLEM_CREATE_FAIL)<HttpResultCode>()
export const problemUpdateFail = createAction(PROBLEM_UPDATE_FAIL)<HttpResultCode>()
export const problemDeleteFail = createAction(PROBLEM_DELETE_FAIL)<HttpResultCode>()
export const problemRestoreFail = createAction(PROBLEM_RESTORE_FAIL)<HttpResultCode>()
export const problemLoading = createAction(PROBLEM_LOADING)<boolean>()
export const problemReset = createAction(PROBLEM_RESET)()

const actions = {
    problemRead,
    problemCreate,
    problemUpdate,
    problemDelete,
    problemRestore,
    problemLoading,
    problemReadAllOk,
    problemCreateOk,
    problemUpdateOk,
    problemDeleteOk,
    problemRestoreOk,
    problemReadAllFail,
    problemCreateFail,
    problemUpdateFail,
    problemDeleteFail,
    problemRestoreFail,
    problemReset
}

export type ProblemAction = ActionType<typeof actions>

export type ProblemState = {
    read: {
        result: ProblemItem[] | undefined   // 문제읽기 결과
        state: HttpResultCode
    },
    create: {
        result: ProblemItem | undefined
        state: HttpResultCode
    },
    update: {
        state: HttpResultCode
    },
    remove: {
        state: HttpResultCode
    },
    loading: boolean
}

const initialState: ProblemState = {
    read: {
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
    loading: false
}

const problem = createReducer<ProblemState, ProblemAction>(initialState, {
    [PROBLEM_READALL_OK]: (state, action) => produce(state, draft => {
        draft.read.state = HttpResultCode.HTTP_200
        draft.read.result = action.payload
    }),
    [PROBLEM_READALL_FAIL]: (state, action) => produce(state, draft => {
        draft.read.state = action.payload
        draft.read.result = undefined
    }),
    [PROBLEM_UPDATE_OK]: (state) => produce(state, draft => {
        draft.update.state = HttpResultCode.HTTP_200
    }),
    [PROBLEM_UPDATE_FAIL]: (state, action) => produce(state, draft => {
        draft.update.state = action.payload
    }),
    [PROBLEM_CREATE_OK]: (state, action) => produce(state, draft => {
        draft.create.result = action.payload
        draft.create.state = HttpResultCode.HTTP_200
    }),
    [PROBLEM_CREATE_FAIL]: (state, action) => produce(state, draft => {
        draft.create.state = action.payload
    }),
    [PROBLEM_DELETE_OK]: (state) => produce(state, draft => {
        draft.remove.state = HttpResultCode.HTTP_200
    }),
    [PROBLEM_DELETE_FAIL]: (state, action) => produce(state, draft => {
        draft.remove.state = action.payload
    }),
    [PROBLEM_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [PROBLEM_RESET]: () => initialState
})

export default problem