import React, {useEffect, useState} from 'react';
import Header from "../../../components/common/Header";
import useContest from "../../../hooks/useContest";
import Loading from "../../../components/atom/Loading";
import Footer from "../../../components/common/Footer";
import ContentNavComp from "../../../components/content/common/ContentNav.comp";
import ContentMetaComp from "../../../components/content/common/ContentMeta.comp";
import ProblemListComp from "../../../components/content/contest/ProblemList.comp";
import ScoreboardComp from "../../../components/content/contest/Scoreboard.comp";
import ContentIntroduceComp from "../../../components/content/common/ContentIntroduce.comp";
import {HttpResultCode, isHttpCodeMeanError} from "../../../libraries/Utils";
import ParticipateComp from '../../../components/content/common/func/Participate.comp';
import {ParticipantLevel} from "../../../libraries/types/Participant.type";
import useProblem from "../../../hooks/useProblem";
import HttpRequestError from "../../../components/error/HttpRequestError.comp";
import useParticipant from "../../../hooks/useParticipant";
import useLogin from "../../../hooks/useLogin";
import {message, Modal} from "antd";
import {EnterOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {ProblemForm, TestCaseItem} from "../../../libraries/types/Problem.type";
import useScoreboard from "../../../hooks/useScoreboard";
import {ContestForm} from "../../../libraries/types/Contest.type";
import {useHistory} from "react-router";
import QnARouterComp from "../../../components/content/qna/QnARouter.comp";
import useQnA from "../../../hooks/useQnA";

interface ContestSkelProps {
    match: { params: { uuid: string, page?: string } }
}

const { confirm } = Modal

const ContestSkel = ({ match }: ContestSkelProps) => {
    const {                                                                     // Contest Redux
        contest,
        readOneContest,
        updateContest,
        deleteContest,
        resetContest } = useContest()
    const {                                                                     // Problem Redux
        problem,
        readAllProblem,
        createProblem,
        deleteProblem,
        updateProblem,
        resetProblem } = useProblem()
    const {                                                                     // Participant Redux
        participate,
        readOneParticipant,
        readAllParticipant,
        updateAllParticipant,
        updateOneParticipant,
        resetOnlyUpdate_HACK,
        requestParticipant,
        resetParticipant } = useParticipant()
    const {
        scoreboard,
        getScoreboardItems
    } = useScoreboard()
    const {
        qna
    } = useQnA()
    const { login } = useLogin()                                                // Login Redux
    const history = useHistory()

    const [page, setPage] = useState("introduce")                      // 현재 보여줄 페이지
    const [currentLevel, setCurrentLevel] = useState(ParticipantLevel.NONE)     // 이 대회에서, 사용자의 권한 수준

    // 비어있는 로그인 체크
    const snsId = login.profile?.uniqueId
    const stuId = login.profile?.studentId

    const isEmpty = () => {
        if(snsId != undefined && stuId != undefined){ // sns와 stuId가 underfined가 아닐 때
            if(snsId.length >= 2 && stuId.length == 0){ // snsId의 길이가 2보다 클 때(공백이 아닐 때) 그리고 stuId가 공백일 때
                history.push('/oauth/callback')
            }   
        }
    }

    useEffect(() => {
        return () => {
            resetContest()
            resetProblem()
            resetParticipant()
        }
    }, [match.params])

    useEffect(() => {
        readOneContest(match.params.uuid)
        readAllProblem(match.params.uuid)
        readAllParticipant({
            contestId: match.params.uuid
        })
    }, [match.params, problem.create, problem.remove, problem.update, contest.update])

    useEffect(() => {
        if(login.isLogged && login.profile !== undefined) {
            // 로그인 된 경우, 본인 참가 여부를 조회
            readOneParticipant({
                contestId: match.params.uuid,
                uniqueId: login.profile.uniqueId
            })
        }
    }, [login, match.params.uuid])

    useEffect(() => {
        if(login.isLogged && login.profile !== undefined) {
            switch(currentLevel) {
                case ParticipantLevel.NONE:
                case ParticipantLevel.WAIT:
                    break;
                case ParticipantLevel.ENROLL:
                    // 참여자인 경우, 자신의 점수만 불러온다.
                    getScoreboardItems({
                        originId: match.params.uuid,
                        solverId: login.profile.uniqueId,
                        questionId: undefined,
                        isSorting: false
                    })
                    break;
                case ParticipantLevel.ASSISTANT:
                case ParticipantLevel.PROFESSOR:
                    // 조교 또는 교수자인 경우, 모든 점수와 참가자 목록을 불러온다.
                    getScoreboardItems({
                        originId: match.params.uuid,
                        solverId: undefined,
                        questionId: undefined,
                        isSorting: false
                    })
                    readAllParticipant({
                        contestId: match.params.uuid
                    })
            }
        }
    }, [currentLevel])

    useEffect(() => {
        if(currentLevel === ParticipantLevel.PROFESSOR && participate.update.state === HttpResultCode.HTTP_200) {
            message.success("저장되었습니다.")

            readAllParticipant({
                contestId: match.params.uuid
            })
            resetOnlyUpdate_HACK()
        }
    }, [currentLevel, participate.update])

    useEffect(() => {
        if(currentLevel !== -1) {
            // 해결 불가능한 버그
            // QnA 에서 글을 읽으면 아무 이유 없이 레벨이 초기화 됨
            return
        }

        if(login.profile === undefined) {
            console.log("LEVEL IS NONE")
            setCurrentLevel(ParticipantLevel.NONE)
        } else {
            if(participate.readOne.state === HttpResultCode.HTTP_200 && participate.readOne.result !== undefined) {
                if(participate.readOne.result.level === ParticipantLevel.PROFESSOR) {
                    setCurrentLevel(ParticipantLevel.PROFESSOR)                 // 교수자
                }
                if(participate.readOne.result.level === ParticipantLevel.ASSISTANT) {
                    setCurrentLevel(ParticipantLevel.ASSISTANT)         // 조교임
                }
                if(participate.readOne.result.level === ParticipantLevel.ENROLL) {
                    setCurrentLevel(ParticipantLevel.ENROLL)            // 참가자임
                }
                if(participate.readOne.result.level === ParticipantLevel.WAIT) {
                    setCurrentLevel(ParticipantLevel.WAIT)              // 승인대기
                }
            } else {
                setCurrentLevel(ParticipantLevel.NONE)                  // 아무 요청도 안함
            }
        }
    }, [login, contest.readOne, participate.readOne])

    useEffect(() => {
        if(participate.request.state === HttpResultCode.HTTP_200 && login.profile) {
            message.success("신청되었습니다.")
            readOneParticipant({
                contestId: match.params.uuid,
                uniqueId: login.profile.uniqueId
            })
        }

        if(isHttpCodeMeanError(participate.request.state)) {
            message.error("참가 신청에 오류가 발생했습니다.")
        }
    }, [participate.request])

    useEffect(() => {
        if(problem.update.state === HttpResultCode.HTTP_200) {
            resetProblem()

        }
    }, [problem.update.state])

    useEffect(() => {
        if(page !== "qna"
            && (window.location.pathname.indexOf("read") !== -1 || window.location.pathname.indexOf("write") !== -1 || window.location.pathname.indexOf("edit") !== -1)) {
            history.replace(`/contest/${match.params.uuid}`)
        }
    }, [page])

    /**
     * 문제 삭제 버튼을 눌렀을 때 Callback
     * @param targetProblemId          // 삭제할 문제의 id
     */
    const onProblemDeleteButtonCallback = (targetProblemId: string) => {
        confirm({
            title: '문제 삭제',
            icon: <ExclamationCircleOutlined />,
            content: '문제를 삭제합니다. 30일 이내로 복구 할 수 있습니다.',
            okText: "삭제",
            cancelText: "취소",
            onOk() {
                deleteProblem({
                    originId: match.params.uuid,
                    problemId: targetProblemId
                })
                resetProblem()
            },
            onCancel() {},
        })
    }

    /**
     * 문제 생성 버튼을 눌렀을 때 Callback
     * @param form                  // 생성할 문제의 Data
     */
    const onProblemCreateButtonCallback = (form: ProblemForm) => {
        createProblem(form)
    }

    /**
     * 문제 Edit 버튼을 눌렀을 때 Callback
     */
    const onProblemEditButtonCallback = (problemForm: ProblemForm, testcases: TestCaseItem[], problemId: string) => {
        updateProblem({
            contestId: match.params.uuid,
            problemId: problemId,
            form: problemForm,
            testCases: testcases
        })
    }

    /**
     * 대회에 대한 참가 신청
     */
    const onEnrollPressed = () => {
        const style ={ margin: 0, padding: 0, fontSize: "0.85rem" }

        confirm({
            title: '강좌 신청',
            icon: <EnterOutlined />,
            content: (
                <div>
                    <p style={style}>이 강좌를 신청하시겠습니까?</p>
                    <p style={style}>강좌에 따라 승인이 필요 할 수 있으며</p>
                    <p style={style}>이 작업은 되돌릴 수 없습니다.</p>
                </div>
            ),
            okText: "참가",
            cancelText: "취소",
            onOk() {
                if(login.isLogged && login.profile !== undefined) {
                    requestParticipant({
                        contestId: match.params.uuid
                    })
                } else {
                    message.error("로그인 정보를 찾을 수 없습니다.")
                }
            }
        })
    }

    /**
     * 모든 참가자의 역할을 일괄 업데이트 합니다.
     * @param newState          //  새로운 State
     */
    const onParticipateUpdateAllCallback = (newState: ParticipantLevel) => {
        updateAllParticipant({
            contestId: match.params.uuid,
            uniqueId: undefined,
            level: newState
        })
    }

    /**
     * 한명의 참가자의 역할을 업데이트 합니다.
     * @param snsId             // 사용자의 SNSID
     * @param newState          // 새로운 State
     */
    const onParticipateUpdateOneCallback = (snsId: string, newState: ParticipantLevel) => {
        updateOneParticipant({
            contestId: match.params.uuid,
            uniqueId: snsId,
            level: newState
        })
    }

    /**
     * 해당 문제를 수정합니다
     * @param form              수정된 데이터
     */
    const onContestEditCallback = (form: ContestForm) => {
        form.uuid = match.params.uuid
        updateContest(form)
    }

    /**
     * 해당 문제를 삭제합니다.
     */
    const onContestDeleteCallback = () => {
        confirm({
            title: '대회 삭제',
            icon: <ExclamationCircleOutlined />,
            content: '대회를 삭제합니다. 30일 이내로 복구 할 수 있습니다.',
            okText: "삭제",
            cancelText: "취소",
            onOk() {
                deleteContest(match.params.uuid)
                history.replace("/")
            },
            onCancel() {},
        })

    }
    return (
        <div>
            {isEmpty()}
            <Header />
            {
                (contest.loading) && (
                    <Loading />
                )
            }

            {
                isHttpCodeMeanError(contest.readOne.state) && (
                    <HttpRequestError httpCode={contest.readOne.state} />
                )
            }


            {
                (contest.readOne.result !== undefined && !contest.loading) && (
                    <>
                        <ContentMetaComp
                            title={contest.readOne.result.title}
                            content={contest.readOne.result.content}
                            imageURL={contest.readOne.result.logoImageURL}
                            isNeedApply={!contest.readOne.result.isPublic}
                            languages={contest.readOne.result.usableLanguages}
                            enrollNum={contest.readOne.result.lengthOfParticipant}
                            currentLevel={currentLevel}
                            onEnrollPressed={onEnrollPressed} />

                        <ContentNavComp
                            keys={function() {
                                switch(currentLevel) {
                                    case ParticipantLevel.NONE:
                                    case ParticipantLevel.WAIT:
                                        return ["introduce"]
                                    case ParticipantLevel.ENROLL:
                                        return ["introduce", "problems", "qna"]
                                    case ParticipantLevel.ASSISTANT:
                                        return ["introduce", "problems", "scoreboard", "qna"]
                                    case ParticipantLevel.PROFESSOR:
                                        return ["introduce", "problems", "scoreboard", "participate", "qna"]
                                }
                            }()}
                            names={function() {
                                switch(currentLevel) {
                                    case ParticipantLevel.NONE:
                                    case ParticipantLevel.WAIT:
                                        return ["대회소개"]
                                    case ParticipantLevel.ENROLL:
                                        return ["대회소개", "문제", "질의응답"]
                                    case ParticipantLevel.ASSISTANT:
                                        return ["대회소개", "문제", "성취도", "질의응답"]
                                    case ParticipantLevel.PROFESSOR:
                                        return ["대회소개", "문제", "성취도", "역할", "질의응답"]
                                }
                            }()}
                            selectedKey={page} onMenuClicked={(key: string) => setPage(key)} />

                        <div className="container" style={{ marginTop: 52 }}>
                            {
                                function() {
                                    switch(page) {
                                        case "introduce":
                                            return <ContentIntroduceComp
                                                content={contest.readOne.result.content}
                                                authorProfileImage={contest.readOne.result?.author.profileImageURL}
                                                participants={participate.readAll.result}
                                                authorName={contest.readOne.result.author.name}
                                                myPermission={currentLevel}
                                                onContestEditButtonPressed={onContestEditCallback}
                                                onContestDeleteButtonPressed={onContestDeleteCallback}
                                                contestStartTime={contest.readOne.result?.contestStartTime}
                                                contestEndTime={contest.readOne.result?.contestEndTime}
                                                enrollStartTime={contest.readOne.result?.enrollStartTime}
                                                enrollEndTime={contest.readOne.result?.enrollEndTime}/>
                                        case "problems":
                                            return <ProblemListComp
                                                originId={match.params.uuid}
                                                problems={problem.read.result ? problem.read.result : []}
                                                scoreboards={scoreboard.data}
                                                modalLoading={problem.loading}
                                                currentLevel={currentLevel}
                                                onProblemDeleteButtonPressed={onProblemDeleteButtonCallback}
                                                onProblemCreateButtonPressed={onProblemCreateButtonCallback}
                                                onProblemEditButtonPressed={onProblemEditButtonCallback}/>
                                        case "scoreboard":
                                            return <ScoreboardComp
                                                participants={participate.readAll.result?.filter(user => user.level !== ParticipantLevel.PROFESSOR)}
                                                scoreboards={scoreboard.data}
                                                originId={match.params.uuid}
                                                problems={problem.read.result}/>
                                        case "participate":
                                            return <ParticipateComp
                                                loading={participate.loading}
                                                participates={participate.readAll.result}
                                                onUpdateAllPressed={onParticipateUpdateAllCallback}
                                                onUpdateOnePressed={onParticipateUpdateOneCallback} />
                                        case "qna":
                                            return <QnARouterComp currentLevel={currentLevel} />
                                    }
                                }()
                            }
                        </div>
                    </>
                )
            }
            <Footer />
        </div>
    );
};

export default ContestSkel;