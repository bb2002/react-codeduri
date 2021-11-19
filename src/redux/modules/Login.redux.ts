import {ActionType, createAction, createReducer} from "typesafe-actions";
import produce from "immer";
import {UserProfile} from "../../libraries/types/User.type";

export const LOGIN_PROFILE = "login.profile"
export const LOGIN_RESET = "login.reset"

export const loginProfile = createAction(LOGIN_PROFILE)<UserProfile>()
export const loginReset = createAction(LOGIN_RESET)()

const actions = {
    loginProfile,
    loginReset
}

export type LoginAction = ActionType<typeof actions>
export type LoginState = {
    profile: UserProfile | undefined
    isLogged: boolean
}

const initialState: LoginState = {
    isLogged: false,
    profile: undefined
}

const login = createReducer<LoginState, LoginAction>(initialState, {
    [LOGIN_PROFILE]: (state, action) => produce(state, draft => {
        draft.isLogged = true
        draft.profile = action.payload
    }),
    [LOGIN_RESET]: () => initialState
})

export default login
