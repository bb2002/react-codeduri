import React, {useState} from 'react';
import "../../stylesheet/common/Header.css"
import "../../stylesheet/common/Utils.css"
import { Link } from "react-router-dom"
import Logo from "../../assets/images/codeduri-logo.png"
import {Dropdown, Input, Menu} from "antd"
import {SearchOutlined, UnlockOutlined, UserOutlined} from "@ant-design/icons";
import { Button } from "antd"
import LoginModalComp from "../login/LoginModalFirst.comp";
import useLogin from "../../hooks/useLogin";
import {useHistory} from "react-router";

const Header = () => {
    const [visibleLoginModal, setVisibleLoginModal] = useState(false)
    const { login, logout } = useLogin()
    const history = useHistory()
    const [searchText, setSearchText] = useState("")

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/user" >
                <Button type="text">
                    <UserOutlined /> 사용자 정보
                </Button>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Button type="link" danger onClick={logout}>
                    <UnlockOutlined /> 로그아웃
                </Button>
            </Menu.Item>
        </Menu>
    )

    const onSearchEnterPressed = () => {
        history.push("/search/" + searchText)
    }

    return (
        <div id="header-container">
            <LoginModalComp
                visibleModal={visibleLoginModal}
                onCancelPressed={() => setVisibleLoginModal(false)} />

            <div className="container">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Link to="/">
                        <img src={Logo} id="header-logo" alt="KNU 코딩플랫폼"/>
                    </Link>
                    <div className="vertical-divider-bar" style={{ height: 18, marginRight: 16 }}/>
                    <SearchOutlined style={{ marginRight: 4 }}/>
                    <Input
                        placeholder="강좌 제목, 교수명 검색"
                        className="search-box"
                        onPressEnter={onSearchEnterPressed}
                        onChange={(e) => setSearchText(e.target.value)}/>



                    {
                        login.isLogged ? (
                            <>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a id="user-profile-link" onClick={e => e.preventDefault()}>
                                    <img src={login.profile?.profileImageURL} alt="프로필이미지" id="user-profile-img"/>
                                    {login.profile?.name}님
                                </a>
                            </Dropdown>
                            </>
                        ) : (
                            <Button
                                type="primary"
                                style={{ marginLeft: "auto", width: 150 }}
                                onClick={() => setVisibleLoginModal(true)}>로그인</Button>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;
