import React from 'react';
import {Card} from "antd";
import parse from "html-react-parser";
import "../../../stylesheet/ide/CardItem.css"

interface QuestionCardCompProps {
    title: string
    content: string
}

const TitleContentCardComp = ({ title, content }: QuestionCardCompProps) => {
    return (
        <Card className="ide-card-container" bodyStyle={{ padding: 18 }}>
            <h5><b>{title}</b></h5>
            <br />

            {
                parse(content ? content : "")
            }
        </Card>
    );
};

export default TitleContentCardComp;