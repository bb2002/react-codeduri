import { combineReducers } from "redux";
import board from "./modules/Board.redux";
import problem from "./modules/Problem.redux";
import contest from "./modules/Contest.redux";
import mark from "./modules/Mark.redux";
import eruri from "./modules/EruriAuth.redux";
import login from "./modules/Login.redux";
import participant from "./modules/Participant.redux";
import qna from "./modules/Qna.redux";
import scoreboard from "./modules/Scoreboard.redux";

const rootReducer = combineReducers({
    board,
    problem,
    contest,
    mark,
    eruri,
    login,
    participant,
    qna,
    scoreboard
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
