import React from 'react';
import {Card, Radio} from "antd";

interface ContentTargetFieldCompProps {
    onChanged: (value: boolean) => void
    isPublic: boolean
}

const ContentTargetFieldComp = ({ onChanged, isPublic }: ContentTargetFieldCompProps) => {
    return (
        <div>
            <p style={{ marginBottom: 2 }}><b>참가 범위</b></p>
            <Card>
                <Radio.Group onChange={(e) => { onChanged(e.target.value as boolean) }} value={isPublic}>
                    <Radio value={true} style={{ marginBottom: 8 }}>누구나 참여 가능</Radio>
                    <br />
                    <Radio value={false}>승인된 사용자만 참여 가능</Radio>
                </Radio.Group>
            </Card>

        </div>
    );
};

export default ContentTargetFieldComp;