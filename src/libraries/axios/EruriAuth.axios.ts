import getAxiosInstance from "../config/AxiosConfig";
import {EruriAuthForm} from "../types/EruriAuth.type";

export const getEruriProfileAxios = (token: string) => getAxiosInstance().get('/profile', {
    headers: {Authorization: `Bearer ${token}`}
})

export const authEruriAxios = (form: EruriAuthForm) => getAxiosInstance().post('/auth/login', {
    username: `${form.userId} ${form.snsId}`,
    password: form.password
})