import {ActionType, createAction, createReducer} from "typesafe-actions";
import {GetScoreboardForm, ScoreboardItem} from "../../libraries/types/Scoreboard.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const SCOREBOARD_GET         = "scoreboard.get"
export const SCOREBOARD_GET_SUCC    = "scoreboard.get_SUCC"
export const SCOREBOARD_GET_FAIL    = "scoreboard.get_FAIL"
export const SCOREBOARD_LOADING     = "scoreboard.loading"
export const SCOREBOARD_RESET       = "scoreboard.reset"

export const scoreboardGet          = createAction(SCOREBOARD_GET)<GetScoreboardForm>()
export const scoreboardGetSucc      = createAction(SCOREBOARD_GET_SUCC)<ScoreboardItem[]>()
export const scoreboardGetFail      = createAction(SCOREBOARD_GET_FAIL)<HttpResultCode>()
export const scoreboardLoading      = createAction(SCOREBOARD_LOADING)<boolean>()
export const scoreboardReset        = createAction(SCOREBOARD_RESET)()

const actions = {
    scoreboardGet,
    scoreboardGetSucc,
    scoreboardGetFail,
    scoreboardLoading,
    scoreboardReset
}

export type ScoreboardAction = ActionType<typeof actions>
export type ScoreboardState = {
    data: ScoreboardItem[]
    state: HttpResultCode
    loading: boolean
}

const initialState: ScoreboardState = {
    data: [],
    state: HttpResultCode.NONE,
    loading: false
}

const scoreboard = createReducer<ScoreboardState, ScoreboardAction>(initialState, {
    [SCOREBOARD_GET_SUCC]: (state, action) => produce(state, draft => {
        draft.state = HttpResultCode.HTTP_200
        draft.data = action.payload
    }),
    [SCOREBOARD_GET_FAIL]: (state, action) => produce(state, draft => {
        draft.state = action.payload
        draft.data = []
    }),
    [SCOREBOARD_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    }),
    [SCOREBOARD_RESET]: () => initialState
})

export default scoreboard