import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import BoardReadComp from "../../components/board/BoardRead.comp";
import {noticeDeleteAxios, noticeReadOneAxios} from "../../libraries/axios/Notice.axios";
import {ProfileLevel} from "../../libraries/types/User.type";
import {checkMyPermissionBetween} from "../../hooks/useLogin";
import {useHistory} from "react-router";
import useLogin from "../../hooks/useLogin";

interface NoticeReadProps {
    match: { params: { number: number } }
}

const NoticeRead = ({ match }: NoticeReadProps) => {
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
    
    return (
        <div>
            {isEmpty()}
            <Header />
            <HomeNavBar selectedMenu={EHomeNavItem.NOTICE}/>
            <br /><br />
            <div className="container">
                <BoardReadComp
                    no={match.params.number}
                    readOneAxios={noticeReadOneAxios}
                    deleteAxios={noticeDeleteAxios}
                    listURL="/notice"
                    editURL="/notice/edit"
                    canEdit={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                    canDelete={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                />
            </div>
            <Footer />
        </div>
    );
};

export default NoticeRead;
