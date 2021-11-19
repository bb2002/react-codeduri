import React from 'react';
import {Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ProblemForm} from "../../../../libraries/types/Problem.type";

interface ProblemCreateModalCompProps {
    modalVisible: boolean
    loading: boolean
    form: ProblemForm
    onOkPressed: () => void
    onCancelPressed: () => void
    onFormChanged: (newForm: ProblemForm) => void
}

const ProblemCreateModalComp = ({ modalVisible, loading, form, onFormChanged, onOkPressed, onCancelPressed }: ProblemCreateModalCompProps) => {
    return (
        // <Modal title="문제 추가" visible={modalVisible} onOk={onOkPressed} onCancel={onCancelPressed} confirmLoading={loading} okText="확인" cancelText="취소">
        //     <p style={{ marginBottom: 2, fontWeight: "bold" }}>문제 이름</p>
        //     <Input
        //         style={{ marginBottom: 16 }}
        //         onChange={(e) => onFormChanged({...form, problemTitle: e.target.value})} maxLength={18}
        //         value={form.problemTitle} />
        //
        //     <p style={{ marginBottom: 2, fontWeight: "bold" }}>문제 설명</p>
        //     <TextArea
        //         style={{ marginBottom: 16 }}
        //         maxLength={500}
        //         onChange={(e) => onFormChanged({...form, problemContent: e.target.value})}
        //         value={form.problemContent} />
        //
        //     <p style={{ marginBottom: 2, fontWeight: "bold" }} >주의사항</p>
        //     <TextArea
        //         maxLength={500}
        //         onChange={(e) => onFormChanged({ ...form, problemCaution: e.target.value })}
        //         value={form.problemCaution} />
        // </Modal>
        <></>
    );
};

export default ProblemCreateModalComp;