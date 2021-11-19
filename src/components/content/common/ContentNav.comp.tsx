import React from 'react';
import {Layout, Menu, Breadcrumb} from "antd";
import "../../../stylesheet/content/ContentNav.css"

const { Header, Content, Footer } = Layout;

interface ContentNavCompProps {
    keys: string[],
    names: string[],
    selectedKey: string,
    onMenuClicked: (key: string) => void
}

const ContentNavComp = ({ keys, names, selectedKey, onMenuClicked }: ContentNavCompProps) => {
    return (
        <nav>
            <div className="container">
                <Menu theme="dark" mode="horizontal" onClick={(e) => onMenuClicked(e.key)} selectedKeys={[selectedKey]}>
                    {
                        names.map((name, index) => (
                        <Menu.Item key={keys[index]} style = {{width: "150px", textAlign: "center"}}>
                                    {name}
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        </nav>
    );
};

export default ContentNavComp;