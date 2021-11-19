import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {ProblemDeleteForm, ProblemForm, ProblemUpdateForm} from "../libraries/types/Problem.type";
import {problemCreate, problemDelete, problemRead, problemReset, problemUpdate} from "../redux/modules/Problem.redux";

export default function useProblem() {
    const problem = useSelector((state: RootState) => state.problem)
    const dispatch = useDispatch()

    const readAllProblem = (contestId: string) => {
        dispatch(problemRead({
            contestId,
        }))
    }

    const updateProblem = (form: ProblemUpdateForm) => {
        dispatch(problemUpdate(form))
    }

    const createProblem = (form: ProblemForm) => {
        dispatch(problemCreate(form))
    }

    const deleteProblem = (form: ProblemDeleteForm) => {
        dispatch(problemDelete(form))
    }

    const resetProblem = () => {
        dispatch(problemReset())
    }

    return {
        problem,
        readAllProblem,
        updateProblem,
        resetProblem,
        createProblem,
        deleteProblem
    }
}