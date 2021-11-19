import React from 'react';
import "../../stylesheet/error/HttpRequestError.css"
import {Button, Result} from "antd";
import { Link } from 'react-router-dom';

interface HTTPRequestErrorProp {
    httpCode: number
}

function httpError (httpCode: number){
    switch(httpCode){
        case 200:
            return  <Result
            status="403"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 201:
            return  <Result
            status="403"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 400:
            return  <Result
            status="404"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 401:
            return  <Result
            status="404"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 404:
            return <Result
            status="404"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>요청하신 페이지의 주소가 잘못 입력되었거나, 삭제되어 찾을 수가 없습니다.</p>
            <p>페이지의 주소를 다시 확인해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        /> 
        case 500:
            return  <Result
            status="500"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 502:
            return  <Result
            status="500"
            title={<b style = {{fontSize: 50}}>{httpCode}</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
        case 1000:
            return  <Result
            status="500"
            title={<b style = {{fontSize: 50}}>Http Result Failed</b>}
            subTitle={<b>
            <p>죄송합니다.</p>
            <p>문제가 발생하여 요청하신 페이지를 표시하지 못했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            </b>}
            extra={<Link to = "/"><Button type="primary">메인으로</Button></Link>}
        />
    }
}

const HttpRequestError = ({ httpCode }: HTTPRequestErrorProp) => {
    return (
        <>
        {httpError(httpCode)}
        </>
    );
};

export default HttpRequestError;
