import moment from "moment";
import {UserProfile} from "./User.type";

export type ParticipantRequestForm = {
    contestId: string       // 참가 신청할 대회의 ID
}

export type ParticipantReadAllForm = {
    contestId: string       // 불러올 대회의 ID
}

export type ParticipantReadOneForm = {
    contestId: string
    uniqueId: string
}

export type ParticipantUpdateForm = {
    contestId: string
    uniqueId: string | undefined
    level: ParticipantLevel
}

export type ParticipantDeleteForm = {
    contestId: string
    snsId: string
}

export type ParticipantItem = {
    no: number
    contestId: string
    level: ParticipantLevel
    profile: UserProfile
    createdAt: moment.Moment
}

export enum ParticipantLevel {
    NONE = -1,      // 아무것도 하지 않음.
    WAIT,      // 참가 대기
    ENROLL,    // 참가 중
    ASSISTANT, // 조교
    PROFESSOR = 3   // 교수
}