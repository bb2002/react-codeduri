import React from 'react';
import "../../../stylesheet/ide/Console.css"
import {Button} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const ConsoleComp = () => {
    return (
        <div id="console-container">
            <TextArea
                className="console-input-value"
                placeholder="입력 값"
                size="middle"
                rows={7} />
            <Button style={{ display: "flex", justifyContent: "center", alignItems: "center" }} type="primary">
                <ArrowRightOutlined />
            </Button>
            <TextArea
                className="console-input-value"
                placeholder="왼쪽 화살표를 클릭하여 실행"
                size="middle"
                readOnly={true}
                rows={7} />
        </div>
    );
};

export default ConsoleComp;