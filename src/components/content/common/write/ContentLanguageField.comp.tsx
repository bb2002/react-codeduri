import React, {useEffect, useState} from 'react';
import {Card, Checkbox} from 'antd';
import {Language} from "../../../../libraries/config/SupportLanguage";

interface ContentLanguageFieldCompProps {
    onValueChanged: (values: Language[]) => void
    selectedLanguages?: Language[]
}

const ContentLanguageFieldComp = ({ onValueChanged, selectedLanguages }: ContentLanguageFieldCompProps) => {
    const [language, setLanguage] = useState([] as Language[])

    const onSelectedChanged = (checked: boolean, newLanguage: Language) => {
        if(checked) {
            setLanguage([...language, newLanguage])
        } else {
            setLanguage([...language.filter(value => value !== newLanguage)])
        }
    }

    useEffect(() => {
        onValueChanged(language)
    }, [language])

    useEffect(() => {
        setLanguage(selectedLanguages ? selectedLanguages : [])
    }, [])

    return (
        <div>
            <p style={{ marginBottom: 2 }}><b>언어 선택</b></p>
            <Card>
                <Checkbox value={Language.C} style={{ marginBottom: 4 }}
                          checked={language.map(value => value).indexOf(Language.C) !== -1}
                          onChange={(e) => { onSelectedChanged(e.target.checked, Language.C) }}>C</Checkbox>
                <br />
                <Checkbox value={Language.CPP} style={{ marginBottom: 4 }}
                          checked={language.map(value => value).indexOf(Language.CPP) !== -1}
                          onChange={(e) => { onSelectedChanged(e.target.checked, Language.CPP) }}>C++</Checkbox>
                <br />
                <Checkbox value={Language.JAVA} style={{ marginBottom: 4 }}
                          checked={language.map(value => value).indexOf(Language.JAVA) !== -1}
                          onChange={(e) => { onSelectedChanged(e.target.checked, Language.JAVA) }}>Java</Checkbox>
                <br />
                <Checkbox value={Language.PYTHON3} style={{ marginBottom: 4 }}
                          checked={language.map(value => value).indexOf(Language.PYTHON3) !== -1}
                          onChange={(e) => { onSelectedChanged(e.target.checked, Language.PYTHON3) }}>Python 3</Checkbox>
            </Card>
        </div>
    );
};

export default ContentLanguageFieldComp;