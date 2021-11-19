import {EruriAuthForm} from "../../libraries/types/EruriAuth.type";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    ERURI_AUTH,
    ERURI_PROFILE, eruriAuthFail, eruriAuthOk,
    eruriLoading,
    eruriProfileFail,
    eruriProfileOk
} from "../../redux/modules/EruriAuth.redux";
import {authEruriAxios, getEruriProfileAxios} from "../../libraries/axios/EruriAuth.axios";
import {HttpResultCode} from "../../libraries/Utils";
import {anyToUserProfile} from "../../libraries/parser/AnyToItem";

function* eruriGetProfile(accessToken: { payload: string }) {
    yield put(eruriLoading(true))

    try {
        // @ts-ignore
        const response = yield call(getEruriProfileAxios, accessToken.payload)
        const data = anyToUserProfile(response.data)
        yield put(eruriProfileOk(data))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(eruriProfileFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(eruriProfileFail(ex.response.status))
        }
    }

    yield put(eruriLoading(false))
}

function* eruriAuth(form: { payload: EruriAuthForm }) {
    yield put(eruriLoading(true))

    try {
        // @ts-ignore
        const response = yield call(authEruriAxios, form.payload)
        const data = anyToUserProfile(response.data)
        yield put(eruriAuthOk(data))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(eruriAuthFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(eruriAuthFail(ex.response.status))
        }
    }

    yield put(eruriLoading(false))
}

export default function* eruriSaga() {
    // @ts-ignore
    yield takeLatest(ERURI_PROFILE, eruriGetProfile)
    // @ts-ignore
    yield takeLatest(ERURI_AUTH, eruriAuth)
}