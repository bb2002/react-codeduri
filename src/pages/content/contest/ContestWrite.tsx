import React, {useEffect, useState} from 'react';
import ContentNameFieldComp from "../../../components/content/common/write/ContentNameField.comp";
import {Button, message} from "antd";
import "../../../stylesheet/content/ContentWrite.css"
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import ContentStepComp from "../../../components/content/common/write/ContentStep.comp";
import ContentImageFieldComp from "../../../components/content/common/write/ContentImageField.comp";
import ContentDateFieldComp from "../../../components/content/common/write/ContentDateField.comp";
import ContentTargetFieldComp from "../../../components/content/common/write/ContentTargetField.comp";
import {useWindowSize} from "../../../hooks/useWindowSize";
import ContentLanguageFieldComp from "../../../components/content/common/write/ContentLanguageField.comp";
import {ContestForm} from "../../../libraries/types/Contest.type";
import useContest from "../../../hooks/useContest";
import {HttpResultCode} from "../../../libraries/Utils";
import {useHistory} from "react-router";
import useLogin from "../../../hooks/useLogin";
import {ProfileLevel} from "../../../libraries/types/User.type";

const ContestWrite = () => {
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [windowSize] = useWindowSize()
    const [form, setForm] = useState<ContestForm>({} as ContestForm)
    const { contest, createContest } = useContest()
    const history = useHistory()
    const { login } = useLogin()

    const onIncrease = () => {
        setStep(step + 1)
    }

    const onDecrease = () => {
        setStep(step - 1)
    }

    const onCreatePressed = () => {
        createContest(form)
    }

    // 비어있는 로그인 체크
    const snsId = login.profile?.uniqueId
    const stuId = login.profile?.studentId
    
    const isEmpty = () => {
        console.log("지금이니?")
        if(snsId != undefined && stuId != undefined){ // sns와 stuId가 underfined가 아닐 때
            console.log("감사하다.")
            if(snsId.length >= 2 && stuId.length == 0){ // snsId의 길이가 2보다 클 때(공백이 아닐 때) 그리고 stuId가 공백일 때
                history.push('/oauth/callback')
                console.log("됐냐고~~~~~~~~")
            }   
        }
    }

    useEffect(() => {
        if(contest.create.state === HttpResultCode.HTTP_200 && contest.create.result !== undefined) {
            message.success("대회가 개설되었습니다.")
            history.replace(`/contest/${contest.create.result}`)
        }

        if(contest.create.state === HttpResultCode.HTTP_400 || contest.create.state === HttpResultCode.HTTP_404) {
            message.error("요청에 오류가 있습니다.")
        }

        if(contest.create.state === HttpResultCode.HTTP_500) {
            message.error("내부 서버 오류가 발생했습니다.")
        }
    }, [contest.create])

    useEffect(() => {
        if(login.isLogged && login.profile) {
            if(login.profile.permission !== ProfileLevel.PROFESSOR) {
                message.error("교수자만 대회 개설이 가능합니다.")
            } else {
                return
            }
        } else {
            message.error("로그인 후 대회개설이 가능합니다.")
        }
        history.replace("/")
    }, [login.isLogged, login.profile])

    return (
        <div>
            {isEmpty()}
            <Header />
            <br/><br/>
            <div className="container" style={{ minHeight: windowSize[1]-423 }}>
                <ContentStepComp currentStep={step} />
                <h5 style={{ marginBottom: 32, marginTop: 64 }}><strong>새 대회 개설</strong></h5>
                {
                    function() {
                        switch(step) {
                            case 0:
                                return <ContentNameFieldComp
                                    titleHeader="대회 제목"
                                    contentHeader="대회 소개"
                                    onTitleChanged={(value: string) => setForm({ ...form, title: value })}
                                    onContentChanged={(value: string) => setForm({ ...form, content: value })}
                                    title={form.title}
                                    content={form.content} />
                            case 1:
                                return <ContentImageFieldComp
                                    onUpdateStateChanged={(loading: boolean) => setLoading(loading)}
                                    onUploadedFileChanged={(file: string) => setForm({ ...form, logoImageURL: file })}
                                    uploadedFile={form.logoImageURL} />
                            case 2:
                                return <ContentDateFieldComp
                                    key="enrollDate"
                                    title="참가 신청 기간"
                                    content="이 기간 동안 대회에 참가 요청을 할 수있습니다."
                                    onDateChanged={(startDate, endDate) => setForm({ ...form, enrollStartTime: startDate, enrollEndTime: endDate })}
                                    currentDate={[form.enrollStartTime, form.enrollEndTime]}/>
                            case 3:
                                return <ContentDateFieldComp
                                    key="contestDate"
                                    title="문제 풀이 기간"
                                    content="이 기간 동안 참가자들은 문제를 풀 수 있습니다."
                                    onDateChanged={(startDate, endDate) => setForm({ ...form, contestStartTime: startDate, contestEndTime: endDate })}
                                    currentDate={[form.contestStartTime, form.contestEndTime]}/>
                            case 4:
                                return <ContentTargetFieldComp
                                    onChanged={(value: boolean) => setForm({ ...form, isPublic: value })}
                                    isPublic={form.isPublic} />
                            case 5:
                                return <ContentLanguageFieldComp
                                    selectedLanguages={form.usableLanguages}
                                    onValueChanged={(lang) => setForm({ ...form, usableLanguages: lang })} />
                        }
                    }()
                }

                <div style={{ marginTop: 32 }}>
                    {
                        (step !== 0) && (
                            <Button type="link" className="ctl-button" style={{ border: "none", marginRight: 8 }} onClick={onDecrease} loading={loading}>
                                이전
                            </Button>
                        )
                    }

                    {
                        function() {
                            switch(step) {
                                case 0:
                                    if(form.title && form.content) {
                                        return (
                                            <Button type="primary" className="ctl-button"  onClick={onIncrease} loading={loading}>다음 (썸네일 설정)</Button>
                                        )
                                    }
                                    break
                                case 1:
                                    if(form.logoImageURL) {
                                        return (
                                            <Button type="primary" className="ctl-button"  onClick={onIncrease} loading={loading}>다음 (참가 기간 설정)</Button>
                                        )
                                    }
                                    break
                                case 2:
                                    if(form.enrollStartTime !== undefined && form.enrollEndTime !== undefined) {
                                        return (
                                            <Button type="primary" className="ctl-button"  onClick={onIncrease} loading={loading}>다음 (풀이 기간 설정)</Button>
                                        )
                                    }
                                    break
                                case 3:
                                    if(form.contestStartTime !== undefined && form.contestEndTime !== undefined) {
                                        return (
                                            <Button type="primary" className="ctl-button"  onClick={onIncrease} loading={loading}>다음 (공개 여부 설정)</Button>
                                        )
                                    }
                                    break
                                case 4:
                                    if(form.isPublic !== undefined) {
                                        return (
                                            <Button type="primary" className="ctl-button" onClick={onIncrease} loading={loading}>다음 (언어 설정)</Button>
                                        )
                                    }
                                    break
                                case 5:
                                    if(form.usableLanguages !== undefined && form.usableLanguages.length > 0) {
                                        return (
                                            <Button type="primary" className="ctl-button" onClick={onCreatePressed} loading={contest.loading}>
                                                개설
                                            </Button>
                                        )
                                    }
                            }
                        }()
                    }

                    {
                        (step === 1 && form.logoImageURL) && (
                            <Button type="link" className="ctl-button" style={{ border: "none", marginLeft: 32 }} onClick={() => setForm({ ...form, logoImageURL: "" })}>
                                재등록
                            </Button>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContestWrite;