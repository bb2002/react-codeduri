import {GetScoreboardForm, ScoreboardItem} from "../../libraries/types/Scoreboard.type";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    SCOREBOARD_GET,
    scoreboardGetFail,
    scoreboardGetSucc,
    scoreboardLoading
} from "../../redux/modules/Scoreboard.redux";
import {getScoreboardAxios} from "../../libraries/axios/Scoreboard.axios";
import {networkErrorMacro} from "../../libraries/Utils";
import {anyToScoreboardItem} from "../../libraries/parser/AnyToItem";

function* getScoreboards(form: { payload: GetScoreboardForm }) {
    yield put(scoreboardLoading(true))

    try {
        // @ts-ignore
        const response = yield call(getScoreboardAxios, form.payload)
        const data = response.data as any[]
        const items = [] as ScoreboardItem[]

        data.forEach(value => items.push(anyToScoreboardItem(value)))
        yield put(scoreboardGetSucc(items))
    } catch(ex) {
        networkErrorMacro(ex, scoreboardGetFail)
    }

    yield put(scoreboardLoading(false))
}

export default function* scoreboardSaga() {
    // @ts-ignore
    yield takeLatest(SCOREBOARD_GET, getScoreboards)
}