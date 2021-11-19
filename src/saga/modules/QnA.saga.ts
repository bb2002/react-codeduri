import {
    QnADeleteForm,
    QnAForm, QnAItem,
    QnAReadOneForm,
} from "../../libraries/types/QnA.type";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    QnACreate,
    qnaCreateFail, qnaCreateSucc,
    QnADelete, qnaDeleteFail, qnaDeleteSucc,
    qnaLoading,
    QnAReadAll, qnaReadAllFail, qnaReadAllSucc,
    QnAReadOne, qnaReadOneFail, qnaReadOneSucc,
    QnAUpdate, qnaUpdateFail, qnaUpdateSucc
} from "../../redux/modules/Qna.redux";
import {networkErrorMacro} from "../../libraries/Utils";
import {
    qnaCreateAxios, qnaDeleteAxios,
    qnaReadAllAxios,
    qnaReadOneAxios,
    qnaUpdateAxios
} from "../../libraries/axios/QnA.axios";
import {anyToQnAItem} from "../../libraries/parser/AnyToItem";

function* macro(fun: any, fail: any) {
    yield put(qnaLoading(true))
    try {
        yield fun()
    } catch(ex) {
        networkErrorMacro(ex, fail)
    }
    yield put(qnaLoading(false))
}

function* qnaCreate(form: { payload: QnAForm }) {
    function* fun() {
        // @ts-ignore
        const response = yield call(qnaCreateAxios, form.payload)
        const createdResult = anyToQnAItem(response.data)
        yield put(qnaCreateSucc(createdResult))
    }
    yield macro(fun, qnaCreateFail)
}

function* qnaReadAll(originId: { payload: string }) {
    function* fun() {
        // @ts-ignore
        const response = yield call(qnaReadAllAxios, originId.payload)
        const data = response.data as any[]
        const items = [] as QnAItem[]

        for(let d of data) items.push(anyToQnAItem(d))
        yield put(qnaReadAllSucc(items))
    }
    yield macro(fun, qnaReadAllFail)
}

function* qnaReadOne(form: { payload: QnAReadOneForm }) {
    function* fun() {
        // @ts-ignore
        const response = yield call(qnaReadOneAxios, form.payload)
        const data = response.data as any
        const item = anyToQnAItem(data)
        yield put(qnaReadOneSucc(item))
    }
    yield macro(fun, qnaReadOneFail)
}

function* qnaUpdate(form: { payload: QnAForm }) {
    function* fun() {
        // @ts-ignore
        yield call(qnaUpdateAxios, form.payload)
        yield put(qnaUpdateSucc())
    }
    yield macro(fun, qnaUpdateFail)
}

function* qnaDelete(form: { payload: QnADeleteForm }) {
    function* fun() {
        // @ts-ignore
        yield call(qnaDeleteAxios, form.payload)
        yield put(qnaDeleteSucc())
    }
    yield macro(fun, qnaDeleteFail)
}

export default function* qnaSaga() {
    // @ts-ignore
    yield takeLatest(QnACreate, qnaCreate)
    // @ts-ignore
    yield takeLatest(QnAReadAll, qnaReadAll)
    // @ts-ignore
    yield takeLatest(QnAReadOne, qnaReadOne)
    // @ts-ignore
    yield takeLatest(QnAUpdate, qnaUpdate)
    // @ts-ignore
    yield takeLatest(QnADelete, qnaDelete)
}