import React from 'react';
import HomeComp from "../components/home/Home.comp";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {useHistory} from "react-router";
import useLogin from "../hooks/useLogin";


const Home = () => {
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
            <div className="container">
                <HomeComp />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
