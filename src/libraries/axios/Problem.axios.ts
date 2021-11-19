import getAxiosInstance from "../config/AxiosConfig";
import {ProblemDeleteForm, ProblemForm, ProblemReadAllForm, ProblemUpdateForm} from "../types/Problem.type";

export const problemReadAllAxios = (payload: ProblemReadAllForm) => getAxiosInstance().get(`/contest/problem/${payload.contestId}`)

export const problemFormUpdateAxios = (payload: ProblemUpdateForm) => getAxiosInstance().patch(`/contest/problem/${payload.contestId}/${payload.problemId}`, {
    title: payload.form.problemTitle,
    content: payload.form.problemContent,
    caution: payload.form.problemCaution,
    images: payload.form.images ? payload.form.images : []
})

export const problemTestCaseCreateAxios = (payload: ProblemUpdateForm) => getAxiosInstance().post(`/contest/tcase/${payload.contestId}/${payload.problemId}`, {
    testcase: payload.testCases.map(value => ({
            "input": value.exampleIn,
            "output": value.exampleOut,
            "public": value.isPublic ? 1 : 0
        }))
})

export const problemTestCaseRemoveAxios = (payload: ProblemUpdateForm) => getAxiosInstance().delete(`/contest/tcase/${payload.contestId}/${payload.problemId}`)

export const problemCreateAxios = (payload: ProblemForm) => getAxiosInstance().post(`/contest/problem?id=${payload.contestId}`, {
    title: payload.problemTitle,
    content: payload.problemContent,
    caution: payload.problemCaution,
    images: []
})

export const problemDeleteAxios = (payload: ProblemDeleteForm) => getAxiosInstance().delete(`/contest/problem/${payload.originId}/${payload.problemId}`)