import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {
    contestCreate,
    contestDelete,
    contestReadAll,
    contestReadOne, contestReset, contestRestore,
    contestUpdate
} from "../redux/modules/Contest.redux";
import {ContestForm} from "../libraries/types/Contest.type";

export default function useContest() {
    const contest = useSelector((state: RootState) => state.contest)
    const dispatch = useDispatch()

    const readOneContest = (contestUUID: string) => {
        dispatch(contestReadOne(contestUUID))
    }

    const readAllContest = () => {
        dispatch(contestReadAll())
    }

    const createContest = (form: ContestForm) => {
        dispatch(contestCreate(form))
    }

    const updateContest = (form: ContestForm) => {
        dispatch(contestUpdate(form))
    }

    const deleteContest = (uuid: string) => {
        dispatch(contestDelete(uuid))
    }

    const restoreContest = (uuid: string) => {
        dispatch(contestRestore(uuid))
    }

    const resetContest = () => {
        dispatch(contestReset())
    }

    return {
        contest,
        readOneContest,
        readAllContest,
        createContest,
        updateContest,
        deleteContest,
        restoreContest,
        resetContest
    }
}