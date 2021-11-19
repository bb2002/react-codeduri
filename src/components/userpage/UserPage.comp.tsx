import React, {useEffect} from 'react';
import "../../stylesheet/userpage/UserPage.css"
import { Pagination, Card } from "antd";
import { BlockOutlined } from '@ant-design/icons';
import ContentPreviewBox from "../common/ContentPreviewBox";
import useLogin from "../../hooks/useLogin";

const UserHomeComp = () => {
    const { login } = useLogin()

    return (
        <div>
            <h2>
                <b>마이페이지</b>
            </h2>
            <br /><br />
            <h4>일반정보</h4>
            <br />

            <Card title="" loading={login.profile === undefined}>
                <Card.Grid className = "card" style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 학번 </b>
                    <br />
                    <h5>{login.profile?.studentId}</h5>
                </Card.Grid>

                <Card.Grid className = "card" style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 학과(전공) </b>
                    <br />
                    <h5>{login.profile?.department}</h5>
                </Card.Grid>

                <Card.Grid className = "card" style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 이름 </b>
                    <br />
                    <h5>{login.profile?.name}</h5>
                </Card.Grid>

                <Card.Grid className = "card "style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 역할 </b>
                    <br />
                    <h5>
                        {
                            function() {
                                if(login.profile?.permission === 0) {
                                    return "학부생"
                                } else if(login.profile?.permission === 1) {
                                    return "교수자"
                                } else if(login.profile?.permission === 2) {
                                    return "관리자"
                                } else {
                                    return "누구세요.."
                                }
                            }()
                        }
                    </h5>
                </Card.Grid>

                <Card.Grid className = "card" style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 이메일 </b>
                    <br/>
                        <h5>{login.profile?.emailAddress}</h5>
                </Card.Grid>

                <Card.Grid className = "card"style={{height: '170px'}}>
                    <b style = {{color: '#878585',}}><BlockOutlined /> 휴대전화 번호 </b>
                    <br/>
                        <h5>{login.profile?.phoneNumber}</h5>
                </Card.Grid>
            </Card>

            <div className="info">개인정보 수정은 K-Cloud 를 이용해주시기 바랍니다.</div>
            <br /><br /><br /><br />
        </div>
    );
};


export default UserHomeComp;