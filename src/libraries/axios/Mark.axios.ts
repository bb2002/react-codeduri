import getAxiosInstance from "../config/AxiosConfig";
import {MarkForm, ReadCodeForm} from "../types/Mark.type";

export const codeSubmitAxios = (form: MarkForm) => {
    const axios = getAxiosInstance()

    axios.defaults.timeout = 99999

    return axios.post(`/contest/submit?id=${form.contestId}&pid=${form.problemId}&uid=${form.studentId}`, {
        language: form.language,
        code: form.sourceCode
    })
}


export const codeTestAxios = (form: MarkForm) => {
    const axios = getAxiosInstance()

    axios.defaults.timeout = 99999

    return axios.post(`/contest/test?id=${form.contestId}&pid=${form.problemId}&uid=${form.studentId}`, {
        language: form.language,
        code: form.sourceCode
    })
}

export const readCodeAxiosForProfessor = (form: ReadCodeForm) => getAxiosInstance().get(`/contest/current/code?id=${form.contestId}&pid=${form.problemId}&uid=${form.studentId}`)

export const readCodeAxios = (form: ReadCodeForm) => getAxiosInstance().get(`/contest/submit/${form.language}?id=${form.problemId}&pid=${form.problemId}&uid=${form.studentId}`)