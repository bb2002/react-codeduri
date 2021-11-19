import React from 'react';
import Header from "../../components/common/Header";
import HomeNavBar, {EHomeNavItem} from "../../components/atom/HomeNavBar";
import Footer from "../../components/common/Footer";
import {noticeCreateAxios} from "../../libraries/axios/Notice.axios";
import BoardWriteComp from "../../components/board/BoardWrite.comp";
import {checkMyPermissionBetween} from "../../hooks/useLogin";
import {ProfileLevel} from "../../libraries/types/User.type";

const NoticeWrite = () => {

    return (
        <div>
            <Header />

            <HomeNavBar selectedMenu={EHomeNavItem.NOTICE}/>
            <br /><br />
            <div className="container">
                <BoardWriteComp
                    header="공지사항"
                    subHeader="새 공지사항을 작성합니다."
                    createAxios={noticeCreateAxios}
                    redirectURL="/notice"
                    canWrite={checkMyPermissionBetween(ProfileLevel.ADMIN)}
                />
            </div>

            <Footer />
        </div>
    );
};

export default NoticeWrite;