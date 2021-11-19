import {ActionType, createAction, createReducer} from "typesafe-actions";
import {
    ParticipantDeleteForm,
    ParticipantItem,
    ParticipantReadAllForm, ParticipantReadOneForm,
    ParticipantRequestForm,
    ParticipantUpdateForm
} from "../../libraries/types/Participant.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const PARTICIPANT_REQUEST    = "partici.request"
export const PARTICIPANT_READ_ALL   = "partici.read_all"
export const PARTICIPANT_READ_ONE   = "partici.read_one"
export const PARTICIPANT_UPDATE_ALL = "partici.update_all"
export const PARTICIPANT_UPDATE_ONE = "partici.update_one"
export const PARTICIPANT_DELETE_ALL = "partici.delete_all"
export const PARTICIPANT_DELETE_ONE = "partici.delete_one"
export const PARTICIPANT_REQUEST_SUCC    = "partici.request.succ"
export const PARTICIPANT_READ_ALL_SUCC   = "partici.read_all.succ"
export const PARTICIPANT_READ_ONE_SUCC   = "partici.read_one.succ"
export const PARTICIPANT_UPDATE_SUCC = "partici.update.succ"
export const PARTICIPANT_DELETE_SUCC = "partici.delete.succ"
export const PARTICIPANT_REQUEST_FAIL    = "partici.request.fail"
export const PARTICIPANT_READ_ALL_FAIL   = "partici.read_all.fail"
export const PARTICIPANT_READ_ONE_FAIL   = "partici.read_one.fail"
export const PARTICIPANT_UPDATE_FAIL = "partici.update.fail"
export const PARTICIPANT_DELETE_FAIL = "partici.delete.fail"
export const PARTICIPANT_LOADING = "partici.loading"
export const PARTICIPANT_RESET = "partici.reset"
export const PARTICIPANT_HACK_RESET_UPDATE = "partici.hack.reset.update"

export const participantRequest = createAction(PARTICIPANT_REQUEST)<ParticipantRequestForm>()
export const participantReadAll = createAction(PARTICIPANT_READ_ALL)<ParticipantReadAllForm>()
export const participantReadOne = createAction(PARTICIPANT_READ_ONE)<ParticipantReadOneForm>()
export const participantUpdateAll = createAction(PARTICIPANT_UPDATE_ALL)<ParticipantUpdateForm>()
export const participantUpdateOne = createAction(PARTICIPANT_UPDATE_ONE)<ParticipantUpdateForm>()
export const participantDeleteAll = createAction(PARTICIPANT_DELETE_ALL)<ParticipantDeleteForm>()
export const participantDeleteOne = createAction(PARTICIPANT_DELETE_ONE)<ParticipantDeleteForm>()
export const participantRequestSuccess = createAction(PARTICIPANT_REQUEST_SUCC)()
export const participantReadAllSuccess = createAction(PARTICIPANT_READ_ALL_SUCC)<ParticipantItem[]>()
export const participantReadOneSuccess = createAction(PARTICIPANT_READ_ONE_SUCC)<ParticipantItem>()
export const participantUpdateSuccess = createAction(PARTICIPANT_UPDATE_SUCC)()
export const participantDeleteSuccess = createAction(PARTICIPANT_DELETE_SUCC)()
export const participantRequestFailure = createAction(PARTICIPANT_REQUEST_FAIL)<HttpResultCode>()
export const participantReadAllFailure = createAction(PARTICIPANT_READ_ALL_FAIL)<HttpResultCode>()
export const participantReadOneFailure = createAction(PARTICIPANT_READ_ONE_FAIL)<HttpResultCode>()
export const participantUpdateFailure = createAction(PARTICIPANT_UPDATE_FAIL)<HttpResultCode>()
export const participantDeleteFailure = createAction(PARTICIPANT_DELETE_FAIL)<HttpResultCode>()
export const participantLoading = createAction(PARTICIPANT_LOADING)<boolean>()
export const participantReset = createAction(PARTICIPANT_RESET)()
export const participant_HACK_resetUpdate = createAction(PARTICIPANT_HACK_RESET_UPDATE)()

const actions = {
    participantRequest,
    participantReadAll,
    participantReadOne,
    participantUpdateAll,
    participantUpdateOne,
    participantDeleteAll,
    participantDeleteOne,
    participantRequestSuccess,
    participantReadAllSuccess,
    participantReadOneSuccess,
    participantUpdateSuccess,
    participantDeleteSuccess,
    participantRequestFailure,
    participantReadAllFailure,
    participantReadOneFailure,
    participantUpdateFailure,
    participantDeleteFailure,
    participantLoading,
    participantReset,
    participant_HACK_resetUpdate
}

export type ParticipantAction = ActionType<typeof actions>

export type ParticipantState = {
    request: {
        state: HttpResultCode
    },
    readAll: {
        result: ParticipantItem[] | undefined
        state: HttpResultCode
    },
    readOne: {
        result: ParticipantItem | undefined
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

const initialState: ParticipantState = {
    request: {
        state: HttpResultCode.NONE
    },
    readAll: {
        result: undefined,
        state: HttpResultCode.NONE
    },
    readOne: {
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

const participant = createReducer<ParticipantState, ParticipantAction>(initialState, {
    [PARTICIPANT_REQUEST_SUCC]: (state) => produce(state, draft => {
        draft.request.state = HttpResultCode.HTTP_200
    }),
    [PARTICIPANT_READ_ALL_SUCC]: (state, action) => produce(state, draft => {
        draft.readAll.state = HttpResultCode.HTTP_200
        draft.readAll.result = action.payload
    }),
    [PARTICIPANT_READ_ONE_SUCC]: (state, action) => produce(state, draft => {
        draft.readOne.state = HttpResultCode.HTTP_200
        draft.readOne.result = action.payload
    }),
    [PARTICIPANT_UPDATE_SUCC]: (state) => produce(state, draft => {
        draft.update.state = HttpResultCode.HTTP_200
    }),
    [PARTICIPANT_DELETE_SUCC]: (state) => produce(state, draft => {
        draft.remove.state = HttpResultCode.HTTP_200
    }),
    [PARTICIPANT_REQUEST_FAIL]: (state, action) => produce(state, draft => {
        draft.request.state = action.payload
    }),
    [PARTICIPANT_READ_ONE_FAIL]: (state, action) => produce(state, draft => {
        draft.readOne.state = action.payload
        draft.readOne.result = undefined
    }),
    [PARTICIPANT_UPDATE_FAIL]: (state, action) => produce(state, draft => {
        draft.update.state = action.payload
    }),
    [PARTICIPANT_DELETE_FAIL]: (state, action) => produce(state, draft => {
        draft.remove.state = action.payload
    }),
    [PARTICIPANT_READ_ALL_FAIL]: (state, action) => produce(state, draft => {
        draft.readAll.state = action.payload
    }),
    [PARTICIPANT_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [PARTICIPANT_RESET]: () => initialState,
    [PARTICIPANT_HACK_RESET_UPDATE]: (state) => ({
        ...state,
        update: initialState.update
    })
})

export default participant