import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {loginProfile, loginReset} from "../redux/modules/Login.redux";
import {useHistory} from "react-router";
import {message} from "antd";
import {ProfileLevel, UserProfile} from "../libraries/types/User.type";

/**
 * 로그인 데이터를 sessionStorage 에 저장합니다.
 * @param profile       저장할 프로필 데이터
 */
export function saveLoginDataInStorage(profile: UserProfile) {
    window.sessionStorage.setItem("profile", JSON.stringify(profile))
}

/**
 * 저장된 로그인 데이터를 불러옵니다.
 * @return      로그인 데이터, 단 로그인되지 않은 경우 undefined
 */
export function getLoginDataFromStorage(): UserProfile | undefined {
    const jsonString = window.sessionStorage.getItem("profile")
    if(jsonString) {
        return JSON.parse(jsonString) as UserProfile
    } else {
        return undefined
    }
}

export function checkMyPermissionBetween(other: ProfileLevel): boolean {
    const profile = getLoginDataFromStorage()
    return other <= (profile ? profile.permission : -1)
}

export default function useLogin() {
    const login = useSelector((root: RootState) => root.login)
    const history = useHistory()
    const dispatch = useDispatch()

    const saveLoginDataInRedux = () => {
        // 로그인 정보를 Redux 상태에 저장합니다.
        const profile = getLoginDataFromStorage()
        if(profile) dispatch(loginProfile(profile))
    }

    const logout = () => {
        dispatch(loginReset())
        window.sessionStorage.clear()
        history.push("/")
        message.success("로그아웃 되었습니다.")
    }

    const goToLobby = () => history.push("/")

    return {
        login,
        saveLoginDataInStorage,
        saveLoginDataInRedux,
        goToLobby,
        logout
    }
}