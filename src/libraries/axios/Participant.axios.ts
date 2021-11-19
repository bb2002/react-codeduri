import getAxiosInstance from "../config/AxiosConfig";
import {
    ParticipantDeleteForm,
    ParticipantReadAllForm, ParticipantReadOneForm,
    ParticipantRequestForm,
    ParticipantUpdateForm
} from "../types/Participant.type";

export const participantRequestAxios = (form: ParticipantRequestForm) => getAxiosInstance().post(`/contest/participant`, {
    contestId: form.contestId
})

export const participantReadAllAxios = (form: ParticipantReadAllForm) => getAxiosInstance().get(`/contest/participant/${form.contestId}`)

export const participantReadOneAxios = (form: ParticipantReadOneForm) => getAxiosInstance().get(`/contest/participant/${form.contestId}/${form.uniqueId}`)

export const participantUpdateAllAxios = (form: ParticipantUpdateForm) => getAxiosInstance().patch(`/contest/participant/${form.contestId}?confirm=${form.level}`)

export const participantUpdateOneAxios = (form: ParticipantUpdateForm) => getAxiosInstance().patch(`/contest/participant/${form.contestId}/${form.uniqueId}?confirm=${form.level}`)

export const participantDeleteAllAxios = (form: ParticipantDeleteForm) => getAxiosInstance().delete(`/contest/participant/${form.contestId}`)

export const participantDeleteOneAxios = (form: ParticipantDeleteForm) => getAxiosInstance().delete(`/contest/participant/${form.contestId}/${form.snsId}`)
