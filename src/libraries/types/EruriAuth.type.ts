export type EruriAuthForm = {
    userId: string,
    password: string,
    snsId: string
}

export type LoginCallbackParam = {
    id?: string
    accessToken?: string,
    refreshToken?: string
    isAuthed: boolean
}
