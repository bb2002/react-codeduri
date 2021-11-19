import React from 'react';
import {Button} from "antd";

interface RunModeSelectorCompProps {
    onTestButtonPressed: () => void
    onSubmitButtonPressed: () => void
    loading: boolean
}

const RunModeSelectorComp = ({ onTestButtonPressed, onSubmitButtonPressed, loading }: RunModeSelectorCompProps) => {
    return (
        <div>
            <Button type="link" onClick={onTestButtonPressed} loading={loading}>테스트</Button>
            <Button type="primary" onClick={onSubmitButtonPressed} loading={loading}>제출</Button>
        </div>
    );
};

export default RunModeSelectorComp;