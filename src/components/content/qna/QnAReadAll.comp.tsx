import React, {useEffect} from 'react';
import useQnA from "../../../hooks/useQnA";
import {Button, Table, Tag} from "antd";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom"
import {EditOutlined, LockOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import {ParticipantLevel} from "../../../libraries/types/Participant.type";
import useLogin from "../../../hooks/useLogin";

interface QnAReadAllComp {
    match: {
        params: {
            contestId: string
        }
    },
    currentLevel: ParticipantLevel
}

const QnAReadAllComp = ({ match, currentLevel }: QnAReadAllComp) => {
    const { qna, readAllQnA, resetQnA } = useQnA()
    const { login } = useLogin()
    const history = useHistory()

    useEffect(() => {
        if(match.params.contestId) {
            readAllQnA(match.params.contestId)
        }
    }, [match.params.contestId])

    useEffect(() => {
        return () => {
            resetQnA()
        }
    }, [])

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: 100
        },
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
            render: (arr: any[]) => (
                <>
                    {
                        arr[2] && (
                            <LockOutlined />
                        )
                    }
                    <Link to={`/contest/${match.params.contestId}/read/${arr[0]}`}>{arr[1]}</Link>
                </>

            )
        },
        {
            title: "작성자",
            dataIndex: "writer",
            key: "writer"
        },
        {
            title: "답변",
            dataIndex: "reply",
            key: "reply",
            render: (cnt: number) => {
                if(cnt === 0) {
                    return <Tag color="volcano">0</Tag>
                } else {
                    return <Tag color="green">{cnt}</Tag>
                }
            }
        },
        {
            title: "조회",
            dataIndex: "viewCnt",
            key: "viewCnt"
        }
    ]

    const dataSource = qna.readAll.data?.filter(value => {
        if(currentLevel === ParticipantLevel.PROFESSOR) return true
        return !(value.isSecret && value.author.sId !== login.profile?.studentId);
    }).map(value => ({
        no: value.no,
        title: [value.no, value.title, value.isSecret],
        writer: value.author.name,
        reply: value.replyCnt,
        viewCnt: value.viewCnt
    }))

    return (
        <div>
            <Title level={2}>질의응답</Title>
            <Table columns={columns} dataSource={dataSource} loading={qna.loading}/>
            <br />
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button type="default" icon={<EditOutlined />} onClick={() => history.push(`/contest/${match.params.contestId}/write`)}>
                    새 질문 작성
                </Button>
            </div>

        </div>
    );
};

export default QnAReadAllComp;