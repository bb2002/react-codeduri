import moment from "moment";
import {UploadFile} from "antd/es/upload/interface";

export type ProblemItem = {
    uuid: string                // 문제의 고유 번호
    no: number                  // 대회 내에서 문제 번호
    problemTitle: string        // 문제 제목
    problemContent: string      // 문제 본문
    problemCaution: string      // 문제 주의사항
    startTime: moment.Moment    // 문제 풀이 시간 (시작)
    endTime: moment.Moment      // 문제 풀이 시간 (종료)
    testCases: TestCaseItem[]   // 문제의 테스트케이스
    isDeleted: boolean          // 문제 삭제 여부
    images: UploadFile[]
}

export type ProblemForm = {
    problemTitle: string        // 문제 제목
    problemContent: string      // 문제 본문
    problemCaution: string      // 문제 주의사항
    contestId: string,
    images?: UploadFile[]
}

export type ProblemReadAllForm = {
    contestId: string
}

export type ProblemUpdateForm = {
    contestId: string
    problemId: string
    form: ProblemForm
    testCases: TestCaseItem[]
}

export type ProblemDeleteForm = {
    originId: string
    problemId: string
}

export type TestCaseItem = {
    exampleIn: string           // 입력값
    exampleOut: string          // 출력값
    isPublic: boolean           // 공개 여부
}
