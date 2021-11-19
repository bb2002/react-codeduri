import React from 'react';
import {Steps} from "antd";
import {useWindowSize} from "../../../../hooks/useWindowSize";

interface ContentStepCompProps {
    currentStep: number
}

const { Step } = Steps

const ContentStepComp = ({ currentStep }: ContentStepCompProps) => {
    const [windowSize] = useWindowSize()

    return (
        <Steps current={currentStep} direction={windowSize[0] > 768 ? "horizontal" : "vertical"}>
            <Step title="소개"/>
            <Step title="썸네일"/>
            <Step title="참가 기간"/>
            <Step title="풀이 기간"/>
            <Step title="대상"/>
            <Step title="언어"/>
        </Steps>
    )

};

export default ContentStepComp;