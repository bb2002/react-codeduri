import React from 'react';
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import ContestListComp from "../../../components/list/ContestList.comp";
import HomeNavBar, {EHomeNavItem} from "../../../components/atom/HomeNavBar";
import {Button} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import useLogin from "../../../hooks/useLogin";
import {ProfileLevel} from "../../../libraries/types/User.type";

const ContestAll = () => {
    const history = useHistory()
    const { login } = useLogin()

    const snsId = login.profile?.uniqueId
    const stuId = login.profile?.studentId

    const isEmpty = () => {
        if(snsId != undefined && stuId != undefined){ // sns와 stuId가 underfined가 아닐 때
            console.log("undefined 아님")
            if(snsId.length >= 2 && stuId.length == 0){ // snsId의 길이가 2보다 클 때(공백이 아닐 때) 그리고 stuId가 공백일 때
                history.push('/oauth/callback')
            }   
        }
    }

    return (
        <div>
            {isEmpty()}
            <Header />
            <HomeNavBar selectedMenu={EHomeNavItem.CONTEST} />
            <br /><br />
            <div className="container">
                <ContestListComp />
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
                    {
                        login.profile?.permission === ProfileLevel.PROFESSOR && (
                            <Button
                                type="default"
                                style={{ display: "flex", alignItems: "center" }}
                                onClick={() => {
                                    history.push("/contest/write")
                                }}><PlusOutlined />새 대회 개설</Button>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContestAll;