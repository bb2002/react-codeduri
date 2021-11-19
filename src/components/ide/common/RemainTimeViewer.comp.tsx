import React, {useEffect, useRef, useState} from 'react';
import moment from "moment"

interface RemainTimeViewerCompProps {
    finishTime?: moment.Moment
}

const RemainTimeViewerComp = ({ finishTime }: RemainTimeViewerCompProps) => {
    const timer = useRef()
    const [cacheTime, setCacheTime] = useState(finishTime)

    useEffect(() => {
        function tick() {
            setCacheTime((prev) => {
                if(prev === undefined) {
                    return finishTime
                } else {
                    return moment(prev.subtract(0, "second"))
                }
            })
        }

        // @ts-ignore
        timer.current = setInterval(() => {
            tick()
        }, 1000)

        return () => {
            clearInterval(timer.current)
        }
    }, [finishTime])

    if(cacheTime === undefined) {
        return(
            <p style={{ color: "#e74c3c", margin: 0, padding: 0 }}>시간 제한 없음</p>
        )
    } else {
        return (
            <p style={{ color: "#e74c3c", margin: 0, padding: 0 }}>남은시간: {`
        ${moment.duration(cacheTime.diff(moment())).days()}일 
        ${moment.duration(cacheTime.diff(moment())).hours()}시간 
        ${moment.duration(cacheTime.diff(moment())).minutes()}분 
        ${moment.duration(cacheTime.diff(moment())).seconds()}초
        `} </p>
        );
    }
    
};

export default RemainTimeViewerComp;