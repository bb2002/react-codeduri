import React from 'react';
import {Menu} from "antd";
import {BugOutlined, DesktopOutlined, SendOutlined} from "@ant-design/icons";

export enum DISPLAY_MODE {
    CONSOLE = "console",
    TESTING = "testing",
    SUBMIT = "submit"
}

interface DisplayModeSelectorCompProps {
    currentMode: DISPLAY_MODE,
    onModeChanged: (mode: DISPLAY_MODE) => void
}

const DisplayModeSelectorComp = ({ currentMode, onModeChanged }: DisplayModeSelectorCompProps) => {
    return (
        <Menu selectedKeys={[currentMode]} mode="horizontal" style={{ backgroundColor: "#00000000", color: "white", borderBottom: "none" }} onClick={(e) => onModeChanged(e.key as DISPLAY_MODE)}>
            <Menu.Item key={DISPLAY_MODE.TESTING} icon={<BugOutlined />}>
                테스팅
            </Menu.Item>
            <Menu.Item key={DISPLAY_MODE.SUBMIT} icon={<SendOutlined />}>
                제출
            </Menu.Item>
        </Menu>
    );
};

export default DisplayModeSelectorComp;