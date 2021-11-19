import React from 'react';
import {Route, Switch} from "react-router-dom";
import QnAReadAllComp from "./QnAReadAll.comp";
import QnAReadOneComp from "./QnAReadOne.comp";
import QnAWriteComp from "./QnAWrite.comp";
import QnAEditComp from "./QnAEdit.comp";
import {ParticipantLevel} from "../../../libraries/types/Participant.type";

interface QnARouterCompProps {
    currentLevel: ParticipantLevel
}

const QnARouterComp = ({ currentLevel }: QnARouterCompProps) => {
    return (
        <Switch>
            <Route exact path="/contest/:contestId" render={({ match }: any) => <QnAReadAllComp currentLevel={currentLevel} match={match}/>} />
            <Route exact path="/contest/:contestId/write" component={QnAWriteComp} />
            <Route exact path="/contest/:contestId/read/:qno" component={QnAReadOneComp} />
            <Route exact path="/contest/:contestId/edit/:qno" component={QnAEditComp} />
        </Switch>
    );
};

export default QnARouterComp;