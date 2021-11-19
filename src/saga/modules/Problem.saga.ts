import {call, put, takeLatest} from "redux-saga/effects";
import {
    PROBLEM_CREATE, PROBLEM_DELETE,
    PROBLEM_READALL, PROBLEM_UPDATE, problemCreateFail, problemCreateOk, problemDeleteFail, problemDeleteOk,
    problemLoading,
    problemReadAllFail, problemReadAllOk,
    problemUpdateFail,
    problemUpdateOk
} from "../../redux/modules/Problem.redux";
import {
    ProblemDeleteForm,
    ProblemForm,
    ProblemItem,
    ProblemReadAllForm,
    ProblemUpdateForm,
    TestCaseItem
} from "../../libraries/types/Problem.type";
import {
    problemCreateAxios, problemDeleteAxios,
    problemFormUpdateAxios,
    problemReadAllAxios,
    problemTestCaseCreateAxios, problemTestCaseRemoveAxios
} from "../../libraries/axios/Problem.axios";
import { networkErrorMacro } from "../../libraries/Utils";
import {anyToProblemItem} from "../../libraries/parser/AnyToItem";

function* macro(fun: any, fail: any) {
    yield put(problemLoading(true))

    try {
        yield fun()
    } catch(ex) {
        networkErrorMacro(ex, fail)
    }

    yield put(problemLoading(false))
}

function* problemReadAll(form: { payload: ProblemReadAllForm }) {
    function* fun() {
        // @ts-ignore
        const response = yield call(problemReadAllAxios, form.payload)
        const data = response.data as any[]
        const problemItems = new Array<ProblemItem>()

        for(let d of data) {
            let testCaseAny = d.testCase as any[]
            let testCases = new Array<TestCaseItem>()

            for (let t of testCaseAny) {
                testCases.push({
                    exampleIn: t.input,
                    exampleOut: t.output,
                    isPublic: t.public === 1
                })
            }


            problemItems.push(anyToProblemItem(d))
        }

        yield put(problemReadAllOk(problemItems))
    }

    yield macro(fun, problemReadAllFail)
}

function* problemUpdate(form: { payload: ProblemUpdateForm }) {
    function* fun() {
        // @ts-ignore           Form 을 업데이트 합니다.
        yield call(problemFormUpdateAxios, form.payload)

        // @ts-ignore           테스트케이스를 모두 지우고 다시 만듭니다.
        yield call(problemTestCaseRemoveAxios, form.payload)
        yield call(problemTestCaseCreateAxios, form.payload)
        yield put(problemUpdateOk())
    }

    yield macro(fun, problemUpdateFail)
}

function* problemCreate(form: { payload: ProblemForm }) {
    function* fun() {
        // @ts-ignore           새 문제를 만듭니다.
        const response = yield call(problemCreateAxios, form.payload)
        yield put(problemCreateOk(anyToProblemItem(response.data)))
    }

    yield macro(fun, problemCreateFail)
}

function* problemDelete(form: { payload: ProblemDeleteForm }) {
    function* fun() {
        yield call(problemDeleteAxios, form.payload)
        yield put(problemDeleteOk())
    }

    yield macro(fun, problemDeleteFail)
}

export default function* problemSaga() {
    // @ts-ignore
    yield takeLatest(PROBLEM_READALL, problemReadAll)
    // @ts-ignore
    yield takeLatest(PROBLEM_UPDATE, problemUpdate)
    // @ts-ignore
    yield takeLatest(PROBLEM_CREATE, problemCreate)
    // @ts-ignore
    yield takeLatest(PROBLEM_DELETE, problemDelete)
}