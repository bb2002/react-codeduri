import React from 'react';
import {Dropdown, Menu} from "antd";
import {MenuInfo} from "rc-menu/lib/interface";
import "../../../stylesheet/ide/LanguageSelector.css"
import {getNameOfLanguage, Language} from "../../../libraries/config/SupportLanguage";

interface LanguageSelectorCompProps {
    language?: Language,
    selectableLanguages: Language[]
    setLanguage: (language: Language) => void
}

const LanguageSelectorComp = ({ language, setLanguage, selectableLanguages }: LanguageSelectorCompProps) => {
    const menu = (
        <Menu onClick={(e: MenuInfo) => setLanguage(selectableLanguages.filter(value => value === e.key)[0])}>
            {
                selectableLanguages.map(value => (
                    <Menu.Item key={value}>{getNameOfLanguage(value)}</Menu.Item>
                ))
            }
        </Menu>
    )

    return (
        <div className="language-selector-container">
            <p className="p-clean" style={{ color: "white", marginRight: 32}}>언어 선택</p>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {language ? getNameOfLanguage(language) : "로드 중..."}
                </a>
            </Dropdown>
        </div>
    );
};

export default LanguageSelectorComp;