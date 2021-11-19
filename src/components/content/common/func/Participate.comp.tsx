import React, {useEffect, useState} from 'react';
import Title from "antd/es/typography/Title";
import {AutoComplete, Button, Input, Select, Space, Table, Tag} from "antd";
import {CheckOutlined} from '@ant-design/icons';
import {ParticipantItem, ParticipantLevel} from "../../../../libraries/types/Participant.type";
import {HttpResultCode} from "../../../../libraries/Utils";

const { Option } = Select;

interface ParticipateCompProps {
    loading: boolean
    participates?: ParticipantItem[]
    onUpdateAllPressed: (newState: ParticipantLevel) => void
    onUpdateOnePressed: (snsId: string, newState: ParticipantLevel) => void
}

interface ParticipateRowData {
    key: string,
    id: string,
    major: string,
    name: string,
    role: {
        level: ParticipantLevel
        snsId: string
    }
}

interface SearchFilter {
    searchBasis: 0 | 1 | 2,     // 이름 | 학번 | 학과
    search: string,
    filter: ParticipantLevel    // 전체 | 승인대기 | 참가중 | 조교
}

const initialFilterState = {
    searchBasis: 0,
    filter: ParticipantLevel.NONE,
    search: ""
} as SearchFilter

const ParticipateComp = ({ loading, participates, onUpdateAllPressed, onUpdateOnePressed }: ParticipateCompProps) => {
    const [rowData, setRowData] = useState([] as ParticipantItem[])
    const [filter, setFilter] = useState(initialFilterState)

    const columns = [
        {
            title: '학번',
            dataIndex: 'id',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '학과(전공)',
            dataIndex: 'major',
        },
        {
            title: '이름',
            dataIndex: 'name',
        },
        {
            title: '역할',
            key: 'role',
            dataIndex: 'role',
            render: (value: { level: ParticipantLevel, snsId: string }) => {
                if (value.level === ParticipantLevel.PROFESSOR) {
                    return (
                        <Tag color={"#2980b9"}>교수자</Tag>
                    )
                } else {
                    return (
                        <Space size="middle">
                            <Select value={value.level} style={{width: '120px'}} bordered={false}
                                    onChange={(level) => onUpdateOnePressed(value.snsId, level)}>
                                <Option value={ParticipantLevel.WAIT}>
                                    <Tag color={"red"}>승인 대기</Tag>
                                </Option>
                                <Option value={ParticipantLevel.ENROLL}>
                                    <Tag color={"green"}>참가자</Tag>
                                </Option>
                                <Option value={ParticipantLevel.ASSISTANT}>
                                    <Tag color={"cyan"}>조교</Tag>
                                </Option>
                            </Select>
                        </Space>
                    )
                }
            }
        }
    ]

    useEffect(() => {
        const tmp = participates?.filter(value => {
            if(filter.filter !== ParticipantLevel.NONE) {
                // 전체 | 승인대기 | 참가중 | 조교 에 대한 필터
                if(value.level !== filter.filter) return false
            }

            if(filter.search !== "") {
                if(filter.searchBasis === 0) {
                    // 이름 검색
                    if(value.profile.name.indexOf(filter.search) === -1) return false
                }

                if(filter.searchBasis === 1) {
                    // 학번 검색
                    if(value.profile.studentId.indexOf(filter.search) === -1) return false
                }

                if(filter.searchBasis === 2) {
                    // 학과 검색
                    if(value.profile.department.indexOf(filter.search) === -1) return false
                }
            }

            return true
        })

        setRowData(tmp ? tmp : [])
    }, [filter, participates])

    return (
        <div>
            <Title level={2}>역할</Title>
            <br />
            <Input.Group compact>
                <Select value={filter.searchBasis} style={{ width: '10%' }} onChange={(value) => setFilter({ ...filter, searchBasis: value })}>
                    <Option value={0}>이름</Option>
                    <Option value={1}>학번</Option>
                    <Option value={2}>학과(전공)</Option>
                </Select>
                <AutoComplete
                    style={{ width: '90%', marginBottom: "50px",}}
                    placeholder="검색어 입력"
                    value={filter.search}
                    onChange={(text) => setFilter({...filter, search: text})}
                />
            </Input.Group>

            <div style={{ marginBottom: "10px", display: "flex" }}>
                <Select value={filter.filter} style={{ width: '10%'}} onChange={(value) => setFilter({ ...filter, filter: value })}>
                    <Option value={ParticipantLevel.NONE}>전체</Option>
                    <Option value={ParticipantLevel.WAIT}>승인 대기</Option>
                    <Option value={ParticipantLevel.ENROLL}>참가중</Option>
                    <Option value={ParticipantLevel.ASSISTANT}>조교</Option>
                    <Option value={ParticipantLevel.PROFESSOR}>교수자</Option>
                </Select>
                <Button danger style={{marginLeft: "auto"}} icon={<CheckOutlined />} onClick={() => onUpdateAllPressed(ParticipantLevel.WAIT)}>
                    전원 승인 대기
                </Button>
                <Button type="primary" style={{marginLeft: 4}} icon={<CheckOutlined />} onClick={() => onUpdateAllPressed(ParticipantLevel.ENROLL)}>
                    전원 승인
                </Button>
            </div>

            <Table
                style={{marginBottom: "100px"}}
                columns={columns}
                loading={loading}
                dataSource={rowData.map(value => ({
                    id: value.profile.studentId,
                    key: value.profile.uniqueId,
                    major: value.profile.department,
                    role: {
                        level: value.level,
                        snsId: value.profile.uniqueId
                    },
                    name: value.profile.name
                }))}
            />
        </div>
    );
};

export default ParticipateComp;
