import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import BoardListComp from "../../components/board/BoardList.comp";
import {noticeReadAllAxios} from "../../libraries/axios/Notice.axios";
import {checkMyPermissionBetween} from "../../hooks/useLogin";
import {ProfileLevel} from "../../libraries/types/User.type";
import {useHistory} from "react-router";
import useLogin from "../../hooks/useLogin";

const Notice = () => {
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
                <BoardListComp
                    title="공지사항"
                    readAllAxios={noticeReadAllAxios}
                    url="/notice"
                    sorting={true}
                    writeURL="/notice/write"
                    canWrite={checkMyPermissionBetween(ProfileLevel.ADMIN)}/>
            </div>
            <Footer />
        </div>
    );
};

export default Notice;
