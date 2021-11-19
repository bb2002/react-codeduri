import React, {useRef} from 'react';
import {CopyOutlined} from "@ant-design/icons";
import {Card, message} from "antd";
import "../../../stylesheet/ide/CardItem.css"
import TextArea from "antd/es/input/TextArea";

interface ExampleCardCompProps {
    inputValue: string
    outputValue: string
}

const ExampleCardComp = ({ inputValue, outputValue }: ExampleCardCompProps) => {
    const copyFun = (className: string) => {
        message.success("복사되었습니다.")
        let area = document.getElementsByClassName(className)[0]
        // @ts-ignore
        area.select()
        document.execCommand("copy")
    }

    return (
        <Card className="ide-card-container" bodyStyle={{ padding: 18 }}>
            <h5><b>예시</b></h5>
            <br />

            <div className="ide-example-element">
                <p>입력</p>
                <CopyOutlined onClick={() => copyFun("textarea.inText")}/>
            </div>
            <TextArea size="small" readOnly={true} value={inputValue} className="textarea.inText"/>
            <div style={{ marginTop: 16, marginBottom: 16 }} />

            <div className="ide-example-element">
                <p>출력</p>
                <CopyOutlined onClick={() => copyFun("textarea.outText")}/>
            </div>
            <TextArea size="small" readOnly={true} value={outputValue} className="textarea.outText" />

            <div style={{ marginTop: 16, marginBottom: 16 }} />
        </Card>
    );
};

export default ExampleCardComp;