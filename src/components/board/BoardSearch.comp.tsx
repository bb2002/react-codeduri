import React from 'react';
import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import "../../stylesheet/board/BoardSearch.css"

interface BoardSearchCompProps {
    placeholder: string
    value: string
    onChanged: (value: string) => void
}

const BoardSearchComp = ({ placeholder, value, onChanged }: BoardSearchCompProps) => {
    return (
        <Input
            className="board-searchbox"
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            onChange={(value) => onChanged(value.target.value)}
            value={value} />
    );
};

export default BoardSearchComp;