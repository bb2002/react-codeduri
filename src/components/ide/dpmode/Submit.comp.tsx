import React from 'react';
import {Statistic, Tag} from "antd";
import "../../../stylesheet/ide/Testing.css"
import useMark from "../../../hooks/useMark";

const SubmitComp = () => {
    const {mark} = useMark()

    return (
        <div id="testing-container">
            {
                function() {
                    if(mark.submit.error) {
                        // 코드에 오류가 있는 경우
                        return (
                            <div>
                                <p style={{ color: "red" }}>코드에 오류가 있습니다.</p>
                                <p style={{ color: "#bababa" }}>{mark.submit.error}</p>
                            </div>
                        )
                    } else {
                        return (
                            <table id="testing-table">
                                <tr>
                                    <th>번호</th>
                                    <th>결과</th>
                                </tr>
                                {
                                    mark.submit.result && (
                                        mark.submit.result.pass.map((value, index) => (
                                            <tr>
                                                <td>{index + 1}번</td>
                                                <td>
                                                    <Tag color={value ? "#27ae60" : "#e74c3c"}>
                                                        {value ? "정답" : "오답"}
                                                    </Tag>
                                                </td>
                                            </tr>
                                        ))

                                    )
                                }
                            </table>
                        )
                    }
                }()
            }

        </div>
    );
};

export default SubmitComp;