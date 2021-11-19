import getAxiosInstance from "../config/AxiosConfig";
import {ContestForm} from "../types/Contest.type";

export const contestReadAllAxios = () => getAxiosInstance().get(`/contest`)

export const contestReadOneAxios = (payload: string) => getAxiosInstance().get(`/contest/${payload}`)

export const contestCreateAxios = (payload: ContestForm) => getAxiosInstance().post('/contest', {
    "title": payload.title,
    "content": payload.content,
    "participantCategory": payload.isPublic ? 0 : 1,
    "language": payload.usableLanguages,
    "logo": payload.logoImageURL,
    "images": [],
    "applicationPeriodStartTime": payload.enrollStartTime.format("YYYY-MM-DDTHH:mm:ss"),
    "applicationPeriodEndTime": payload.enrollEndTime.format("YYYY-MM-DDTHH:mm:ss"),
    "startTime": payload.contestStartTime.format("YYYY-MM-DDTHH:mm:ss"),
    "endTime": payload.contestEndTime.format("YYYY-MM-DDTHH:mm:ss")
})

export const contestUpdateAxios = (payload: ContestForm) => getAxiosInstance().patch(`/contest/${payload.uuid}`, {
    "title": payload.title,
    "content": payload.content,
    "participantCategory": payload.isPublic ? 0 : 1,
    "language": payload.usableLanguages,
    "logo": payload.logoImageURL,
    "images": [],
    "applicationPeriodStartTime": payload.enrollStartTime.format("YYYY-MM-DDTHH:mm:ss"),
    "applicationPeriodEndTime": payload.enrollEndTime.format("YYYY-MM-DDTHH:mm:ss"),
    "startTime": payload.contestStartTime.format("YYYY-MM-DDTHH:mm:ss"),
    "endTime": payload.contestEndTime.format("YYYY-MM-DDTHH:mm:ss")
})

export const contestDeleteAxios = (payload: string) => getAxiosInstance().delete(`/contest/${payload}`)

export const contestRestoreAxios = (payload: string) => getAxiosInstance().patch(`/contest/re/${payload}`)