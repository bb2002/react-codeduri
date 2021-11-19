import React, { useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import TitleContentCardComp from "./common/TitleContentCard.comp";
import ExampleCardComp from "./common/ExampleCard.comp";
import LanguageSelectorComp from "./common/LanguageSelector.comp";
import { getTemplateOfLanguage, Language } from "../../libraries/config/SupportLanguage";
import RemainTimeViewerComp from "./common/RemainTimeViewer.comp";
import moment from "moment";
import { Link } from "react-router-dom"
import CourseSelectorComp from "./common/CourseSelector.comp";
import DisplayModeSelectorComp, { DISPLAY_MODE } from "./common/DisplayModeSelector.comp";
import { ProblemItem } from "../../libraries/types/Problem.type";
import "../../stylesheet/ide/IDESkel.css"
import { Button, Card, message } from "antd";
import useContest from "../../hooks/useContest";
import useMark from "../../hooks/useMark";
import useLogin from "../../hooks/useLogin";
import { useHistory } from "react-router";
import { HttpResultCode } from "../../libraries/Utils";
import CodeEditor from "../common/CodeEditor";
import RunModeSelectorComp from "./common/RunModeSelector.comp";
import TestingComp from "./dpmode/Testing.comp";
import SubmitComp from "./dpmode/Submit.comp";
import CoursePaginationComp from "./common/CoursePagination.comp";
import { readCodeAxios } from "../../libraries/axios/Mark.axios";
import { FILE_DOWNLOAD_SERVER } from "../../libraries/config/AxiosConfig";


interface IdeSkelComp {
    /**
     * Header 의 문제 목록을 보여줍니다. 대회는 대회의 모든 문제들, 코스는 해당 코스의 문제들이 옵니다.
     */
    problemItems: ProblemItem[]

    /**
     * 현재 선택된 문제의 UUID 입니다
     */
    problemUUID: string

    /**
     * 이 문제를 소유한 Origin
     */
    originUUID: string

    /**
     * 남은 시간 뷰어입니다. undefined의 경우, '시간 제한 없음'을 표시합니다.
     */
    finishTime?: moment.Moment

    /**
     * Edit 모드를 사용할지 결정합니다.
     */
    bUseEditMode: boolean

    /**
     * Edit 버튼을 클릭할 경우, 핸들러
     */
    onEditButtonPressed: () => void
}

type ComplieMode = 0 | 1

const IdeSkelComp = ({ problemItems, problemUUID, originUUID, finishTime, onEditButtonPressed, bUseEditMode }: IdeSkelComp) => {
    const [windowSize] = useWindowSize()
    const [language, setLanguage] = useState<Language | undefined>(undefined)
    const [code, setCode] = useState("")
    const [selectedProblem, setSelectedProblem] = useState<ProblemItem | undefined>(undefined)
    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.CONSOLE)
    const history = useHistory()
    const { login } = useLogin()
    const { contest, readOneContest } = useContest()
    const { mark, submitCode, testCode, resetCode } = useMark()


    useEffect(() => {
        resetCode()
        const item = problemItems.filter(value => value.uuid === problemUUID)
        if (item.length === 0) {
            setSelectedProblem(undefined)
        } else {
            setSelectedProblem(item[0])
        }
    }, [problemItems, problemUUID])

    useEffect(() => {
        resetCode()
        readOneContest(originUUID)
    }, [originUUID])

    useEffect(() => {
        if (contest.readOne.state === HttpResultCode.HTTP_200 && contest.readOne.result !== undefined) {
            setLanguage(contest.readOne.result.usableLanguages[0])
        }
    }, [contest.readOne])

    useEffect(() => {
        if (language && login.profile) {
            // 언어가 변경되었다면, 새로운 템플릿을 준다.
            readCodeAxios({
                problemId: problemUUID,
                language: language,
                studentId: login.profile?.studentId,
                contestId: originUUID
            }).then((response) => {
                setCode(response.data)
            }).catch(ex => {
                setCode(getTemplateOfLanguage(language))
            })

        }
    }, [language])

    const onTestSubmitButtonPressed = (mode: ComplieMode) => {
        resetCode()

        // 로그인 유효성 검사
        if (!login.isLogged || login.profile === undefined) {
            message.error("로그인이 만료되었거나 잘못된 접근입니다.")
            setTimeout(() => {
                history.replace("/")
            }, 1000)
            return
        }

        // 컴파일 언어 검사
        if (language === undefined) {
            message.error("컴파일 언어를 선택해주세요.")
            return
        }

        // 제출 가능 날짜 검사
        if (contest.readOne.result === undefined) {
            message.error("잠시후 다시 시도해주세요.")
            return
        } else {
            const now = moment()
            if (now.valueOf() < contest.readOne.result.contestStartTime.valueOf()) {
                message.warn("아직 제출 가능한 시간이 아닙니다.")
                return
            }

            if (now.valueOf() > contest.readOne.result.contestEndTime.valueOf()) {
                message.warn("제출 시간을 초과했습니다.")
                return
            }
        }

        // 코드 실행
        if (mode === 0) {
            // 테스트 하는 경우
            message.success("테스트 요청을 보냈습니다.")
            testCode({
                contestId: originUUID,
                problemId: problemUUID,
                sourceCode: code,
                studentId: login.profile.studentId,
                language: language
            })
            setDisplayMode(DISPLAY_MODE.TESTING)
        }

        if (mode === 1) {
            // 제출 하는 경우
            message.success("코드를 제출했습니다.")
            submitCode({
                contestId: originUUID,
                problemId: problemUUID,
                sourceCode: code,
                studentId: login.profile.studentId,
                language: language
            })
            setDisplayMode(DISPLAY_MODE.SUBMIT)
        }
    }

    return (
        <div style={{ width: "100%", height: "100%", minWidth: 1100 }}>
            <div id="ide-header">
                <header>
                    <h5>{contest.readOne.result?.title}</h5>
                    <div id="lts">
                        <CourseSelectorComp problemItems={problemItems} problemUUID={problemUUID} />
                    </div>
                    <div id="rts">
                        {
                            bUseEditMode && (
                                <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={onEditButtonPressed}>
                                    문제 수정
                                </Button>
                            )
                        }

                        <Link to={`/contest/${originUUID}`} style={{ color: "white" }}>
                            <CloseOutlined />
                        </Link>
                    </div>
                </header>
            </div>
            <div id="ide-container">
                <div id="ide-question-container" style={{ height: windowSize[1] - 64 }}>

                    {
                        // 문제 제목을 출력합니다.
                        function () {
                            if (selectedProblem === undefined) {
                                return <p id="title">제목 없는 문제</p>
                            } else {
                                return <p id="title">{selectedProblem.problemTitle}</p>
                            }
                        }()
                    }


                    {
                        // 문제 Item 을 출력합니다.
                        selectedProblem !== undefined && selectedProblem.problemContent !== undefined
                        && <TitleContentCardComp title="문제" content={selectedProblem.problemContent} />
                    }



                    {
                        selectedProblem?.images.length !== 0 && (
                            <Card bodyStyle={{ padding: 18 }}>
                                <h5><b>첨부 자료</b></h5>
                                {
                                    selectedProblem?.images.map(value =>
                                        <>
                                            <a href={`${FILE_DOWNLOAD_SERVER}${value.response}`}>{value.name}</a>
                                            <br />
                                        </>
                                    )
                                }
                            </Card>
                        )
                    }

                    {
                        // 문제의 Examples 를 출력합니다.
                        function () {
                            if (selectedProblem !== undefined && selectedProblem.testCases !== undefined) {
                                return selectedProblem.testCases.filter(value => value.isPublic).map(value => <ExampleCardComp inputValue={value.exampleIn} outputValue={value.exampleOut} />)
                            }
                        }()
                    }

                    {/* 주의사항 Item */}
                    {
                        selectedProblem !== undefined && selectedProblem.problemCaution !== undefined
                        && <TitleContentCardComp title="주의사항"
                            content={selectedProblem.problemCaution} />
                    }

                </div>
                <div id="ide-editor">
                    {/* 언어 선택 화면 */}
                    <div id="ide-item-var">
                        <div id="lts">
                            <LanguageSelectorComp
                                language={language}
                                setLanguage={(language => setLanguage(language))}
                                selectableLanguages={contest.readOne.result?.usableLanguages ? contest.readOne.result.usableLanguages : []} />
                        </div>
                        <div id="rts">
                            <RemainTimeViewerComp finishTime={finishTime} />
                        </div>
                    </div>

                    <CodeEditor
                        mode={language ? language : Language.JAVA}
                        width="100%"
                        height={`${windowSize[1] - 422}px`}
                        value={code}
                        onValueChanged={(value: string) => setCode(value)}
                    />

                    {/* 테스팅, 제출결과 등 처리결과 화면 */}
                    <div id="ide-item-var">
                        <div id="lts">
                            <DisplayModeSelectorComp currentMode={displayMode} onModeChanged={(value) => setDisplayMode(value)} />
                        </div>
                        <div id="rts">
                            <RunModeSelectorComp
                                loading={mark.loading}
                                onTestButtonPressed={() => onTestSubmitButtonPressed(0)}
                                onSubmitButtonPressed={() => onTestSubmitButtonPressed(1)} />
                        </div>
                    </div>

                    {/* 실행결과 */}
                    <div id="ide-output-container">
                        {
                            function () {
                                switch (displayMode) {
                                    case DISPLAY_MODE.TESTING:
                                        return <TestingComp />
                                    case DISPLAY_MODE.SUBMIT:
                                        return <SubmitComp />
                                }
                            }()
                        }
                    </div>

                    <div id="ide-arrow-container">
                        <CoursePaginationComp problemItems={problemItems} problemUUID={problemUUID} />
                    </div>
                </div>
            </div>
        </div>
    );
};

IdeSkelComp.defaultProps = {
    onEditButtonPressed: () => { }
}

export default IdeSkelComp;