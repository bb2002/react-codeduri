import React, {useEffect} from 'react';
import IdeSkelComp from "../IDESkel.comp";
import useProblem from "../../../hooks/useProblem";
import {HttpResultCode} from "../../../libraries/Utils";
import Loading from "../../atom/Loading";
import useContest from "../../../hooks/useContest";

interface IdeReadCompProps {
    originUUID: string      // 오리진의 UUID
    problemUUID: string     // 그 Origin 에 속한 문제의 no
}

const IdeReaderComp = ({ originUUID, problemUUID }: IdeReadCompProps) => {
    const { problem, readAllProblem } = useProblem()
    const { contest, readOneContest } = useContest()

    useEffect(() => {
        readAllProblem(originUUID)
    }, [originUUID, problemUUID])

    useEffect(() => {
        readOneContest(originUUID)
    }, [originUUID])

    if(problem.read.result !== undefined && problem.read.state === HttpResultCode.HTTP_200) {
        return (
            <IdeSkelComp
                problemUUID={problemUUID}
                problemItems={problem.read.result.filter(value => !value.isDeleted)}
                originUUID={originUUID}
                finishTime={contest.readOne.result?.contestEndTime}
                bUseEditMode={false} />
        )
    } else {
        return (
            <Loading />
        )
    }
};

export default IdeReaderComp;