import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, Tabs} from "antd";
import QuillEditor from "../../common/QuillEditor";
import {ProblemForm, ProblemItem, TestCaseItem} from "../../../libraries/types/Problem.type";
import TestCaseItemComp from "../common/TestCaseItem.comp";
import {PlusOutlined} from "@ant-design/icons";
import FileUploader from "../../common/FileUploader";
import {UploadFile} from "antd/es/upload/interface";

interface ProblemEditorCompProps {
    visible: boolean
    loading: boolean
    originId: string
    defaultProblemItem: ProblemItem
    defaultTestCases: TestCaseItem[]
    onSavePressed: (problemForm: ProblemForm, testCases: TestCaseItem[]) => void
    onCancelPressed: () => void
}

const ProblemEditorComp = ({ visible, loading, originId, defaultProblemItem, defaultTestCases, onSavePressed, onCancelPressed }: ProblemEditorCompProps) => {
    const { TabPane } = Tabs;
    const [problemForm, setProblemForm] = useState<ProblemForm>({
        problemTitle: "",
        problemContent: "",
        problemCaution: "",
        images: [],
        contestId: originId
    })
    const [testCaseItems, setTestCaseItems] = useState<TestCaseItem[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        setProblemForm({
            problemTitle: defaultProblemItem.problemTitle,
            problemContent: defaultProblemItem.problemContent,
            problemCaution: defaultProblemItem.problemCaution,
            images: defaultProblemItem.images,
            contestId: problemForm.contestId
        })
    }, [defaultProblemItem])

    useEffect(() => {
        if(defaultTestCases) {
            setTestCaseItems(defaultTestCases)
        }
    }, [defaultTestCases])

    const onContentChanged = (value: string) => {
        setProblemForm({ ...problemForm, problemContent: value })
    }

    const onCautionChanged = (value: string) => {
        setProblemForm({ ...problemForm, problemCaution: value })
    }

    const onFileChanged = (files: UploadFile[]) => {
        let newFiles = files.filter(value => value.status === "done")

        setProblemForm({
            ...problemForm,
            images: newFiles
        })

    }

    return (
        <Modal
            title="문제 설정"
            centered={true}
            confirmLoading={loading && uploading}
            visible={visible}
            onOk={() => onSavePressed(problemForm, testCaseItems)}
            onCancel={onCancelPressed}
            width={1000}
            bodyStyle={{ height: 500 }}
            okText="저장"
            cancelText="취소">
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="문제 제목" key="1">
                    <p>
                        <b>문제제목 (최대 18자)</b>
                    </p>
                    <Input
                        placeholder="문제 제목을 입력하세요."
                        maxLength={18}
                        value={problemForm.problemTitle}
                        onChange={(e) => setProblemForm({ ...problemForm, problemTitle: e.target.value })}/>
                </TabPane>
                <TabPane tab="문제 설명" key="2">
                    <QuillEditor onChange={onContentChanged} value={problemForm.problemContent} height={300} />
                </TabPane>
                <TabPane tab="참고 자료" key="3">
                    <p>
                        <b>문제 참고자료 업로드</b>
                    </p>
                    <div style={{ width: "100%", height: 350}}>
                        <FileUploader
                            style={{ height: 160 }}
                            defaultFiles={problemForm.images}
                            onFileChanged={onFileChanged}
                            onUploadStateChanged={(uploading) => setUploading(uploading)} />
                    </div>

                </TabPane>
                <TabPane tab="테스트 케이스" key="4">
                    <Button type="default" shape="circle" icon={<PlusOutlined />}
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "auto" }}
                            onClick={() => setTestCaseItems([...testCaseItems, { exampleIn: "", exampleOut: "", isPublic: true }])}/>
                    <div style={{ overflowY: "scroll", height: 400, marginTop: 16 }}>
                        {
                            testCaseItems.length === 0 && (
                                <p style={{ textAlign: "center" }}>테스트케이스가 없습니다. 우측 상단 '+' 를 눌러 추가하세요.</p>
                            )
                        }

                        {
                            testCaseItems.map((value, index) => {
                                const onFormChanged = (value: TestCaseItem) => {
                                    const tmp = [...testCaseItems]
                                    tmp[index] = value
                                    setTestCaseItems(tmp)
                                }

                                const onDeletePressed = () => {
                                    const tmp = [] as TestCaseItem[]

                                    for(let i = 0; i < testCaseItems.length; ++i) {
                                        if(index !== i) {
                                            tmp.push(testCaseItems[i])
                                        }
                                    }

                                    setTestCaseItems(tmp)
                                }

                                return (
                                    <TestCaseItemComp
                                        testCaseForm={value}
                                        setTestCaseForm={onFormChanged}
                                        index={index} onDeletePressed={onDeletePressed}
                                        key={index}/>
                                )
                            })
                        }
                    </div>
                </TabPane>
                <TabPane tab="주의사항" key="5">
                    <QuillEditor onChange={onCautionChanged} value={problemForm.problemCaution} height={300} />
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default ProblemEditorComp;