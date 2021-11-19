import axios from "axios"
import {getLoginDataFromStorage} from "../../hooks/useLogin";

const getAxiosInstance = () => {
    const profile = getLoginDataFromStorage()

    let header: any = { "X-Requested-With": "XMLHttpRequest" }

    if(profile?.accessToken) {
        header["Authorization"] = `Bearer ${profile.accessToken}`
    }

    return axios.create({
        baseURL: "https://codeduri.saintdev.kr/api",
        timeout: 15000,
        headers: header,
    })
}

export const FILE_UPLOAD_SERVER = 'https://codeduri.saintdev.kr/api/file'
export const FILE_DOWNLOAD_SERVER = "https://codeduri.saintdev.kr/api/file?uuid="
export const SSO_LOGIN_ROOT = "https://codeduri.saintdev.kr/api"

export default getAxiosInstance
