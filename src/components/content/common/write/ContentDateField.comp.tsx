import React, {useRef} from 'react';
import {DatePicker} from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment from "moment";
import Text from "antd/es/typography/Text";

interface ContentDateFieldCompProps {
    key: string
    title: string
    content: string
    onDateChanged: (startDate: moment.Moment, endDate: moment.Moment) => void
    currentDate?: moment.Moment[]
}

const { RangePicker } = DatePicker;

const ContentDateFieldComp = ({ key, onDateChanged, currentDate, title, content }: ContentDateFieldCompProps) => {
    const dateChanged = (value: any, dateString: string[]) => {
        onDateChanged(moment(dateString[0]), moment(dateString[1]))
    }

    function disabledDate(current: any) {
        const now = moment().subtract(1, 'day');
        return current && current < now;
    }

    return (
        <div>
            <p style={{ marginBottom: 2 }}><b>{title}</b></p>
            <Text type="secondary">{content}</Text>
            <br /><br />
            <RangePicker
                key={key}
                locale={locale}
                showTime
                onChange={dateChanged}
                disabledDate={disabledDate}
                />

            {
                (currentDate && currentDate[0] && currentDate[1]) && (
                    <>
                        <p style={{ marginBottom: 2, marginTop: 16 }}><b>현재 선택</b></p>
                        <p>{currentDate[0].format("YYYY-MM-DD HH:mm:ss")} 부터 {currentDate[1].format("YYYY-MM-DD HH:mm:ss")}까지</p>
                    </>
                )
            }

        </div>
    );
};

export default ContentDateFieldComp;