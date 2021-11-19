import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import "../../stylesheet/atom/Loading.css"

const Loading = () => {
    return (
        <div className="loading">
            <LoadingOutlined style={{ fontSize: '300%'}} />
        </div>
    );
};

export default Loading;