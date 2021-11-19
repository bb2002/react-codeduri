import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {MarkForm} from "../libraries/types/Mark.type";
import {markCodeReset, markCodeSubmit, markCodeTest} from "../redux/modules/Mark.redux";

export default function useMark() {
    const mark = useSelector((state: RootState) => state.mark)
    const dispatch = useDispatch()

    const submitCode = (form: MarkForm) => {
        dispatch(markCodeSubmit(form))
    }

    const testCode = (form: MarkForm) => {
        dispatch(markCodeTest(form))
    }

    const resetCode = () => {
        dispatch(markCodeReset())
    }

    return {
        mark,
        submitCode,
        testCode,
        resetCode
    }
}