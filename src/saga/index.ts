import { all } from "redux-saga/effects"
import boardSaga from "./modules/Board.saga";
import problemSaga from "./modules/Problem.saga";
import contestSaga from "./modules/Contest.saga";
import markSaga from "./modules/Mark.saga";
import eruriSaga from "./modules/EruriAuth.saga";
import participantSaga from "./modules/Participant.saga";
import qnaSaga from "./modules/QnA.saga";
import scoreboardSaga from "./modules/Scoreboard.saga";

export default function* rootSaga() {
    yield all([boardSaga(), problemSaga(), contestSaga(), markSaga(), eruriSaga(), participantSaga(), qnaSaga(), scoreboardSaga()])
}
