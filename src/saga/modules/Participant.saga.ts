import {
    ParticipantDeleteForm,
    ParticipantItem,
    ParticipantReadAllForm, ParticipantReadOneForm,
    ParticipantRequestForm,
    ParticipantUpdateForm
} from "../../libraries/types/Participant.type";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    PARTICIPANT_DELETE_ALL,
    PARTICIPANT_DELETE_ONE,
    PARTICIPANT_READ_ALL, PARTICIPANT_READ_ONE,
    PARTICIPANT_REQUEST,
    PARTICIPANT_UPDATE_ALL,
    PARTICIPANT_UPDATE_ONE,
    participantDeleteFailure,
    participantDeleteSuccess,
    participantLoading,
    participantReadAllFailure,
    participantReadAllSuccess, participantReadOneFailure, participantReadOneSuccess,
    participantRequestFailure,
    participantRequestSuccess,
    participantUpdateFailure,
    participantUpdateSuccess
} from "../../redux/modules/Participant.redux";
import {
    participantDeleteAllAxios,
    participantDeleteOneAxios,
    participantReadAllAxios, participantReadOneAxios,
    participantRequestAxios,
    participantUpdateAllAxios,
    participantUpdateOneAxios
} from "../../libraries/axios/Participant.axios";
import {networkErrorMacro} from "../../libraries/Utils";
import moment from "moment";
import {anyToParticipantItem} from "../../libraries/parser/AnyToItem";


function* requestParticipant(form: { payload: ParticipantRequestForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        yield call(participantRequestAxios, form.payload)
        yield put(participantRequestSuccess())
    } catch(ex) {
        networkErrorMacro(ex, participantRequestFailure)
    }

    yield put(participantLoading(false))
}

function* readAllParticipant(form: { payload: ParticipantReadAllForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        const response = yield call(participantReadAllAxios, form.payload)
        const data = response.data as any[]
        const items = [] as ParticipantItem[]

        data.forEach(value => items.push(anyToParticipantItem(value)))

        yield put(participantReadAllSuccess(items))
    } catch(ex) {
        networkErrorMacro(ex, participantReadAllFailure)
    }

    yield put(participantLoading(false))
}

function* readOneParticipant(form: { payload: ParticipantReadOneForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        const response = yield call(participantReadOneAxios, form.payload)
        const data = response.data as any
        const item = anyToParticipantItem(data)

        yield put(participantReadOneSuccess(item))
    } catch(ex) {
        networkErrorMacro(ex, participantReadOneFailure)
    }

    yield put(participantLoading(false))
}

function* updateAllParticipant(form: { payload: ParticipantUpdateForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        yield call(participantUpdateAllAxios, form.payload)
        yield put(participantUpdateSuccess())
    } catch(ex) {
        networkErrorMacro(ex, participantUpdateFailure)
    }

    yield put(participantLoading(false))
}

function* updateOneParticipant(form: { payload: ParticipantUpdateForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        yield call(participantUpdateOneAxios, form.payload)
        yield put(participantUpdateSuccess())
    } catch(ex) {
        networkErrorMacro(ex, participantUpdateFailure)
    }

    yield put(participantLoading(false))
}

function* deleteAllParticipant(form: { payload: ParticipantDeleteForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        yield call(participantDeleteAllAxios, form.payload)
        yield put(participantDeleteSuccess())
    } catch(ex) {
        networkErrorMacro(ex, participantDeleteFailure)
    }

    yield put(participantLoading(false))
}

function* deleteOneParticipant(form: { payload: ParticipantDeleteForm }) {
    yield put(participantLoading(true))

    try {
        // @ts-ignore
        yield call(participantDeleteOneAxios, form.payload)
        yield put(participantDeleteSuccess())
    } catch(ex) {
        networkErrorMacro(ex, participantDeleteFailure)
    }

    yield put(participantLoading(false))
}

export default function* participantSaga() {
    // @ts-ignore
    yield takeLatest(PARTICIPANT_REQUEST, requestParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_READ_ONE, readOneParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_READ_ALL, readAllParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_UPDATE_ALL, updateAllParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_UPDATE_ONE, updateOneParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_DELETE_ALL, deleteAllParticipant)
    // @ts-ignore
    yield takeLatest(PARTICIPANT_DELETE_ONE, deleteOneParticipant)
}