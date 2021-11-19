import React from 'react';
import {Tag} from "antd";
import "../../../stylesheet/ide/Testing.css"
import useMark from "../../../hooks/useMark";

const TestingComp = () => {
    const {mark} = useMark()

    return (
        <div id="testing-container">
                {
                    function() {
                        if(mark.test.error) {
                            // 코드에 오류가 있었음.
                            return (
                                <div>
                                    <p style={{ color: "red" }}>코드에 오류가 있습니다.</p>
                                    <p style={{ color: "#bababa" }}>{mark.test.error}</p>
                                </div>
                            )
                        } else {
                            return (
                                <table id="testing-table">
                                    <tr>
                                        <th>입력</th>
                                        <th>예상 출력</th>
                                        <th>실제 출력</th>
                                        <th>결과</th>
                                    </tr>
                                    {
                                        mark.test.result?.map((value, index) => (
                                            <tr key={index}>
                                                <td style={{ whiteSpace: "pre" }}>{value.inputValue}</td>
                                                <td style={{ whiteSpace: "pre" }}>{value.outputValue}</td>
                                                <td style={{ whiteSpace: "pre" }}>{value.resultValue}</td>
                                                <td>
                                                    <Tag color={value.isPass ? "#27ae60" : "#e74c3c"}>
                                                        {value.isPass ? "정답" : "오답"}
                                                    </Tag>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            )
                        }
                    }()

                }
        </div>

    );
};

export default TestingComp;