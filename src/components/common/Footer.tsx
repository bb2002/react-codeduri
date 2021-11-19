import React from 'react';
import KNULogo from "../../assets/images/knu-logo.png"
import "../../stylesheet/common/Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div id="footer-container">
                    <img src={KNULogo} alt="KNU 강원대학교"/>

                    <div>
                        <p>춘천캠퍼스 : (24341)강원도 춘천시 강원대학길 1(효자동) 강원대학교 춘천캠퍼스 대표전화: 033-250-6114 팩스 033-251-9556</p>
                        <p>삼척캠퍼스 : (25913)강원도 삼척시 중앙로 346 강원대학교 삼척캠퍼스 대표전화: 033-570-6114 팩스 033-572-8620</p>
                        <p>도계캠퍼스 : (25949)강원도 삼척시 도계읍 황조길 346 강원대학교 도계캠퍼스 대표전화: 033-540-3114~5 팩스 033-540-3219</p>
                        <p><strong>COPYRIGHT (C) 2021 BY KANGWON NATIONAL UNIVERSITY. ALL RIGHTS RESERVED.</strong></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
