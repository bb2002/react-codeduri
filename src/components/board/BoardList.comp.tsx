import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "antd";
import {BoardReadAllAxios} from "../../libraries/types/Board.type";
import useBoard from "../../hooks/useBoard";
import BoardSearchComp from "./BoardSearch.comp";
import {EditOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";

interface BoardListCompProps {
    title: string
    url: string
    sorting: boolean
    readAllAxios: BoardReadAllAxios
    writeURL: string
    canWrite: boolean
}

const BoardListComp = ({ title, url, sorting, readAllAxios, writeURL, canWrite }: BoardListCompProps) => {
    const { board, readAllItems, clearRedux, checkError } = useBoard()
    const [data, setData] = useState([] as any[])
    const [search, setSearch] = useState("")
    const history = useHistory()

    const columns = [
        {
            title: "번호",
            dataIndex: "no",
            key: "no",
            align: "center" as "center"
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            align: 'center' as 'center',
            render: (text: string, item: any) => {
                return <Link to={`${url}/${item.no}`}>{text}</Link>
            }
        },
        {
            title: '작성자',
            dataIndex: 'writer',
            key: 'writer',
            align: 'center' as 'center',
        },
        {
            title: '작성일',
            dataIndex: 'date',
            key: 'date',
            align: 'center' as 'center',
        },
        {
            title: '조회',
            dataIndex: 'cnt',
            key: 'cnt',
            align: 'center' as 'center',
        }
    ]

    useEffect(() => {
        readAllItems(readAllAxios)

        return () => {
            clearRedux()
            setData([])
        }
    }, [])

    useEffect(() => {
        if(!checkError(board.state.readAll) && board.items !== undefined) {
            let tmp = []
            for(let i of board.items) {
                tmp.push({
                    no: i.no,
                    title: i.title,
                    writer: i.author,
                    date: i.date.format("MM/DD HH:MM"),
                    cnt: i.viewCnt
                })
            }

            setData(tmp)
        }
    }, [board.items, board.state.readAll])

    useEffect(() => {
        if(board.items !== undefined) {
            let tmp = []

            for(let i of board.items) {
                if(i.title.indexOf(search) !== -1) {
                    tmp.push({
                        no: i.no,
                        title: i.title,
                        writer: i.author,
                        date: i.date.format("MM/DD HH:MM"),
                        cnt: i.viewCnt
                    })
                }
            }

            setData(tmp)
        }
    }, [search, board.items])

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2><b>{title}</b></h2>
                {
                    (canWrite) && (
                        <Button style={{ marginLeft: "auto" }} onClick={() => history.push(writeURL)}>
                            <EditOutlined style={{ marginBottom: 6, padding: 0 }}/>
                            글쓰기
                        </Button>
                    )
                }

            </div>


            <br />
            <BoardSearchComp
                placeholder={`${title} 검색`}
                value={search}
                onChanged={(search: string) => setSearch(search)} />
            <br /><br />
            <Table
                columns={columns}
                dataSource={sorting ? data.sort((a: any, b: any) => b.no - a.no) : data}
                size="middle"
                loading={board.loading.readAll}
                pagination={{ pageSize: 15, position: ["bottomCenter"] }} />
        </div>
    );
};

BoardListComp.defaultProps = {
    sorting: false
}

export default BoardListComp;