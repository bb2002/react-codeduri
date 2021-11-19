import React, { useEffect } from 'react';
import "../../stylesheet/login/LoginModal.css"
import { Input, Modal, Button } from "antd";
import Logo from "../../assets/images/codeduri-logo.png"
import kakao from "../../assets/images/KakaoIcon.png"
import google from "../../assets/images/googleIcon.png"
import twiter from "../../assets/images/TwiterIcon.png"
import { SSO_LOGIN_ROOT } from "../../libraries/config/AxiosConfig";

interface LoginModalProp {
    visibleModal: boolean
    onCancelPressed: () => void
}

const iconImg = (
    <img
        width={25}
        height={25}
        src={kakao} />
)

const iconImg2 = (
    <img
        width={25}
        height={25}
        src={google} />
)

const iconImg3 = (
    <img
        width={20}
        height={27}
        src={twiter} />
)

const LoginModalComp = ({ visibleModal, onCancelPressed }: LoginModalProp) => {
    return (
        <Modal visible={visibleModal} footer={[]} onCancel={onCancelPressed} centered>
            <div id="login-modal-container">
                <img src={Logo} style={{ height: 35 }} alt="KNU 코딩 플랫폼" />
                <br /><br />
                <div style={{ width: "84%" }}>
                    <p>SSO 통합로그인으로 로그인 하세요.</p>

                    <a href={`${SSO_LOGIN_ROOT}/oauth/kakao`}>
                        <Button type="primary" icon={iconImg} style={{ background: "#fae301", borderColor: '#fae301', }}>
                            <b>
                                <view style={{ color: '#391b1b', margin: '110px' }}>카카오로 로그인하기</view>
                            </b>
                        </Button>
                    </a>
                    <br /><br />
                    {/*
                <a href={`${SSO_LOGIN_ROOT}/oauth/google`}>
                    <Button type="primary"  icon={ iconImg2 } style={{ background: "white", borderColor: '#4285f4',}}>
                        <b>
                            <view style = {{color:'#4285f4', margin: '120px'}}>구글로 로그인하기</view>
                        </b>
                    </Button>
                </a>
                <br/><br/>

                <a href={`${SSO_LOGIN_ROOT}/oauth/twitter`}>
                    <Button type="primary"  icon={ iconImg3 } style={{ background: "#00a2f5", borderColor: '#00a2f5',}}>
                        <b>
                            <view style = {{color:'white', margin: '110px'}}>트위터로 로그인하기</view>
                        </b>
                    </Button>
                </a>
                */}
                </div>
                <br /><br />
            </div>
        </Modal>
    );
};

export default LoginModalComp;
