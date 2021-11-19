import React from 'react';
import { Button } from "antd";
import "../../../stylesheet/ide/CoursePagination.css"
import { ProblemItem } from "../../../libraries/types/Problem.type"
import { useHistory, useLocation } from 'react-router-dom';

interface CoursePaginationCompProps {
    problemItems: ProblemItem[]
    problemUUID: string
}

const CoursePaginationComp = ({ problemItems, problemUUID }: CoursePaginationCompProps) => {
    const history = useHistory();

    const currPage = problemItems.map(value => value.uuid).indexOf(problemUUID)
    const splits = history.location.pathname.split("/")
    splits.length -= 1
    let baseUrl = ""

    for(let block of splits) {
        baseUrl += block + "/"
    }

    const prePage = () => {

        if (currPage <= 0) {
            return true;
        }
        else {
            const prePageUuid = problemItems[currPage - 1].uuid
            return <Button size="small" type="text" className="pagination-button" onClick={() => history.push(baseUrl + prePageUuid)}>이전</Button>
        }
    }

    const nextPage = () => {
        if (currPage >= problemItems.length - 1) {
            return true;
        }
        else {
            const nextPageUuid = problemItems[currPage + 1].uuid
            return <Button size="small" type="text" className="pagination-button" onClick={() => history.push(baseUrl + nextPageUuid)}>다음</Button>
        }
    }

    return (
        <div id="course-pagination-container">
            {prePage()}
            <p>{currPage + 1} / {problemItems.length}</p>
            {nextPage()}
        </div>
    );
};

export default CoursePaginationComp