import getAxiosInstance from "../config/AxiosConfig"
import {BoardCreatePayload, BoardUpdatePayload} from "../types/Board.type";

export const noticeReadAllAxios = () => getAxiosInstance().get("/notice")

export const noticeReadOneAxios = (no: number) => getAxiosInstance().get(`/notice/${no}`)

export const noticeCreateAxios = (form: BoardCreatePayload) => getAxiosInstance().post(`/notice`, {
    title: form.title,
    content: form.content,
    file: form.files.map(value => value.response)
})

export const noticeUpdateAxios = (form: BoardUpdatePayload) => getAxiosInstance().patch(`/notice/${form.no}`, {
    title: form.title,
    content: form.content,
    file: form.files.map(value => value.response)
})

export const noticeDeleteAxios = (no: number) => getAxiosInstance().delete(`/notice/${no}`)