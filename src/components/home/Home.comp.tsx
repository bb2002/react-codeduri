import React, {useEffect, useState} from 'react';
import "../../stylesheet/home/Home.css"
import BoardPreviewBox, {BoardPreviewItem} from "../common/BoardPreviewBox";
import {useWindowSize} from "../../hooks/useWindowSize";
import ContentPreviewBox from "../common/ContentPreviewBox";
import {faqReadAllAxios} from "../../libraries/axios/FAQ.axios";
import {noticeReadAllAxios} from "../../libraries/axios/Notice.axios";
import useContest from "../../hooks/useContest";
import {checkAndShowErrorMessage} from "../../libraries/Utils";
import {BoardItem} from "../../libraries/types/Board.type";
import {anyToBoardItem} from "../../libraries/parser/AnyToItem";
import moment from "moment";

const HomeComp = () => {
    const [windowSize] = useWindowSize()
    const { contest, readAllContest } = useContest()
    const [notice, setNotice] = useState<undefined | BoardItem[]>(undefined)
    const [faq, setFaq] = useState<undefined | BoardItem[]>(undefined)

    useEffect(() => {
        const macro = (response: any, setFunc: any, url: string) => {
            const body = response.data as any[]
            const items = body.map(value => anyToBoardItem(value))
            setFunc(items)
        }

        faqReadAllAxios().then((response: any) => {
            macro(response, setFaq, '/faq')
        }).catch((ex) => {
            checkAndShowErrorMessage(ex.response?.status)
        })

        noticeReadAllAxios().then((response: any) => {
            macro(response, setNotice, '/notice')
        }).catch((ex) => {
            checkAndShowErrorMessage(ex.response?.status)
        })

        readAllContest()
    }, [])

    return (
        <div id="home-container">
            <div id="home-preview-board">
                <BoardPreviewBox
                    boardName="공지사항"
                    boardContent = {
                        notice === undefined ? [] : notice.map(value => ({
                            title: value.title,
                            date: value.date.format("MM/DD HH:MM"),
                            link: `/notice/${value.no}`
                        }))
                    }
                    loading={notice === undefined}
                    style={windowSize[0] < 768 ? { width: "100%", marginBottom: 8 } : { width: "49%", marginRight: "1%" }}
                    link={"/notice"} />
                <BoardPreviewBox
                    boardName="FAQ"
                    boardContent = {
                        faq === undefined ? [] : faq.map(value => ({
                            title: value.title,
                            date: value.date.format("MM/DD HH:MM"),
                            link: `/faq/${value.no}`
                        }))
                    }
                    loading={faq === undefined}
                    style={windowSize[0] < 768 ? { width: "100%", marginTop: 8 } : { width: "49%", marginLeft: "1%" }}
                    link={"/faq"} />
            </div>
            <br />
            <ContentPreviewBox title="프로그래밍 경진대회" link="/contest" items={
                contest.readAll.result?.filter(value => moment().valueOf() - value.contestEndTime.valueOf() < 0).map(value => {
                    let tag = ""
                    if(moment().valueOf() - value.enrollEndTime.valueOf() > 0) {
                        tag = value.contestEndTime.format("MM월 DD일") + " 풀이 마감"
                    } else {
                        tag = value.enrollEndTime.format("MM월 DD일") + " 신청 마감"
                    }

                    return {
                        cardImageURL: value.logoImageURL,
                        professorImageURL: value.author?.profileImageURL,
                        professorName: value.author?.name,
                        title: value.title,
                        description: value.content,
                        tag: tag,
                        applyCount: value.lengthOfParticipant,
                        isNeedApply: !value.isPublic,
                        goto: `/contest/${value._id}`
                    }
                }).reverse().slice(0, 8)
            } />
            <br />
        </div>
    );
};

export default HomeComp;
