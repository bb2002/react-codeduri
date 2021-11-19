import {UserProfile} from "../types/User.type";
import {ContestItem} from "../types/Contest.type";
import {ProblemItem, TestCaseItem} from "../types/Problem.type";
import {LANGUAGE_ARRAY} from "../config/SupportLanguage";
import moment from "moment";
import {ParticipantItem} from "../types/Participant.type";
import {ScoreboardItem} from "../types/Scoreboard.type";
import {BoardItem} from "../types/Board.type";
import {QnAItem} from "../types/QnA.type";

export function anyToUserProfile(data: any, accessToken?: string, refreshToken?: string): UserProfile {
    return {
        studentId: data.id,
        uniqueId: data.snsId,
        department: data.major,
        name: data.name,
        permission: data.class,
        emailAddress: data.email,
        phoneNumber: data.phone,
        profileImageURL: data.imageUrl,
        accessToken: accessToken,
        refreshToken: refreshToken
    } as UserProfile
}

export function anyToContestItem(data: any): ContestItem {
    return {
        _id: data._id,
        no: data.no,
        title: data.title,
        content: data.content,
        author: anyToUserProfile({ name: data.author, imageUrl: data.authorImageUrl }),
        isPublic: data.participantCategory === 0,
        lengthOfParticipant: data.participants,
        problems: data.problems?.map((problem: any) => anyToProblemItem(problem)),
        usableLanguages: LANGUAGE_ARRAY.filter(value => data.language?.indexOf(value) !== -1),
        enrollStartTime: moment(data.apStartTime),
        enrollEndTime: moment(data.apEndTime),
        contestStartTime: moment(data.startTime),
        contestEndTime: moment(data.endTime),
        logoImageURL: data.logo,
        isDeleted: data.delete === 1
    } as ContestItem
}

export function anyToProblemItem(data: any): ProblemItem {
    return {
        no: data.no,
        problemCaution: data.caution,
        testCases: data.testCase?.map((tc: any) => ({
            exampleIn: tc.input,
            exampleOut: tc.output,
            isPublic: tc.public === 1
        }) as TestCaseItem),
        uuid: data._id,
        problemContent: data.content,
        problemTitle: data.title,
        endTime: moment(data.endTime),
        startTime: moment(data.startTime),
        isDeleted: data.delete === 1,
        images: data.images ? data.images : []
    } as ProblemItem
}

export function anyToParticipantItem(data: any): ParticipantItem {
    return {
        no: data.no,
        contestId: data.contestId,
        level: data.confirm,
        profile: {
            name: data.snsId?.name,
            permission: data.snsId?.class,
            emailAddress: data.snsId?.email,
            phoneNumber: data.snsId?.phoneNumber,
            accessToken: undefined,
            profileImageURL: data.snsId?.imageUrl,
            refreshToken: undefined,
            studentId: data.snsId?.ID,
            department: data.snsId?.major,
            uniqueId: data.snsId?.sns
        } as UserProfile,
        createdAt: moment(data.createdAt)
    } as ParticipantItem
}

export function anyToScoreboardItem(data: any): ScoreboardItem {
    return {
        _id: data.originId,
        solverProfile: {
            name: data.solverId?.name,
            permission: data.solverId?.class,
            emailAddress: data.solverId?.email,
            phoneNumber: data.solverId?.phoneNumber,
            accessToken: undefined,
            profileImageURL: data.solverId?.imageUrl,
            refreshToken: undefined,
            studentId: data.solverId?.ID,
            department: data.solverId?.major,
            uniqueId: data.solverId?.sns
        } as UserProfile,
        createdAt: moment(data.createdAt),
        score: data.score,
        solvedProblem: anyToProblemItem(data.questionId),
        contestId: data.originId
    } as ScoreboardItem
}

export function anyToBoardItem(data: any): BoardItem {
    return {
        no: data.no,
        title: data.title,
        content: data.content,
        author: data.author,
        date: moment(data.updatedAt),
        files: [],
        viewCnt: data.views
    } as BoardItem
}

export function anyToQnAItem(data: any): QnAItem {
    return {
        no: data.no,
        isSecret: data.secret === 1,
        title: data.title,
        file: data.files,
        content: data.content,
        reply: typeof (data.reply) === "number" ? [] : data.reply,
        replyCnt: typeof (data.reply) === "number" ? data.reply : -1,
        author: data.author,
        viewCnt: Math.round(data.views / 2),
        createdAt: moment(data.updatedAt),
    } as QnAItem
}

