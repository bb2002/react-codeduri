import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import {noticeReadOneAxios, noticeUpdateAxios} from "../../libraries/axios/Notice.axios";
import BoardEditComp from "../../components/board/BoardEdit.comp";
import useLogin, {checkMyPermissionBetween} from "../../hooks/useLogin";
import {ProfileLevel} from "../../libraries/types/User.type";
import {useHistory} from "react-router";

interface NoticeEditProps {
    match: { params: { number: number } }
}

const NoticeEdit = ({ match }: NoticeEditProps) => {
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
                <BoardEditComp
                    no={match.params.number}
                    header="공지사항"
                    subHeader="공지사항을 수정합니다."
                    redirectURL="/notice"
                    updateAxios={noticeUpdateAxios}
                    readOneAxios={noticeReadOneAxios}
                    canEdit={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                     />
            </div>

            <Footer />
        </div>
    );
};

export default NoticeEdit;