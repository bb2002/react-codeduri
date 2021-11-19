import React from 'react';
import "../../../stylesheet/ide/TestCaseItem.css"
import {Button, Checkbox, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {TestCaseItem} from "../../../libraries/types/Problem.type";

interface TestCaseItemCompProps {
    testCaseForm: TestCaseItem
    setTestCaseForm: (value: TestCaseItem) => void
    index: number
    onDeletePressed: () => void
}

const TestCaseItemComp = ({ testCaseForm, setTestCaseForm, index, onDeletePressed }: TestCaseItemCompProps) => {
    return (
        <div className="testcase-item-container">
            <div className="testcase-item-title">
                <p style={{ marginRight: "auto" }}><b>테스트케이스 {index+1}</b></p>
                <Checkbox checked={!testCaseForm.isPublic} onChange={() => setTestCaseForm({...testCaseForm, isPublic: !testCaseForm.isPublic})}>비공개</Checkbox>
                <Button type="primary" shape="circle"
                        icon={<DeleteOutlined />}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        onClick={onDeletePressed} />
            </div>
            <div className="testcase-item-input">
                <TextArea placeholder="입력 값"
                          style={{ marginRight: 16, whiteSpace: "pre" }} value={testCaseForm.exampleIn}
                          onChange={(e) => setTestCaseForm({ ...testCaseForm, exampleIn: e.target.value })}/>
                <DoubleRightOutlined />
                <TextArea placeholder="출력 값"
                          style={{ marginLeft: 16, whiteSpace: "pre" }} value={testCaseForm.exampleOut}
                          onChange={(e) => setTestCaseForm({ ...testCaseForm, exampleOut: e.target.value })} />
            </div>

        </div>
    );
};

export default TestCaseItemComp;