import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import BoardWriteComp from "../../components/board/BoardWrite.comp";
import {faqCreateAxios} from "../../libraries/axios/FAQ.axios";
import useLogin, {checkMyPermissionBetween} from "../../hooks/useLogin";
import {ProfileLevel} from "../../libraries/types/User.type";
import {useHistory} from "react-router";

const FaqWrite = () => {
    return (
        <div>
            <Header />
            <HomeNavBar selectedMenu={EHomeNavItem.FAQ}/>
            <br /><br />
            <div className="container">
                <BoardWriteComp
                    header="FAQ"
                    subHeader="새 FAQ 를 등록합니다."
                    createAxios={faqCreateAxios}
                    redirectURL="/faq"
                    canWrite={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                />
            </div>
            <Footer />
        </div>
    );
};

export default FaqWrite;