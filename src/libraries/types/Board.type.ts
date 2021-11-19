import moment from "moment";
import {UploadFile} from "antd/es/upload/interface";


// export type BoardItem = {
//     no: number
//     title: string
//     content: string
//     author: string
//     date: string
//     files: UploadFile[]
//     filesForAxios?: string[]     // Axios 에 요청 보내기 직전에만 사용
// }

export type BoardItem = {
    no: number
    title: string
    files: UploadFile[]
    content: string
    author: string
    viewCnt: number
    date: moment.Moment
}

export type BoardCreatePayload = {
    title: string
    content: string
    files: UploadFile[]
    axios: BoardCreateAxios
}

export type BoardReadOnePayload = {
    item: number
    axios: BoardReadOneAxios
}

export type BoardReadAllPayload = {
    axios: BoardReadAllAxios
}

export type BoardUpdatePayload = {
    no: number
    title: string
    content: string
    files: UploadFile[]
    axios: BoardUpdateAxios
}

export type BoardDeletePayload = {
    no: number
    axios: BoardDeleteAxios
}

export type BoardReadOneAxios = (no: number) => void
export type BoardReadAllAxios = () => void
export type BoardCreateAxios = (form: BoardCreatePayload) => void
export type BoardUpdateAxios = (form: BoardUpdatePayload) => void
export type BoardDeleteAxios = (no: number) => void

