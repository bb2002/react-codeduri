import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import BoardReadComp from "../../components/board/BoardRead.comp";
import {faqReadOneAxios, faqRemoveAxios} from "../../libraries/axios/FAQ.axios";
import useLogin, {checkMyPermissionBetween} from "../../hooks/useLogin";
import {ProfileLevel} from "../../libraries/types/User.type";
import {useHistory} from "react-router";

interface FAQReadProps {
    match: { params: { number: number } }
}

const FAQRead = ({ match }: FAQReadProps) => {

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
            <HomeNavBar selectedMenu={EHomeNavItem.FAQ}/>
            <br /><br />
            <div className="container">
                <BoardReadComp
                    no={match.params.number}
                    readOneAxios={faqReadOneAxios}
                    deleteAxios={faqRemoveAxios}
                    listURL="/faq"
                    editURL="/faq/edit"
                    canDelete={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                    canEdit={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                />
            </div>
            <Footer />
        </div>
    );
};

export default FAQRead;
