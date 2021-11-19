import moment from "moment";
import {ProblemItem} from "./Problem.type";
import {UserProfile} from "./User.type";

export type GetScoreboardForm = {
    originId: string | undefined
    questionId: string | undefined
    solverId: string | undefined
    isSorting: boolean | undefined
}

export type ScoreboardItem = {
    _id: string
    contestId: string
    solvedProblem: ProblemItem
    solverProfile: UserProfile
    score: number
    createdAt: moment.Moment
}