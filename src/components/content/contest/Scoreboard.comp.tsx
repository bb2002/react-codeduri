import React, { useState } from 'react';
import Title from "antd/es/typography/Title";
import { Alert, Button, Card, Modal, Spin } from "antd";
import { ParticipantItem } from "../../../libraries/types/Participant.type";
import { ScoreboardItem } from "../../../libraries/types/Scoreboard.type";
import "../../../stylesheet/contest/Scoreboard.css"
import { ProblemItem } from "../../../libraries/types/Problem.type";
import { Language } from "../../../libraries/config/SupportLanguage";
import CodeEditor from "../../common/CodeEditor";
import { readCodeAxiosForProfessor } from "../../../libraries/axios/Mark.axios";

interface ScoreboardCompProps {
    participants?: ParticipantItem[]
    scoreboards?: ScoreboardItem[]
    problems?: ProblemItem[]
    originId: string
}

interface CodeViewerType {
    visible: boolean
    loading: boolean
    code: string
}

const ScoreboardComp = ({ participants, scoreboards, problems, originId }: ScoreboardCompProps) => {
    const [codeViewer, setCodeViewer] = useState<CodeViewerType>({ visible: false, loading: false, code: "" })

    const onCodeViewerOpenHandler = async (problemId: string, studentId: string) => {
        setCodeViewer({
            code: "",
            visible: true,
            loading: true
        })

        try {
            const response = await readCodeAxiosForProfessor({
                contestId: originId,
                problemId: problemId,
                studentId: studentId,
                language: Language.C        // 사용하지 않는 값
            })

            setCodeViewer({
                loading: false,
                code: response.data,
                visible: true
            })
        } catch (ex) {
            setCodeViewer({
                loading: false,
                code: ex.message,
                visible: true
            })
        }
    }

    if (participants && problems && scoreboards) {
        return (
            <div>
                <Modal
                    title="Code Viewer"
                    centered
                    okButtonProps={{ style: { visibility: "hidden" } }}
                    cancelButtonProps={{ style: { visibility: "hidden" } }}
                    visible={codeViewer.visible}
                    onCancel={() => setCodeViewer({ ...codeViewer, visible: false })}
                    width={1000}>
                    {
                        codeViewer.loading ? (
                            <Spin size="large" />
                        ) : (
                            <CodeEditor
                                mode={Language.JAVA}
                                width="100%"
                                height="500px"
                                value={codeViewer.code}
                                readonly={true}
                                onValueChanged={(value: string) => { }} />
                        )
                    }

                </Modal>

                <Title level={2}>성취도</Title>

                {
                    problems.length === 0 && (
                        <Alert message="생성된 문제가 없어 스코어보드를 볼 수 없습니다." type="warning" showIcon />
                    )
                }

                {
                    participants.length === 0 && (
                        <Alert message="참가자가 아무도 없어 스코어보드를 볼 수 없습니다." type="warning" showIcon />
                    )
                }

                {
                    (problems.length !== 0 && participants.length !== 0) && (
                        <>
                            <Card>
                                <div className="color-info">
                                    <div>
                                        <div id="badge" style={{ backgroundColor: "#52C41A" }} />
                                        <p style={{ margin: 0, padding: 0 }}>모든 테스트케이스를 통과했습니다.</p>
                                    </div>
                                    <div>
                                        <div id="badge" style={{ backgroundColor: "#1890FF" }} />
                                        <p style={{ margin: 0, padding: 0 }}>일부 테스트케이스를 통과하지 못했습니다.</p>
                                    </div>
                                    <div>
                                        <div id="badge" style={{ backgroundColor: "#B8B8B8" }} />
                                        <p style={{ margin: 0, padding: 0 }}>아직 제출하지 않았습니다.</p>
                                    </div>
                                </div>
                            </Card>

                            <div id="table-container">
                                <table className="scoreboard-table">
                                    <thead>
                                        <tr>
                                            <th />
                                            {
                                                problems.map(value => (<th>{value.problemTitle}</th>))
                                            }
                                            <th />
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            participants.map(user => {
                                                const userScoreboards = scoreboards?.filter(value => value.solverProfile.uniqueId === user.profile.uniqueId)

                                                return (
                                                    <tr>
                                                        <td>
                                                            <p>{user.profile.name} ({user.profile.studentId})</p>
                                                            <p>{user.profile.emailAddress}</p>
                                                        </td>

                                                        {
                                                            problems.map(problem => {
                                                                const idx = userScoreboards.findIndex(scoreboard => scoreboard.solvedProblem.uuid === problem.uuid)

                                                                if (idx === -1) {
                                                                    // 제출 안한 경우
                                                                    return (
                                                                        <td>
                                                                            <Button type="text"
                                                                                style={{ backgroundColor: "#B8B8B8", color: "white" }}
                                                                                size="small"
                                                                                disabled={true}
                                                                                onClick={() => onCodeViewerOpenHandler(problem.uuid, user.profile.studentId)}>
                                                                                제출안됨
                                                                            </Button>
                                                                        </td>
                                                                    )
                                                                } else {
                                                                    if(userScoreboards[idx].score === 100) {
                                                                        return (
                                                                            <td>
                                                                                <Button type="primary" size="small"
                                                                                        style={{ backgroundColor: "#52C41A", color: "white", border: "none" }}
                                                                                        onClick={() => onCodeViewerOpenHandler(problem.uuid, user.profile.studentId)}>
                                                                                    {Math.round(userScoreboards[idx].score)}점
                                                                                </Button>
                                                                            </td>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <td>
                                                                                <Button type="primary" size="small"
                                                                                        onClick={() => onCodeViewerOpenHandler(problem.uuid, user.profile.studentId)}>
                                                                                    {Math.round(userScoreboards[idx].score)}점
                                                                                </Button>
                                                                            </td>
                                                                        )
                                                                    }

                                                                }
                                                            })
                                                        }
                                                        <td>
                                                            {
                                                                function () {
                                                                    let score = 0;

                                                                    problems?.forEach(problem => {
                                                                        const data = userScoreboards.filter(score => score.solvedProblem.uuid === problem.uuid)
                                                                        if (data.length !== 0) score += data[0].score
                                                                    })

                                                                    return Math.round(score);
                                                                }()
                                                            }
                                                            점/{problems?.length * 100}점
                                                        </td>
                                                        <td>
                                                            {
                                                                function () {
                                                                    let myScore = 0
                                                                    let myRank = 1
                                                                    problems?.forEach(problem => {
                                                                        const data = userScoreboards.filter(score => score.solvedProblem.uuid === problem.uuid)
                                                                        if (data.length !== 0) myScore += data[0].score
                                                                    })

                                                                    const otherScoreboards = scoreboards?.filter(value => value.solverProfile.uniqueId !== user.profile.uniqueId)
                                                                    participants?.forEach(partici => {
                                                                        let otherScore = 0
                                                                        problems?.forEach(problem => {
                                                                            const data = otherScoreboards.filter(scoreboard => scoreboard.solverProfile.uniqueId === partici.profile.uniqueId).filter(score => score.solvedProblem.uuid === problem.uuid)
                                                                            if (data.length !== 0) otherScore += data[0].score
                                                                        })

                                                                        if (otherScore > myScore) {
                                                                            myRank++
                                                                        }
                                                                    })

                                                                    return myRank
                                                                }()
                                                            }등
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }
            </div>
        );
    } else {
        return (
            <Spin size="large" />
        )
    }


};

export default ScoreboardComp;