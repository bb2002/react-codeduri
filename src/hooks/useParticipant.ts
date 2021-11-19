import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {
    ParticipantDeleteForm,
    ParticipantReadAllForm, ParticipantReadOneForm,
    ParticipantRequestForm,
    ParticipantUpdateForm
} from "../libraries/types/Participant.type";
import {
    participant_HACK_resetUpdate,
    participantDeleteAll,
    participantDeleteOne,
    participantReadAll, participantReadOne,
    participantRequest, participantReset,
    participantUpdateAll,
    participantUpdateOne
} from "../redux/modules/Participant.redux";

export default function useParticipant() {
    const participate = useSelector((state: RootState) => state.participant)
    const dispatch = useDispatch()

    const requestParticipant = (form: ParticipantRequestForm) => {
        dispatch(participantRequest(form))
    }

    const readAllParticipant = (form: ParticipantReadAllForm) => {
        dispatch(participantReadAll(form))
    }

    const readOneParticipant = (form: ParticipantReadOneForm) => {
        dispatch(participantReadOne(form))
    }

    const updateOneParticipant = (form: ParticipantUpdateForm) => {
        dispatch(participantUpdateOne(form))
    }

    const updateAllParticipant = (form: ParticipantUpdateForm) => {
        dispatch(participantUpdateAll(form))
    }

    const deleteOneParticipant = (form: ParticipantDeleteForm) => {
        dispatch(participantDeleteOne(form))
    }

    const deleteAllParticipant = (form: ParticipantDeleteForm) => {
        dispatch(participantDeleteAll(form))
    }

    const resetParticipant = () => {
        dispatch(participantReset())
    }

    const resetOnlyUpdate_HACK = () => {
        dispatch(participant_HACK_resetUpdate())
    }

    return {
        participate,
        requestParticipant,
        readAllParticipant,
        readOneParticipant,
        updateOneParticipant,
        updateAllParticipant,
        deleteOneParticipant,
        deleteAllParticipant,
        resetParticipant,

        resetOnlyUpdate_HACK
    }
}