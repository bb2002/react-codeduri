import getAxiosInstance from "../config/AxiosConfig";
import {QnADeleteForm, QnAForm, QnAReadOneForm} from "../types/QnA.type";

export const qnaCreateAxios = (form: QnAForm) => getAxiosInstance().post(`/coqna/${form.contestId}`, {
    title: form.title,
    content: form.content,
    file: form.file,
    secret: form.isSecret ? 1 : 0,
    parentNo: Number(form.parentNo)
})

export const qnaReadAllAxios = (originId: string) => getAxiosInstance().get(`/coqna/${originId}`)

export const qnaReadOneAxios = (form: QnAReadOneForm) => getAxiosInstance().get(`/coqna/${form.originId}/${form.questionNo}`)

export const qnaUpdateAxios = (form: QnAForm) => getAxiosInstance().patch(`/coqna/${form.contestId}/${form.no}`, {
    title: form.title,
    content: form.content,
    file: form.file
})

export const qnaDeleteAxios = (form: QnADeleteForm) => getAxiosInstance().delete(`/coqna/${form.originId}/${form.questionNo}`)
