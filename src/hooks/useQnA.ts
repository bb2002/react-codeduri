import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {qnaCreate, qnaDelete, qnaReadAll, qnaReadOne, qnaReset, qnaUpdate} from "../redux/modules/Qna.redux";
import {QnADeleteForm, QnAForm, QnAReadOneForm} from "../libraries/types/QnA.type";

export default function useQnA() {
    const qna = useSelector((state: RootState) => state.qna)
    const dispatch = useDispatch()

    const readAllQnA = (originId: string) => {
        dispatch(qnaReadAll(originId))
    }

    const readOneQnA = (form: QnAReadOneForm) => {
        dispatch(qnaReadOne(form))
    }

    const createQnA = (form: QnAForm) => {
        dispatch(qnaCreate(form))
    }

    const updateQnA = (form: QnAForm) => {
        dispatch(qnaUpdate(form))
    }

    const deleteQnA = (form: QnADeleteForm) => {
        dispatch(qnaDelete(form))
    }

    const resetQnA = () => {
        dispatch(qnaReset())
    }

    return {
        qna,
        readAllQnA,
        readOneQnA,
        createQnA,
        updateQnA,
        deleteQnA,
        resetQnA
    }
}