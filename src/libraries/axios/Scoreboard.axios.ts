import getAxiosInstance from "../config/AxiosConfig";
import {GetScoreboardForm} from "../types/Scoreboard.type";

export const getScoreboardAxios = (form: GetScoreboardForm) => {
    let url = "/scoreboard"
    if(form.isSorting) {
        url += "?sorting=true"
    } else {
        url += "?sorting=false"
    }

    if(form.originId) {
        url += `&originId=${form.originId}`
    }

    if(form.questionId) {
        url += `&questionId=${form.questionId}`
    }

    if(form.solverId) {
        url += `&solverId=${form.solverId}`
    }

    return getAxiosInstance().get(url.toString())
}