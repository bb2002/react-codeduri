import React, {useEffect, useState} from 'react';
import useProblem from "../../../hooks/useProblem";
import {ProblemForm, TestCaseItem} from "../../../libraries/types/Problem.type";
import {checkAndShowErrorMessage, HttpResultCode} from "../../../libraries/Utils";
import IdeSkelComp from "../IDESkel.comp";
import Loading from "../../atom/Loading";
import ProblemEditorComp from "./ProblemEditor.comp";
import HttpRequestError from "../../error/HttpRequestError.comp";
import {message} from 'antd';
import useLogin from "../../../hooks/useLogin";
import {ParticipantLevel} from "../../../libraries/types/Participant.type";
import {useHistory} from "react-router";
import useParticipant from "../../../hooks/useParticipant";

interface IDEEditorCompProps {
    originUUID: string      // 오리진의 UUID
    problemUUID: string     // 그 Origin 에 속한 문제의 UUID
}

const IdeEditorComp = ({ originUUID, problemUUID }: IDEEditorCompProps) => {
    const { problem, readAllProblem, updateProblem, resetProblem } = useProblem()
    const { participate, readAllParticipant } = useParticipant()
    const { login } = useLogin()
    const history = useHistory()
    const [editModeVisible, setEditModeVisible] = useState(false)

    useEffect(() => {
        readAllProblem(originUUID)
        readAllParticipant({
            contestId: originUUID
        })
    }, [originUUID, problemUUID])

    useEffect(() => {
        if(checkAndShowErrorMessage(problem.update.state) && problem.update.state === HttpResultCode.HTTP_200) {
            message.success("저장되었습니다.")

            resetProblem()                              // 데이터 초기화 후
            readAllProblem(originUUID)                // 다시 받아오기
        }
    }, [problem.update.state])

    useEffect(() => {
        if(login.profile !== undefined && participate.readAll.result !== undefined) {
            const me = participate.readAll.result.filter(value => login.profile?.uniqueId === value.profile.uniqueId)[0]

            if(me !== undefined) {
                if(me.level !== ParticipantLevel.ASSISTANT && me.level !== ParticipantLevel.PROFESSOR) {
                    message.error("접근 권한이 없습니다.")
                    history.replace("/")
                }
            } else {
                message.error("접근 권한이 없습니다.")
                history.replace("/")
            }
        }
    }, [login.profile, participate.readAll])

    const onEditButtonPressed = () => {
        setEditModeVisible(true)
    }

    const onSaveButtonPressed = (problemForm: ProblemForm, testCases: TestCaseItem[]) => {
        updateProblem({
            contestId: originUUID,
            problemId: problemUUID,
            testCases: testCases,
            form: problemForm
        })
    }

    const onCancelButtonPressed = () => {
        setEditModeVisible(false)
    }

    if(problem.read.result !== undefined && problem.read.state === HttpResultCode.HTTP_200) {
        const tmp = problem.read.result.filter(value => value.uuid === problemUUID)

        if(tmp.length === 0) {
            return (
                <HttpRequestError httpCode={404} />
            )
        } else {
            const problemItem = tmp[0]
            const testCases = problemItem.testCases

            return (
                <>
                    <ProblemEditorComp
                        visible={editModeVisible}
                        onSavePressed={onSaveButtonPressed}
                        onCancelPressed={onCancelButtonPressed}
                        defaultTestCases={testCases}
                        originId={originUUID}
                        defaultProblemItem={problemItem}
                        loading={problem.loading}
                    />
                    <IdeSkelComp
                        problemUUID={problemUUID}
                        problemItems={problem.read.result}
                        originUUID={originUUID}
                        bUseEditMode={true}
                        onEditButtonPressed={onEditButtonPressed} />
                </>
            )
        }

    } else {
        return (
            <Loading />
        )
    }
};

export default IdeEditorComp;