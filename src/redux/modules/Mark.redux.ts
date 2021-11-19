import {ActionType, createAction, createReducer} from "typesafe-actions";
import {MarkForm, MarkSubmitResult, MarkTestItem, MarkTestResult} from "../../libraries/types/Mark.type";
import {HttpResultCode} from "../../libraries/Utils";
import produce from "immer";

export const MARKCODE_SUBMIT        = "markcode.submit"
export const MARKCODE_SUBMIT_OK     = "markcode.submit_OK"
export const MARKCODE_SUBMIT_FAIL   = "markcode.submit_FAIL"
export const MARKCODE_TEST          = "markcode.test"
export const MARKCODE_TEST_OK       = "markcode.test_OK"
export const MARKCODE_TEST_FAIL     = "markcode.test_FAIL"
export const MARKCODE_LOADING       = "markcode.loading"
export const MARKCODE_RESET         = "markcode.reset"

export const markCodeSubmit = createAction(MARKCODE_SUBMIT)<MarkForm>()
export const markCodeSubmitOk = createAction(MARKCODE_SUBMIT_OK)<MarkSubmitResult>()
export const markCodeSubmitFail = createAction(MARKCODE_SUBMIT_FAIL)<HttpResultCode>()
export const markCodeTest = createAction(MARKCODE_TEST)<MarkForm>()
export const markCodeTestOk = createAction(MARKCODE_TEST_OK)<MarkTestResult>()
export const markCodeTestFail = createAction(MARKCODE_TEST_FAIL)<HttpResultCode>()
export const markCodeLoading = createAction(MARKCODE_LOADING)<boolean>()
export const markCodeReset = createAction(MARKCODE_RESET)()

const actions = {
    markCodeSubmit,
    markCodeSubmitOk,
    markCodeSubmitFail,
    markCodeTest,
    markCodeTestOk,
    markCodeTestFail,
    markCodeLoading,
    markCodeReset
}

export type MarkAction = ActionType<typeof actions>
export type MarkState = {
    submit: {
        result: MarkSubmitResult | undefined,
        error: string | undefined,
        status: HttpResultCode
    },
    test: {
        result: MarkTestItem[] | undefined,
        error: string | undefined,
        status: HttpResultCode
    },
    loading: boolean
}

const initialState: MarkState = {
    submit: {
        result: undefined,
        error: undefined,
        status: HttpResultCode.NONE
    },
    test: {
        result: undefined,
        error: undefined,
        status: HttpResultCode.NONE
    },
    loading: false
}

const mark = createReducer<MarkState, MarkAction>(initialState, {
    [MARKCODE_SUBMIT_OK]: (state, action) => produce(state, draft => {
        draft.submit.result = action.payload
        draft.submit.error = action.payload.error
        draft.submit.status = HttpResultCode.HTTP_200
    }),
    [MARKCODE_SUBMIT_FAIL]: (state, action) => produce(state, draft => {
        draft.submit.result = undefined
        draft.submit.status = action.payload
    }),
    [MARKCODE_TEST_OK]: (state, action) => produce(state, draft => {
        draft.test.result = action.payload.items
        draft.test.error = action.payload.error
        draft.test.status = HttpResultCode.HTTP_200
    }),
    [MARKCODE_TEST_FAIL]: (state, action) => produce(state, draft => {
        draft.test.result = undefined
        draft.test.status = action.payload
    }),
    [MARKCODE_RESET]: () => initialState,
    [MARKCODE_LOADING]: (state, action) => produce(state, draft => {
        draft.loading = action.payload
    })
})

export default mark

