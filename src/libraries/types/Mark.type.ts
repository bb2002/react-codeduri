import {Language} from "../config/SupportLanguage";

/**
 * 채점기 요청시 아래 양식을 맞춰 보냅니다.
 */
export type MarkForm = {
    contestId: string       // 대회의 ID
    problemId: string       // 문제의 ID
    studentId: string       // 학번
    sourceCode: string      // 소스코드
    language: Language      // 컴파일 언어
}

/**
 * 채점 결과 발송시 아래 양식에 맞춰 받습니다.
 */
export type MarkSubmitResult = {
    pass: boolean[]         // 성공 여부
    score: number
    error?: string
}

/**
 * 테스트 결과 발송시 아래 양식에 맞춰 받습니다.
 */
export type MarkTestResult = {
    items: MarkTestItem[],
    error: string | undefined
}

export type MarkTestItem = {
    inputValue: string,     // 입력 값
    outputValue: string,    // 출력 값 (기대)
    resultValue: string,    // 실행 결과
    isPass: boolean         // 성공 여부
}

export type ReadCodeForm = {
    language: Language,
    contestId: string,
    problemId: string,
    studentId: string
}