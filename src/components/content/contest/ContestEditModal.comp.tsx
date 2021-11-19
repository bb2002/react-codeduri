import React, {useState} from 'react';
import {Alert, DatePicker, Input, Modal, Tabs} from "antd";
import {ContestForm} from "../../../libraries/types/Contest.type";
import { Radio } from 'antd';
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import ContentLanguageFieldComp from "../common/write/ContentLanguageField.comp";
import FileUploader from "../../common/FileUploader";

interface ContestEditModalCompProps {
    visible: boolean
    defaultValue: ContestForm
    onEditButtonPressed: (form: ContestForm) => void
    onCancelButtonPressed: () => void
}

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const ContestEditModalComp = ({ visible, defaultValue, onEditButtonPressed, onCancelButtonPressed }: ContestEditModalCompProps) => {
    const [contestForm, setContestForm] = useState(defaultValue)
    const [fileUploading, setFileUploading] = useState(false)

    const onTitleChanged = (title: string) => {
        setContestForm({
            ...contestForm,
            title
        })
    }

    const onContentChanged = (content: string) => {
        setContestForm({
            ...contestForm,
            content
        })
    }

    const onEnrollDateChanged = (enrollStartDate: string, enrollEndDate: string) => {
        setContestForm({
            ...contestForm,
            enrollStartTime: moment(enrollStartDate),
            enrollEndTime: moment(enrollEndDate)
        })
    }

    const onContestDateChanged = (contestStartDate: string, contestEndDate: string) => {
        setContestForm({
            ...contestForm,
            contestStartTime: moment(contestStartDate),
            contestEndTime: moment(contestEndDate)
        })
    }

    const onPublicChanged = (isPublic: boolean) => {
        setContestForm({
            ...contestForm,
            isPublic
        })
    }

    function disabledDate(current: any) {
        const now = moment().subtract(1, 'day');
        return current && current < now;
    }

    console.log(contestForm.contestStartTime.format("YYYY-MM-DD HH:mm:ss"))

    return (
        <Modal
            title="대회 수정"
            centered
            confirmLoading={fileUploading}
            visible={visible}
            onOk={() => onEditButtonPressed(contestForm)}
            onCancel={onCancelButtonPressed}
            width={700}>
            <Tabs defaultActiveKey="title" tabPosition="left" style={{ height: 400 }}>
                <TabPane key="title" tab="제목">
                    <p><b>제목</b></p>
                    <Input
                        placeholder="대회 제목을 입력하세요."
                        value={contestForm.title}
                        maxLength={18}
                        onChange={(e) => onTitleChanged(e.target.value as string)}/>
                </TabPane>
                <TabPane key="content" tab="대회 설명">
                    <p><b>대회 설명</b></p>
                    <TextArea
                        rows={6}
                        value={contestForm.content}
                        onChange={(e) => onContentChanged(e.target.value as string)}/>
                </TabPane>
                <TabPane key="time" tab="개최 기간">
                    <p><b>참가 기간</b></p>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                        onChange={(_, date: string[]) => onEnrollDateChanged(date[0], date[1])}
                        value={[contestForm.enrollStartTime, contestForm.enrollEndTime]}/>
                    <br /><br />
                    <p><b>풀이 기간</b></p>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                        onChange={(_, date: string[]) => onContestDateChanged(date[0], date[1])}
                        value={[contestForm.contestStartTime, contestForm.contestEndTime]}  />
                </TabPane>
                <TabPane key="language" tab="언어 설정">
                    <ContentLanguageFieldComp onValueChanged={(value => {

                        setContestForm({
                            ...contestForm,
                            usableLanguages: value
                        })
                    })} selectedLanguages={contestForm.usableLanguages}/>
                </TabPane>
                <TabPane key="thumbnail" tab="썸네일">
                    <p><b>썸네일 이미지</b></p>
                    <FileUploader onFileChanged={(files) => {
                        const image = files.filter(value => value.status === "done")[0]
                        if(image) {
                            setContestForm({
                                ...contestForm,
                                logoImageURL: image.response
                            })
                        }
                    }} onUploadStateChanged={(uploading) => setFileUploading(uploading)} />
                </TabPane>
                <TabPane key="public" tab="공개 여부">
                    <p><b>공개 여부</b></p>
                    <Radio.Group
                        options={[{ label: "누구나 참가", value: true }, { label: "승인 필요", value: false }]}
                        value={contestForm.isPublic}
                        onChange={(e) => onPublicChanged(e.target.value as boolean)}
                        buttonStyle="solid"
                        optionType="button"
                        disabled={!defaultValue.isPublic}/>
                    <br /><br />

                    {
                        !defaultValue.isPublic && (
                            <Alert message="승인 필요로 설정된 대회의 경우, 누구나 참가로 변경 할 수 없습니다." type="error" showIcon />
                        )
                    }

                    {
                        (defaultValue.isPublic && !contestForm.isPublic) && (
                            <Alert message="이 설정이 업데이트 되면 '누구나 참가'로 다시 돌아갈 수 없습니다!" type="warning" showIcon />
                        )
                    }
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default ContestEditModalComp;