import moment from "moment";

export type QnAForm = {
    no?: number         // 해당 글의 번호 (Update 전용)
    parentNo?: number   // 답변 달 글의 원글 번호 (Reply 전용)
    title: string       // 제목
    content: string     // 내용
    file: string[]      // 파일 업로드
    contestId: string   // 이 글이 속한 contest
    isSecret: boolean   // 비밀글인가?
}

export type QnAReadOneForm = {
    originId: string                // 대회 or 강좌 ID
    questionNo: number              // 질문글의 no
}

export type QnADeleteForm = {
    originId: string                // 대회 or 강좌 ID
    questionNo: number              // 질문글의 no
}


export type QnAItem = {
    no: number
    parentNo: number
    isSecret: boolean
    title: string
    file: string[]
    content: string
    reply: []
    replyCnt: number
    author: { name: string, sId: string }
    viewCnt: number
    createdAt: moment.Moment
}