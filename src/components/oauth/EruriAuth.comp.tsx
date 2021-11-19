import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, message, Tooltip } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import "../../stylesheet/oauth/EruriAuth.css"
import Title from "antd/es/typography/Title";
import { LoginCallbackParam } from "../../libraries/types/EruriAuth.type";
import useEruriAuth from "../../hooks/useEruriAuth";
import { HttpResultCode } from "../../libraries/Utils";
import { SSO_LOGIN_ROOT } from "../../libraries/config/AxiosConfig";
import useLogin from "../../hooks/useLogin";
import {useHistory} from "react-router";

interface EruriAuthCompProps {
    param: LoginCallbackParam
}

const EruriAuthComp = ({ param }: EruriAuthCompProps) => {
    interface UserForm {
        username: string,
        password: string
    }

    const { login } = useLogin()
    const history = useHistory()

    const snsId = login.profile?.uniqueId


    const [userForm, setUserForm] = useState({ username: "", password: "" } as UserForm)
    const { eruri, authEruri, resetEruriAuth } = useEruriAuth()

    useEffect(() => {
        if (eruri.data !== undefined && eruri.authState === HttpResultCode.HTTP_200) {
            message.success("인증되었습니다. 감사합니다.")

            setTimeout(() => {
                window.location.href = SSO_LOGIN_ROOT + "/oauth/kakao"
            }, 1000)
        }

        if(eruri.authState === HttpResultCode.HTTP_403) {
            message.error("아이디 또는 비밀번호가 잘못되었습니다.")
        }
    }, [eruri.data, eruri.authState])

    const onLoginPressed = () => {
        if(snsId != undefined){ // 카카오 로그인하고 탈주했을 시
            if (userForm.username && userForm.password) {
                authEruri({
                    userId: userForm.username,
                    password: userForm.password,
                    snsId: snsId // 기존에 있었던 snsId 저장된 값으로 넣어줌
                })
            }
            else {
                message.warn("입력하지 않은 값이 있습니다.")
            }
        }
        else { // 정상적인 로그인 시도
            if (userForm.username && userForm.password && param.id) {
                authEruri({
                    userId: userForm.username,
                    password: userForm.password,
                    snsId: param.id
                })
            }
            else {
                message.warn("입력하지 않은 값이 있습니다.")
            }
        }
    }

    useEffect(() => {
        return () => {
            resetEruriAuth()
        }
    }, [])

    return (
        <div>
            <Alert
                message="강원대학교 학생 인증"
                description="본 서비스는 강원대학교 학생 또는 교수자만 이용 가능합니다. 이루리 계정으로 로그인하여 인증을 완료합니다."
                type="info"
                showIcon
            />
            <br />
            <Card title="코드두리에서 회원님의 개인정보에 접근하는 것에 동의하십니까?" style={{ width: "100%" }} type="inner">
                <p>제공된 정보는 이용자 식별, 통계, 계정 연동 등을 위해 서비스 이용기간동안 활용/보관됩니다.</p>
                <p>기본정보 및 필수 제공 항목은 KNU CodingPlatform 서비스를 이용하기 위해 반드시 제공되어야 할 정보입니다.</p>
                <p>필수 제공 항목</p>
                <ul>
                    <li>이름</li>
                    <li>학번</li>
                    <li>전화번호</li>
                    <li>학과</li>
                </ul>
            </Card>

            <Card className="login-container">
                <Title level={2} style={{ marginBottom: 32 }}>e-루리 계정 인증</Title>
                <Input
                    placeholder="e-루리 ID"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="이루리 ID를 입력하세요.">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                    style={{
                        marginBottom: 16
                    }}
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                />
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="e-루리 비밀번호"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{
                        marginBottom: 16
                    }}
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                />

                <div className="button-container">
                    <a href="https://kcloud.kangwon.ac.kr/websquare/websquare.jsp?w2xPath=/ui/system/ssm/ssm01/ssm01002_t.xml&GUBUN_NUM=1" target="_blank" rel="noreferrer">
                        <Button type="text">ID 찾기</Button>
                    </a>
                    <a href="https://kcloud.kangwon.ac.kr/websquare/websquare.jsp?w2xPath=/ui/system/ssm/ssm01/ssm01002_t.xml&GUBUN_NUM=2" target="_blank" rel="noreferrer">
                        <Button type="text">비밀번호 찾기</Button>
                    </a>

                    <Button
                        type="primary"
                        loading={eruri.loading}
                        onClick={onLoginPressed}
                        style={{
                            marginLeft: "auto",
                            width: 150
                        }}>로그인</Button>

                </div>
            </Card>
        </div>
    );
};

export default EruriAuthComp;