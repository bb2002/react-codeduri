import getAxiosInstance from "../config/AxiosConfig";
import {BoardCreatePayload, BoardUpdatePayload} from "../types/Board.type";

export const faqReadAllAxios = () => getAxiosInstance().get("/faq")

export const faqReadOneAxios = (no: number) => getAxiosInstance().get(`/faq/${no}`)

export const faqEditAxios = (form: BoardUpdatePayload) => getAxiosInstance().patch(`/faq/${form.no}`, {
    title: form.title,
    content: form.content,
    file: form.files.map(value => value.response)
})

export const faqCreateAxios = (form: BoardCreatePayload) => getAxiosInstance().post(`/faq`, {
    title: form.title,
    content: form.content,
    file: form.files.map(value => value.response)
})

export const faqRemoveAxios = (no: number) => getAxiosInstance().delete(`/faq/${no}`)