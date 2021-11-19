import {Language} from "../config/SupportLanguage";
import moment from "moment";
import {ProblemItem} from "./Problem.type";
import {UserProfile} from "./User.type";

export type ContestItem = {
    _id: string
    no: number
    title: string
    content: string
    author: UserProfile
    isPublic: boolean
    lengthOfParticipant: number
    problems: ProblemItem[]
    usableLanguages: Language[]
    enrollStartTime: moment.Moment
    enrollEndTime: moment.Moment
    contestStartTime: moment.Moment
    contestEndTime: moment.Moment
    logoImageURL: string
    isDeleted: boolean
}

export type ContestForm = {
    uuid?: string
    title: string
    content: string
    isPublic: boolean
    usableLanguages: Language[]
    logoImageURL: string
    enrollStartTime: moment.Moment
    enrollEndTime: moment.Moment
    contestStartTime: moment.Moment
    contestEndTime: moment.Moment
}

