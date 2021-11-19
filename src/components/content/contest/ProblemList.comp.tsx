import React, {useState} from 'react';
import {Link} from "react-router-dom"
import Title from "antd/es/typography/Title";
import {Button, message, Table} from "antd";
import {DeleteOutlined, EditOutlined, FormOutlined, PlusOutlined} from "@ant-design/icons";
import {ProblemForm, ProblemItem, TestCaseItem} from "../../../libraries/types/Problem.type";
import {ParticipantLevel} from "../../../libraries/types/Participant.type";
import {ScoreboardItem} from "../../../libraries/types/Scoreboard.type";
import useLogin from "../../../hooks/useLogin";
import {useHistory} from "react-router";
import ProblemEditorComp from "../../ide/editor/ProblemEditor.comp";
import useProblem from "../../../hooks/useProblem";

const columns = [
    {
        title: 'icon',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: 'headline',
        dataIndex: 'headline',
        key: 'headline',
        width: 1100
    },
    {
        title: 'score',
        dataIndex: 'score',
        key: 'score',
        width: 150
    },
    {
        title: 'icon2',
        dataIndex: 'icon2',
        key: 'icon2'
    },
    {
        title: "editIcon",
        dataIndex: "editIcon",
        key: "editIcon"
    }
]

// @ts-ignore                   IDE 쪽 버그로 인해서 무시 처리
interface ProblemListCompProp {
    originId: string
    problems: ProblemItem[]
    scoreboards: ScoreboardItem[]
    modalLoading: boolean
    currentLevel: ParticipantLevel
    onProblemCreateButtonPressed: (form: ProblemForm) => void
    onProblemDeleteButtonPressed: (targetProblemId: string) => void
    onProblemEditButtonPressed: (problemForm: ProblemForm, testcases: TestCaseItem[], problemId: string) => void
}

const ProblemListComp = ({ originId, problems, scoreboards, modalLoading, currentLevel, onProblemCreateButtonPressed, onProblemDeleteButtonPressed, onProblemEditButtonPressed }: ProblemListCompProp) => {
    const [ editorVisible, setEditorVisible ] = useState(false)
    const [ selectedProblem, setSelectedProblem ] = useState<ProblemItem | undefined>()
    const { login } = useLogin()
    const history = useHistory()

    return (
        <div>
            {
                selectedProblem && (
                    <ProblemEditorComp
                        visible={editorVisible} loading={modalLoading}
                        originId={originId} defaultProblemItem={selectedProblem}
                        defaultTestCases={selectedProblem.testCases}
                        onSavePressed={(form, testcases) => {
                            onProblemEditButtonPressed(form, testcases, selectedProblem.uuid)
                            setEditorVisible(false)
                        }}
                        onCancelPressed={() => setEditorVisible(false)} />
                )
            }


            <div style={{ display: "flex", alignItems: "center" }}>
                <Title level={2} style={{ margin: 0, marginRight: "auto" }}>문제</Title>
                {
                    (currentLevel === ParticipantLevel.PROFESSOR || currentLevel === ParticipantLevel.ASSISTANT) && (
                        <Button
                            type="primary" shape="round" icon={<PlusOutlined />}
                            size="middle" loading={modalLoading}
                            style={{ paddingTop: 0 }}
                            onClick={() => onProblemCreateButtonPressed({
                                problemTitle: "제목 없는 문제",
                                problemContent: "",
                                problemCaution: "",
                                contestId: originId
                            } as ProblemForm)} />
                    )
                }
            </div>
            <Table
                columns={columns}
                pagination={false}
                style={{ marginTop: 30 }}
                showHeader={false}
                dataSource={problems.filter(value => !value.isDeleted).map(value => ({
                    key: value.uuid,
                    headline: <Link to={`/ide/${currentLevel === ParticipantLevel.PROFESSOR ? "edit/" : ""}contest/${originId}/${value.uuid}`}>{value.problemTitle}</Link>,
                    icon: <FormOutlined style={{ fontSize: 20 }} />,
                    score: (<b><div style = {{color: '#1890FF'}}>{
                        function() {
                            if(login.profile) {
                                const score = scoreboards.filter(score => score.solvedProblem.uuid === value.uuid).filter(score => score.solverProfile.uniqueId === login.profile?.uniqueId)
                                if(score.length === 0) {
                                    // 문제를 아직 안풀었다.
                                    return "풀지 않음"
                                } else {
                                    // 문제를 풀었다.
                                    return Math.floor(score[0].score) + " / 100점"
                                }
                            } else {
                                message.error("로그인 후 이용해주세요.")
                                history.replace("/")
                            }
                        }()
                    }</div></b>),
                    icon2: (
                        (currentLevel === ParticipantLevel.PROFESSOR || currentLevel === ParticipantLevel.ASSISTANT) && (
                            <Button type="text" onClick={() => onProblemDeleteButtonPressed(value.uuid)}>
                                <DeleteOutlined style={{ fontSize: 15 }} />
                            </Button>
                        )
                    ),
                    editIcon: (
                        (currentLevel === ParticipantLevel.PROFESSOR || currentLevel === ParticipantLevel.ASSISTANT) && (
                            <Button type="text" onClick={() => {
                                setSelectedProblem(value)
                                setEditorVisible(true)
                            }}>
                                <EditOutlined style={{ fontSize: 15 }} />
                            </Button>
                        )
                    )
                }))}
            />
        </div>
    );
};

export default ProblemListComp;