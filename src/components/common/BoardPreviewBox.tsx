import React, {CSSProperties} from 'react';
import { Link } from 'react-router-dom';
import {Card} from "antd";
import "../../stylesheet/common/BoardPreviewBox.css"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

export interface BoardPreviewItem {
    title: string,
    date: string,
    link: string
}

interface BoardPreviewBoxProps {
    style: CSSProperties,
    boardName: string,
    loading: boolean,
    boardContent: BoardPreviewItem[],
    link: string
}

const BoardPreviewBox = ({ style, boardName, loading, boardContent, link }: BoardPreviewBoxProps) => {
    return (
        <Card className="preview-box-container" style={style}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ margin: 0, marginRight: "auto"}}>
                    <Link to={link} style={{ color: "black" }}>
                        <strong>{boardName}</strong>
                    </Link>
                </p>
                <Link to={link} style={{ color: "black" }}>
                    <PlusOutlined />
                </Link>
            </div>
            <br />
            {
                loading ? (
                    <LoadingOutlined />
                ) : (
                    <table className="preview-box-content">
                        {
                            boardContent.map(value => (
                                <tr style={{ marginTop: 4, marginBottom: 4 }} key={value.link}>
                                    <td className="preview-box-content-title">
                                        <Link to={value.link} style={{ color: "black" }}>
                                            {value.title}
                                        </Link>
                                    </td>
                                    <td className="preview-box-content-date">{value.date}</td>
                                </tr>
                            ))
                        }
                    </table>
                )
            }

        </Card>
    );
};

BoardPreviewBox.defaultProps = {
    boardName: "Undefined"
}

export default BoardPreviewBox;
