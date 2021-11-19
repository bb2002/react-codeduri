import {GetScoreboardForm} from "../libraries/types/Scoreboard.type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {scoreboardGet} from "../redux/modules/Scoreboard.redux";

export default function useScoreboard() {
    const scoreboard = useSelector((state: RootState) => state.scoreboard)
    const dispatch = useDispatch()

    const getScoreboardItems = (form: GetScoreboardForm) => {
        dispatch(scoreboardGet(form))
    }

    return {
        scoreboard,
        getScoreboardItems
    }
}