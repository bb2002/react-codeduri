import {MarkForm, MarkSubmitResult, MarkTestResult} from "../../libraries/types/Mark.type";
import {
    MARKCODE_SUBMIT, MARKCODE_TEST,
    markCodeLoading,
    markCodeSubmitFail,
    markCodeSubmitOk,
    markCodeTestFail,
    markCodeTestOk
} from "../../redux/modules/Mark.redux";
import {call, put, takeLatest} from "redux-saga/effects";
import {codeSubmitAxios, codeTestAxios} from "../../libraries/axios/Mark.axios";
import {HttpResultCode} from "../../libraries/Utils";

function* codeSubmit(form: { payload: MarkForm }) {
    yield put(markCodeLoading(true))

    try {
        // @ts-ignore
        const response = yield call(codeSubmitAxios, form.payload)
        const data = response.data.msg
        const error = response.data.error
        const result = { pass: [], score: 0, error: undefined } as MarkSubmitResult

        if(error) {
            result.error = error
        } else {
            for(let msg of data.msg) {
                result.pass.push(msg.pass_or_fail)
            }
            result.score = data.score
        }

        yield put(markCodeSubmitOk(result))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(markCodeSubmitFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(markCodeSubmitFail(ex.response.status))
        }
    }

    yield put(markCodeLoading(false))
}

function* codeTest(form: { payload: MarkForm }) {
    yield put(markCodeLoading(true))

    try {
        // @ts-ignore
        const response = yield call(codeTestAxios, form.payload)
        const data = response.data.testcases as any[]

        const error = response.data.error
        const result = {
            error: undefined,
            items: []
        } as MarkTestResult

        if(error) {
            result.error = error
        } else {
            for(let d of data) {
                result.items.push({
                    inputValue: d.input,
                    isPass: d.result,
                    outputValue: d.output,
                    resultValue: d.success
                })
            }
        }

        yield put(markCodeTestOk(result))
    } catch(ex) {
        if(ex.response === undefined) {
            yield put(markCodeTestFail(HttpResultCode.HTTP_RESULT_FAILED))
        } else {
            yield put(markCodeTestFail(ex.response.status))
        }
    }

    yield put(markCodeLoading(false))
}

export default function* markSaga() {
    // @ts-ignore
    yield takeLatest(MARKCODE_SUBMIT, codeSubmit)
    // @ts-ignore
    yield takeLatest(MARKCODE_TEST, codeTest)
}