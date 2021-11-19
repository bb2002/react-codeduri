import React, {useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import HomeComp from "../../components/home/Home.comp";
import Footer from "../../components/common/Footer";
import {searchAxios} from "../../libraries/axios/Home.axios";
import {ContestItem} from "../../libraries/types/Contest.type";
import HttpRequestError from "../../components/error/HttpRequestError.comp";
import {anyToContestItem} from "../../libraries/parser/AnyToItem";
import moment from "moment";
import ContentPreviewBox from "../../components/common/ContentPreviewBox";
import {useHistory} from "react-router";
import useLogin from "../../hooks/useLogin";

interface SearchResultProps {
    match: {
        params: {
            text: string
        }
    }
}

const SearchResult = ({ match }: SearchResultProps) => {

    const history = useHistory()
    const { login } = useLogin()

    const isEmpty = () => {  
        const snsId = login.profile?.uniqueId
        const stuId = login.profile?.studentId
    
        if(snsId != undefined && stuId != undefined){ // sns와 stuId가 underfined가 아닐 때
            if(snsId.length >= 2 && stuId.length == 0){ // snsId의 길이가 2보다 클 때(공백이 아닐 때) 그리고 stuId가 공백일 때
                history.push('/oauth/callback')
            }   
        }
    }
    
    const [searchResult, setSearchResult] = useState<ContestItem[]>([])

    useEffect(() => {
        searchAxios(match.params.text).then((response) => {
            setSearchResult(response.data.map((value: any) => anyToContestItem(value)))
        }).catch(ex => {
            setSearchResult([])
        })
    }, [match.params.text])

    return (
        <div>
            {isEmpty()}
            <Header />
            <div className="container">
                <br /><br /><br />
                <h2>{match.params.text}에 대한 검색결과</h2>
                {
                    searchResult.length === 0 && (
                        <p>검색 결과가 없습니다.</p>
                    )
                }

                {
                    searchResult.length !== 0 && (
                        <ContentPreviewBox title="프로그래밍 경진대회" link="/contest" items={
                            searchResult.map(value => {
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
                            }).reverse()
                        } />
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default SearchResult;