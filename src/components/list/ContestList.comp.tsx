import React, {useEffect} from 'react';
import ContentPreviewBox from "../common/ContentPreviewBox";
import useContest from "../../hooks/useContest";

const ContestListComp = () => {
    const { contest, readAllContest, resetContest } = useContest()

    useEffect(() => {
        readAllContest()

        return () => {
            resetContest()
        }
    }, [])

    return (
        <div>
            <ContentPreviewBox title="프로그래밍 경진대회" link="/contest" items={
                contest.readAll.result?.map(value => ({
                    cardImageURL: value.logoImageURL,
                    professorImageURL: value.author.profileImageURL,
                    professorName: value.author.name,
                    title: value.title,
                    description: value.content,
                    tag: `${value.contestStartTime.format("MM/DD HH:mm")} ~ ${value.contestEndTime.format("MM/DD HH:mm")}`,
                    applyCount: value.lengthOfParticipant,
                    isNeedApply: !value.isPublic,
                    goto: `/contest/${value._id}`
                })).reverse().slice(0, 4)
            } />
        </div>
    );
};

export default ContestListComp;
