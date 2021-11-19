import {ActionType, createAction, createReducer} from "typesafe-actions";
import {EruriAuthForm} from "../../libraries/types/EruriAuth.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";
import {UserProfile} from "../../libraries/types/User.type";

export const ERURI_PROFILE = "eruri.profile"
export const ERURI_PROFILE_OK = "eruri.profile_OK"
export const ERURI_PROFILE_FAIL = "eruri.profile_FAIL"
export const ERURI_AUTH = "eruri.auth"
export const ERURI_AUTH_OK = "eruri.auth_OK"
export const ERURI_AUTH_FAIL = "eruri.auth_FAIL"
export const ERURI_LOADING = "eruri.loading"
export const ERURI_RESET = "eruri.reset"

export const eruriProfile = createAction(ERURI_PROFILE)<string>()
export const eruriProfileOk = createAction(ERURI_PROFILE_OK)<UserProfile>()
export const eruriProfileFail = createAction(ERURI_PROFILE_FAIL)<HttpResultCode>()
export const eruriAuth = createAction(ERURI_AUTH)<EruriAuthForm>()
export const eruriAuthOk = createAction(ERURI_AUTH_OK)<UserProfile>()
export const eruriAuthFail = createAction(ERURI_AUTH_FAIL)<HttpResultCode>()
export const eruriLoading = createAction(ERURI_LOADING)<boolean>()
export const eruriReset = createAction(ERURI_RESET)()

const actions = {
    eruriProfile,
    eruriProfileOk,
    eruriProfileFail,
    eruriAuth,
    eruriAuthOk,
    eruriAuthFail,
    eruriLoading,
    eruriReset
}

export type EruriAuthAction = ActionType<typeof actions>
export type EruriAuthState = {
    data: UserProfile | undefined,
    profileState: HttpResultCode,
    authState: HttpResultCode,
    loading: boolean
}

const initialState: EruriAuthState = {
    data: undefined,
    profileState: HttpResultCode.NONE,
    authState: HttpResultCode.NONE,
    loading: false
}

const eruri = createReducer<EruriAuthState, EruriAuthAction>(initialState, {
    [ERURI_PROFILE_OK]: (state, action) => produce(state, draft => {
        draft.data = action.payload
        draft.profileState = HttpResultCode.HTTP_200
    }),
    [ERURI_AUTH_OK]: (state, action) => produce(state, draft => {
        draft.data = action.payload
        draft.authState = HttpResultCode.HTTP_200
    }),
    [ERURI_PROFILE_FAIL]: (state, action) => produce(state, draft => {
        draft.data = undefined
        draft.profileState = action.payload
    }),
    [ERURI_AUTH_FAIL]: (state, action) => produce(state, draft => {
        draft.data = undefined
        draft.authState = action.payload
    }),
    [ERURI_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [ERURI_RESET]: () => initialState
})

export default eruri
