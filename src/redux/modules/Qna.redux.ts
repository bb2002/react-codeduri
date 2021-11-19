import {ActionType, createAction, createReducer} from "typesafe-actions";
import {QnADeleteForm, QnAForm, QnAItem, QnAReadOneForm} from "../../libraries/types/QnA.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const QnACreate = "qna.create"
export const QnAReadAll = "qna.read_all"
export const QnAReadOne = "qna.read_one"
export const QnAUpdate = "qna.update"
export const QnADelete = "qna.delete"
export const QnACreateSucc = "qna.create.succ"
export const QnAReadAllSucc = "qna.read_all.succ"
export const QnAReadOneSucc = "qna.read_one.succ"
export const QnAUpdateSucc = "qna.update.succ"
export const QnADeleteSucc = "qna.delete.succ"
export const QnACreateFail = "qna.create.fail"
export const QnAReadAllFail = "qna.read_all.fail"
export const QnAReadOneFail = "qna.read_one.fail"
export const QnAUpdateFail = "qna.update.fail"
export const QnADeleteFail = "qna.delete.fail"
export const QnALoading = "qna.loading"
export const QnAReset = "qna.reset"

export const qnaCreate = createAction(QnACreate)<QnAForm>()
export const qnaReadAll = createAction(QnAReadAll)<string>()
export const qnaReadOne = createAction(QnAReadOne)<QnAReadOneForm>()
export const qnaUpdate = createAction(QnAUpdate)<QnAForm>()
export const qnaDelete = createAction(QnADelete)<QnADeleteForm>()
export const qnaCreateSucc = createAction(QnACreateSucc)<QnAItem>()
export const qnaReadAllSucc = createAction(QnAReadAllSucc)<QnAItem[]>()
export const qnaReadOneSucc = createAction(QnAReadOneSucc)<QnAItem>()
export const qnaUpdateSucc = createAction(QnAUpdateSucc)()
export const qnaDeleteSucc = createAction(QnADeleteSucc)()
export const qnaCreateFail = createAction(QnACreateFail)<HttpResultCode>()
export const qnaReadAllFail = createAction(QnAReadAllFail)<HttpResultCode>()
export const qnaReadOneFail = createAction(QnAReadOneFail)<HttpResultCode>()
export const qnaUpdateFail = createAction(QnAUpdateFail)<HttpResultCode>()
export const qnaDeleteFail = createAction(QnADeleteFail)<HttpResultCode>()
export const qnaLoading = createAction(QnALoading)<boolean>()
export const qnaReset = createAction(QnAReset)()

const actions = {
    qnaCreate,
    qnaReadAll,
    qnaReadOne,
    qnaUpdate,
    qnaDelete,
    qnaCreateSucc,
    qnaReadAllSucc,
    qnaReadOneSucc,
    qnaUpdateSucc,
    qnaDeleteSucc,
    qnaCreateFail,
    qnaReadAllFail,
    qnaReadOneFail,
    qnaUpdateFail,
    qnaDeleteFail,
    qnaLoading,
    qnaReset
}

export type QnAAction = ActionType<typeof actions>
export type QnAState = {
    create: {
        data: QnAItem | undefined
        state: HttpResultCode
    },
    update: {
        state: HttpResultCode
    },
    readOne: {
        data: QnAItem | undefined
        state: HttpResultCode
    },
    readAll: {
        data: QnAItem[] | undefined
        state: HttpResultCode
    },
    remove: {
        state: HttpResultCode
    },
    loading: boolean
}

const initialState: QnAState = {
    create: {
        data: undefined,
        state: HttpResultCode.NONE
    },
    update: {
        state: HttpResultCode.NONE
    },
    readOne: {
        data: undefined,
        state: HttpResultCode.NONE
    },
    readAll: {
        data: undefined,
        state: HttpResultCode.NONE
    },
    remove: {
        state: HttpResultCode.NONE
    },
    loading: false
}

const qna = createReducer<QnAState, QnAAction>(initialState, {
    [QnALoading]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [QnACreateSucc]: (state, action) => produce(state, draft => {
        draft.create.data = action.payload
        draft.create.state = HttpResultCode.HTTP_200
    }),
    [QnAReadAllSucc]: (state, action) => produce(state, draft => {
        draft.readAll.data = action.payload
        draft.readAll.state = HttpResultCode.HTTP_200
    }),
    [QnAReadOneSucc]: (state, action) => produce(state, draft => {
        draft.readOne.data = action.payload
        draft.readOne.state = HttpResultCode.HTTP_200
    }),
    [QnAUpdateSucc]: (state, action) => produce(state, draft => {
        draft.update.state = HttpResultCode.HTTP_200
    }),
    [QnADeleteSucc]: (state, action) => produce(state, draft => {
        draft.remove.state = HttpResultCode.HTTP_200
    }),
    [QnACreateFail]: (state, action) => produce(state, draft => {
        draft.create.state = action.payload
        draft.create.data = undefined
    }),
    [QnAReadAllFail]: (state, action) => produce(state, draft => {
        draft.readAll.state = action.payload
        draft.readAll.data = undefined
    }),
    [QnAReadOneFail]: (state, action) => produce(state, draft => {
        draft.readOne.state = action.payload
        draft.readOne.data = undefined
    }),
    [QnAUpdateFail]: (state, action) => produce(state, draft => {
        draft.update.state = action.payload
    }),
    [QnADeleteFail]: (state, action) => produce(state, draft => {
        draft.remove.state = action.payload
    }),
    [QnAReset]: () => initialState
})

export default qna