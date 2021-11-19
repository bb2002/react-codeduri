import React, { CSSProperties, useEffect, useState } from 'react';
import "../../stylesheet/common/ContentPreviewBox.css"
import { Link } from 'react-router-dom';
import { Card } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import TextBadge from "../atom/TextBadge";
import { useWindowSize } from "../../hooks/useWindowSize";
import {FILE_DOWNLOAD_SERVER} from "../../libraries/config/AxiosConfig";

interface ContentPreviewItem {
    cardImageURL: string        // 강좌 이미지
    professorImageURL: string   // 교수 프로필 이미지
    professorName: string       // 교수 이름
    title: string               // 제목
    description: string         // 내용
    tag: string                 // 하단 문자열(태그)
    applyCount: number          // 참가자 수
    isNeedApply: boolean        // 신청이 필요한가?
    goto?: string                // 클릭시 이동할 URL
}

interface ContentPreviewBoxProps {
    title: string
    link: string
    items: ContentPreviewItem[]
    styles: CSSProperties
}

const ContentPreviewBox = ({ styles, title, link, items }: ContentPreviewBoxProps) => {
    const [windowSize] = useWindowSize()
    const [emptyItemCount, setEmptyItemCount] = useState(0)

    useEffect(() => {
        if (windowSize[0] > 1400) {
            setEmptyItemCount(Math.ceil(items.length / 4) * 4 - items.length)
        } else if (windowSize[0] <= 1400 && windowSize[0] > 991) {
            // 한줄에 3개의 아이템
            setEmptyItemCount(Math.ceil(items.length / 3) * 3 - items.length)
        } else if (windowSize[0] <= 991 && windowSize[0] > 768) {
            setEmptyItemCount(Math.ceil(items.length / 2) * 2 - items.length)
        } else {
            setEmptyItemCount(0)
        }
    }, [windowSize, items.length])

    return (
        <Card className="content-preview-box" style={styles}>
            {
                link ? (
                    <Link to={link}>
                        <div className="content-preview-box-title">
                            <p>
                                <strong>{title}</strong>
                            </p>
                            <PlusOutlined />
                        </div>
                    </Link>
                ) : (
                    <div className="content-preview-box-title">
                        <p>
                            <strong>{title}</strong>
                        </p>
                    </div>
                )
            }


            <div className="content-preview-box-content">
                {
                    items.map(item => (
                        <Card id="content-preview-item" bodyStyle={{ padding: 0, height: 290 }}>
                            <div id="content-preview-img">
                                <Link to={item.goto ? item.goto : ""}>
                                    <img src={FILE_DOWNLOAD_SERVER + item.cardImageURL} alt="수업 카드" />
                                </Link>

                            </div>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div id="content-preview-desc">
                                    <div id="content-preview-desc-profile">
                                        <img src={item.professorImageURL} alt="프사" />
                                        <p>{item.professorName}</p>
                                    </div>
                                    <div id="content-preview-desc-desc">
                                        <Link to={item.goto ? item.goto : ""} style={{ color: "black" }}>
                                            <strong>{item.title.length > 11 ? item.title.slice(0, 12) + "..." : item.title }</strong>
                                        </Link>
                                        <p>
                                            {item.description.length > 30 ? item.description.slice(0, 32) + "..." : item.description}
                                        </p>
                                        <p>
                                            {item.tag}
                                        </p>
                                    </div>
                                </div>

                                <div id="content-preview-desc-meta">
                                    <UserOutlined />
                                    <p>{item.applyCount}명 참가</p>
                                    {
                                        item.isNeedApply ? (
                                            <TextBadge color="#FF4D4F" message="신청필요" style={{ marginLeft: "auto" }} />
                                        ) : (
                                            <TextBadge color="#52C41A" message="누구나" style={{ marginLeft: "auto" }} />
                                        )
                                    }

                                </div>
                            </div>
                        </Card>
                    ))
                }
                {
                    function () {
                        let items = []

                        for (let i = 0; i < emptyItemCount; ++i) {
                            items[i] = (<div
                                style={{ width: "22.5%", minWidth: "280px", height: "300px", marginBottom: "32px" }} />)
                        }

                        return items
                    }()
                }
            </div>

        </Card>
    );
};

ContentPreviewBox.defaultProps = {
    styles: {
        width: "100%"
    },
    items: [],
    link: undefined
}

export default ContentPreviewBox;
