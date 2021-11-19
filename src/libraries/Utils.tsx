import {
    AudioOutlined,
    DiffOutlined,
    FieldBinaryOutlined, FileExcelOutlined, FileGifOutlined,
    FileImageOutlined, FileJpgOutlined, FilePdfOutlined, FilePptOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {message} from "antd";
import {put} from "redux-saga/effects";

export enum HttpResultCode {
    NONE     = 0,
    HTTP_200 = 200,
    HTTP_201 = 201,
    HTTP_400 = 400,
    HTTP_401 = 401,
    HTTP_403 = 403,
    HTTP_404 = 404,
    HTTP_500 = 500,
    HTTP_502 = 502,
    HTTP_RESULT_FAILED = 1000
}

export function isHttpCodeMeanError(code: HttpResultCode) {
    return !(code === HttpResultCode.HTTP_200 || code === HttpResultCode.HTTP_201 || code === HttpResultCode.NONE);
}

export function getFileIcon(extension: string) {
    switch(extension.toLowerCase()) {
        case "png": case "bmp":
            return <FileImageOutlined />
        case "gif":
            return <FileGifOutlined />
        case "jpg": case "jpeg":
            return <FileJpgOutlined />
        case "mp4": case "mov": case "wmv": case "avi": case "flv": case "swf":
            return <VideoCameraOutlined />
        case "mp3": case "aac": case "wav": case "aiff": case "flac":
            return <AudioOutlined />
        case "doc": case "hwp": case "docm": case "docx":
            return <DiffOutlined />
        case "pdf":
            return <FilePdfOutlined />
        case "xlsx":
            return <FileExcelOutlined />
        case "pptx":
            return <FilePptOutlined />
        default:
            return <FieldBinaryOutlined />
    }
}

export function checkAndShowErrorMessage(code?: HttpResultCode) {
    switch(code) {
        case undefined:
            message.error("알 수 없는 오류가 발생했습니다.")
            return false;
        case HttpResultCode.NONE:
        case HttpResultCode.HTTP_200:
        case HttpResultCode.HTTP_201:
            return true;
        case HttpResultCode.HTTP_400:
            message.error("HTTP 400 오류가 발생했습니다.")
            return false;
        case HttpResultCode.HTTP_401:
            message.error("HTTP 401 오류가 발생했습니다.")
            return false;
        case HttpResultCode.HTTP_404:
            message.error("요청하신 리소스를 찾을 수 없습니다.")
            return false;
        case HttpResultCode.HTTP_500:
            message.error("내부서버에 장애가 발생했습니다.")
            return false;
        case HttpResultCode.HTTP_502:
            message.error("프록시 서버가 응답하지 않습니다.")
            return false;
        case HttpResultCode.HTTP_RESULT_FAILED:
            message.error("요청을 보낼 수 없습니다.")
            return false;
    }

    return false;
}

export function* networkErrorMacro(ex: any, fun: any) {
    if(ex.response === undefined) {
        yield put(fun(HttpResultCode.HTTP_RESULT_FAILED))
    } else {
        yield put(fun(ex.response.status))
    }
}