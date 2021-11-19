export type UserProfile = {
    studentId: string           // 학번
    uniqueId: string            // 고유번호 (SNS 로그인 시 사용되는 ID)
    department: string          // 학과
    name: string                // 이름
    permission: ProfileLevel    // 권한 수준
    emailAddress: string        // 이메일 주소
    phoneNumber: string         // 전화번호
    profileImageURL: string     // 프로필 사진 이미지 URL

    accessToken?: string        // accessToken
    refreshToken?: string       // refreshToken
}

export enum ProfileLevel {
    GUEST = -1,
    STUDENT = 0,
    PROFESSOR = 1,
    ADMIN = 2
}