import {
    CONTEST_CREATE,
    CONTEST_DELETE,
    CONTEST_READALL,
    CONTEST_READONE,
    CONTEST_RESTORE,
    CONTEST_UPDATE,
    contestCreateFail,
    contestCreateOk,
    contestDeleteFail,
    contestDeleteOk,
    contestLoading,
    contestReadAllFail,
    contestReadAllOk,
    contestReadOneFail,
    contestReadOneOk,
    contestRestoreFail,
    contestRestoreOk,
    contestUpdateFail,
    contestUpdateOk
} from "../../redux/modules/Contest.redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    contestCreateAxios,
    contestDeleteAxios,
    contestReadAllAxios,
    contestReadOneAxios,
    contestRestoreAxios,
    contestUpdateAxios
} from "../../libraries/axios/Contest.axios";
import {ContestForm} from "../../libraries/types/Contest.type";
import {HttpResultCode} from "../../libraries/Utils";
import {anyToContestItem} from "../../libraries/parser/AnyToItem";

function* contestReadAll() {
    yield put(contestLoading(true))

    try {
        // @ts-ignore
        const response = yield call(contestReadAllAxios)
        const data = response.data as any[]
        const items = data.map(d => anyToContestItem(d))
        yield put(contestReadAllOk(items))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestReadAllFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestReadAllFail(ex.response.status))
        }
    }

    yield put(contestLoading(false))
}

function* contestReadOne(form: { payload: string }) {
    yield put(contestLoading(true))

    try {
        // @ts-ignore
        const response = yield call(contestReadOneAxios, form.payload)
        const data = response.data as any
        const item = anyToContestItem(data)
        yield put(contestReadOneOk(item))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestReadOneFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestReadOneFail(ex.response.status))
        }
    }

    yield put(contestLoading(false))
}

function* contestCreate(form: { payload: ContestForm }) {
    yield put(contestLoading(true))

    try {
        // @ts-ignore
        const response = yield call(contestCreateAxios, form.payload)
        const data = response.data as any
        yield put(contestCreateOk(data._id))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestCreateFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestCreateFail(ex.response.status))
        }
    }

    yield put(contestLoading(false))
}

function* contestUpdate(form: { payload: ContestForm }) {
    yield put(contestLoading(true))

    try {
        // @ts-ignore
        yield call(contestUpdateAxios, form.payload)
        yield put(contestUpdateOk())
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestUpdateFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestUpdateFail(ex.response.status))
        }
    }

    yield put(contestLoading(false))
}

function* contestDelete(uuid: { payload: string }) {
    yield put(contestLoading(true))

    try {
        // @ts-ignore
        yield call(contestDeleteAxios, uuid.payload)
        yield put(contestDeleteOk())
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestDeleteFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestDeleteFail(ex.response.status))
        }
    }
}

function* contestRestore(uuid: { payload: string }) {
    yield put(contestLoading(true))

    try {
        yield call(contestRestoreAxios, uuid.payload)
        yield put(contestRestoreOk())
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(contestRestoreFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(contestRestoreFail(ex.response.status))
        }
    }

    yield put(contestLoading(false))
}

export default function* contestSaga() {
    // @ts-ignore
    yield takeLatest(CONTEST_READONE, contestReadOne)
    // @ts-ignore
    yield takeLatest(CONTEST_READALL, contestReadAll)
    // @ts-ignore
    yield takeLatest(CONTEST_CREATE, contestCreate)
    // @ts-ignore
    yield takeLatest(CONTEST_UPDATE, contestUpdate)
    // @ts-ignore
    yield takeLatest(CONTEST_DELETE, contestDelete)
    // @ts-ignore
    yield takeLatest(CONTEST_RESTORE, contestRestore)
}