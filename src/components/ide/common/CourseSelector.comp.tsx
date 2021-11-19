import React from 'react';
import {Dropdown, Menu} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {ProblemItem} from "../../../libraries/types/Problem.type";
import { Link, useLocation } from "react-router-dom"

interface CourseSelectorCompProps {
    problemItems: ProblemItem[]
    problemUUID: string
}

const CourseSelectorComp = ({ problemItems, problemUUID }: CourseSelectorCompProps) => {
    const location = useLocation()

    const menu = (
        <Menu>
            {
                problemItems.map(value => {
                    const pathSplit = location.pathname.split("/")
                    pathSplit[pathSplit.length - 1] = value.uuid + ""

                    return (<Menu.Item key={value.uuid}>
                        <Link to={`${pathSplit.join("/")}`}>{value.problemTitle}</Link>
                    </Menu.Item>)
                })
            }
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ display: "flex", alignItems: "center" }}>
                {
                    function() {
                        const selectedItem = problemItems.filter(value => value.uuid === problemUUID)
                        if(selectedItem.length === 0) {
                            return "문제를 선택하세요."
                        } else {
                            return selectedItem[0].problemTitle
                        }
                    }()
                } <DownOutlined style={{ marginLeft: 16 }}/>
            </a>
        </Dropdown>
    );
};

export default CourseSelectorComp;