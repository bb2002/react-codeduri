import React, {useState} from 'react';
import {Alert, Avatar, Button, Card, Tag, Timeline} from "antd";
import moment from "moment";
import "../../../stylesheet/content/ContentIntro.css"
import {ParticipantItem, ParticipantLevel} from "../../../libraries/types/Participant.type";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ContestForm} from "../../../libraries/types/Contest.type";
import ContestEditModalComp from "../contest/ContestEditModal.comp";
import useContest from "../../../hooks/useContest";

interface ContentIntroduceCompProps {
    authorName: string,
    authorProfileImage: string,
    participants: ParticipantItem[] | undefined
    content: string,
    myPermission: ParticipantLevel
    contestStartTime?: moment.Moment
    contestEndTime?: moment.Moment
    enrollStartTime?: moment.Moment
    enrollEndTime?: moment.Moment

    onContestEditButtonPressed: (form: ContestForm) => void
    onContestDeleteButtonPressed: () => void
}

const ContentIntroduceComp = ({ authorName, authorProfileImage, participants, content, myPermission, contestStartTime, contestEndTime, enrollStartTime, enrollEndTime, onContestEditButtonPressed, onContestDeleteButtonPressed }: ContentIntroduceCompProps) => {
    const now = moment()
    const [editModalVisible, setEditModalVisible] = useState(false)
    const { contest } = useContest()

    return (
        <>
            {
                contest.readOne.result && (
                    <ContestEditModalComp
                        visible={editModalVisible}
                        defaultValue={contest.readOne.result}
                        onEditButtonPressed={onContestEditButtonPressed}
                        onCancelButtonPressed={() => setEditModalVisible(false)} />
                )
            }

            <div id="cb-container-a">
                <Card title="Overview" className="shadow-card" headStyle={{ fontWeight: "bold" }}>
                    <Timeline>
                        <Timeline.Item color="green">
                            <p>{authorName} 교수님이 대회를 개설했습니다!</p>
                        </Timeline.Item>

                        {
                            function () {
                                if (enrollEndTime !== undefined && enrollStartTime !== undefined) {
                                    if (enrollStartTime.valueOf() < now.valueOf() && enrollEndTime.valueOf() > now.valueOf()) {
                                        return (
                                            <Timeline.Item color="green">
                                                <p>이 대회는 참가자를 모집하고 있습니다!</p>
                                                {
                                                    Math.floor(moment.duration(enrollEndTime.diff(now)).asDays()) === 0 ? (
                                                        <Tag>오늘 {`${enrollEndTime.format("HH시 mm분")}에 모집 마감`}</Tag>
                                                    ) : (
                                                        <Tag>모집 마감까지 {`${Math.floor(moment.duration(enrollEndTime.diff(now)).asDays())}일`}</Tag>
                                                    )
                                                }
                                            </Timeline.Item>
                                        )
                                    } else if(now.valueOf() < enrollStartTime.valueOf()) {
                                        return (
                                            <Timeline.Item color="gray">
                                                {
                                                    Math.floor(moment.duration(enrollStartTime.diff(now)).asDays()) === 0 ? (
                                                        <p>곧 참가자 모집이 시작됩니다!</p>
                                                    ) : (
                                                        <p>참가자 모집까지 {`${Math.floor(moment.duration(enrollStartTime.diff(now)).asDays())}일 남았습니다.`}</p>
                                                    )
                                                }

                                                <Tag>{`참가 시작: ${enrollStartTime.format("YYYY년 MM월 DD일 HH시 mm분")}`}</Tag>
                                            </Timeline.Item>
                                        )
                                    } else {
                                        return (
                                            <Timeline.Item color="red">
                                                <p>참가자 모집이 종료되었습니다.</p>
                                            </Timeline.Item>
                                        )
                                    }
                                }
                            }()
                        }

                        {
                            function() {
                                if(contestStartTime !== undefined && contestEndTime !== undefined) {
                                    if(now.valueOf() > contestStartTime.valueOf() && now.valueOf() < contestEndTime.valueOf()) {
                                        return (
                                            <Timeline.Item color="green">
                                                <p>문제 풀이가 진행중입니다.</p>
                                                {
                                                    Math.floor(moment.duration(contestEndTime.diff(now)).asDays()) === 0 ? (
                                                        <Tag>오늘 {`${contestEndTime.format("HH시 mm분")}에 문제 풀이 마감`}</Tag>
                                                    ) : (
                                                        <Tag>문제 풀이 마감까지 {`${Math.floor(moment.duration(contestEndTime.diff(now)).asDays())}일`}</Tag>
                                                    )
                                                }
                                            </Timeline.Item>
                                        )
                                    } else if(now.valueOf() < contestStartTime.valueOf()) {
                                        return (
                                            <Timeline.Item color="gray">
                                                {
                                                    Math.floor(moment.duration(contestStartTime.diff(now)).asDays()) === 0 ? (
                                                        <p>곧 문제풀이가 시작됩니다.</p>
                                                    ) : (
                                                        <p>문제 풀이 시작까지 {`${Math.floor(moment.duration(contestStartTime.diff(now)).asDays())}일 남았습니다.`}</p>
                                                    )
                                                }

                                                <Tag>{`문제 풀이 시작: ${contestStartTime.format("YYYY년 MM월 DD일 HH시 mm분")}`}</Tag>
                                            </Timeline.Item>
                                        )
                                    } else {
                                        return (
                                            <Timeline.Item color="red">
                                                <p>문제 풀이가 종료되었습니다.</p>
                                            </Timeline.Item>
                                        )
                                    }
                                }
                            }()
                        }

                        {
                            contestEndTime !== undefined && (
                                <Timeline.Item color={`${contestEndTime.valueOf() < now.valueOf() ? "red" : "gray"}`}>
                                    <p>모든 대회가 종료되었습니다.</p>
                                </Timeline.Item>
                            )
                        }
                    </Timeline>
                </Card>

                <div id="cb-container-a-divider" />

                <Card title="Introduction" className="shadow-card" headStyle={{ fontWeight: "bold" }}>
                    <div style={{ whiteSpace: "pre" }}>
                        {content}

                    </div>
                </Card>
            </div>
            <br />
            <div id="cb-container-b">
                <Card title="교수자" headStyle={{ fontWeight: "bold" }} className="shadow-card" style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <Avatar src={authorProfileImage} size={64} style={{ marginBottom: 8 }}/>
                        <p><b>{authorName}</b></p>
                    </div>
                </Card>
                <div id="cb-container-b-divider" />
                <Card title="조교" headStyle={{ fontWeight: "bold" }} className="shadow-card" style={{ flex: 4 }}>
                    {
                        (participants && participants.filter(profile => profile.level === ParticipantLevel.ASSISTANT).length !== 0) ? (
                            participants.filter(profile => profile.level === ParticipantLevel.ASSISTANT).map(profile => (
                                <div key={profile.profile.studentId} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar src={profile.profile.profileImageURL} />
                                    <p style={{ margin: 0, marginLeft: 8 }}>{profile.profile.name}</p>
                                </div>
                            ))
                        ) : (
                            <Alert message="아직 조교가 없습니다." type="warning" />
                        )
                    }
                </Card>
            </div>
            <br />
            {
                myPermission === ParticipantLevel.PROFESSOR && (
                    <Card title="관리 패널" headStyle={{ fontWeight: "bold" }} className="shadow-card">
                        <Button type="link" icon={<EditOutlined />}
                                onClick={() => setEditModalVisible(true)}>대회 수정</Button>
                        <Button type="text" danger={true} icon={<DeleteOutlined />}
                                onClick={onContestDeleteButtonPressed}>대회 삭제</Button>
                    </Card>
                )
            }
        </>
    );
};

export default ContentIntroduceComp;