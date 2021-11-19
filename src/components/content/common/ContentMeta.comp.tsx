import React from 'react';
import "../../../stylesheet/content/ContentMeta.css"
import {UserOutlined} from "@ant-design/icons";
import TextBadge from "../../atom/TextBadge";
import Title from "antd/es/typography/Title";
import {ParticipantLevel} from "../../../libraries/types/Participant.type";
import {Button, Modal} from "antd";
import {FILE_DOWNLOAD_SERVER} from "../../../libraries/config/AxiosConfig";
import useLogin from "../../../hooks/useLogin";
import {getBadgeOfLanguage, Language} from "../../../libraries/config/SupportLanguage";

interface ContentMetaCompProps {
    title: string,                          // 제목
    content: string,                        // 내용
    imageURL: string,                       // 이미지 URL
    enrollNum: number                       // 참가자 수
    languages: Language[],    // 지원 언어
    isNeedApply: boolean                    // 누구나 or 신청필요
    currentLevel: ParticipantLevel          // 현재 참가자의 수준
    onEnrollPressed: () => void
}

const ContentMetaComp = ({ title, content, enrollNum, imageURL, languages, isNeedApply, currentLevel, onEnrollPressed }: ContentMetaCompProps) => {
    const { login } = useLogin()

    return (
        <div className="meta-header">
            <div className="container">
                <div className="meta-inner-container">
                    <div id="content-image-container">
                        <img src={FILE_DOWNLOAD_SERVER + imageURL} alt="대회 썸네일"/>
                    </div>
                    <div id="content-header-right">
                        <Title level={2} style={{ color: "white" }}>{title}</Title>
                        <p>{content}</p>
                        <div>
                            {
                                languages.map(value => <img src={getBadgeOfLanguage(value)} alt={value} style={{ height: 24, marginRight: 8, marginBottom: 20 }}  />)
                            }
                        </div>


                        <div id="content-item-box">

                            <UserOutlined style={{color: "white", marginBottom: 2}} />
                            <p style={{ marginRight: 32 }}>{enrollNum}명 참가</p>

                            <p style={{ margin: 0, padding: 0, marginRight: 8 }}>대상: </p>
                            {
                                isNeedApply ? (
                                    <TextBadge color="#FF4D4F" message="신청필요" />
                                ) : (
                                    <TextBadge color="#52C41A" message="누구나" />
                                )
                            }

                            {
                                (currentLevel === ParticipantLevel.NONE && login.isLogged) && (
                                    <Button type="primary" style={{ marginLeft: "auto", width: 150 }} onClick={onEnrollPressed}>
                                        수강 신청
                                    </Button>
                                )
                            }

                            {
                                currentLevel === ParticipantLevel.WAIT && (
                                    <Button type="primary" disabled style={{ marginLeft: "auto", width: 150 }}>
                                        승인 대기
                                    </Button>
                                )
                            }

                            {
                                currentLevel === ParticipantLevel.ENROLL && (
                                    <Button
                                        disabled={true}
                                        type="primary"
                                        style={{ marginLeft: "auto", width: 150, backgroundColor: "#27ae60", fontWeight: "bold", color: "white", border: "none" }}>
                                        수강 중
                                    </Button>
                                )
                            }

                            {
                                currentLevel === ParticipantLevel.ASSISTANT && (
                                    <Button
                                        disabled={true}
                                        type="primary"
                                        style={{ marginLeft: "auto", width: 150, backgroundColor: "#f39c12", fontWeight: "bold", color: "white", border: "none" }}>
                                        조교
                                    </Button>
                                )
                            }

                            {
                                currentLevel === ParticipantLevel.PROFESSOR && (
                                    <Button
                                        disabled={true}
                                        type="primary"
                                        style={{ marginLeft: "auto", width: 150, backgroundColor: "#f39c12", fontWeight: "bold", color: "white", border: "none" }}>
                                        교수자
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentMetaComp;