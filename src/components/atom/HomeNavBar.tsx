import React from 'react';
import { useHistory } from "react-router-dom";
import "../../stylesheet/atom/HomeNavBar.css"
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { BellOutlined, BookOutlined, CodepenOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export enum EHomeNavItem {
    NOTICE = "notice",
    FAQ = "faq",
    LECTURE = "lecture",
    CONTEST = "contest"
}

interface HomeNavBarProps {
    selectedMenu: EHomeNavItem
}

const HomeNavBar = ({ selectedMenu }: HomeNavBarProps) => {
    const history = useHistory()

    const onMenuItemClicked = (e: MenuInfo) => {
        history.push(`/${e.key}`)
    }


    return (
        <div id="nav-container">
            <div className="container">
                <Menu id="menu-container" onClick={onMenuItemClicked} selectedKeys={[selectedMenu as string]} mode="horizontal">
                    <Menu.Item key="notice" icon={<BellOutlined />}>
                        공지사항
                    </Menu.Item>
                    <Menu.Item key="faq" icon={<QuestionCircleOutlined />}>
                        FAQ
                    </Menu.Item>
                    <Menu.Item key="contest" icon={<CodepenOutlined />}>
                        경진대회
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default HomeNavBar;
