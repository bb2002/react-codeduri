import React, {useEffect} from 'react';
import {LoginCallbackParam} from "../../libraries/types/EruriAuth.type";
import {message, Spin} from "antd";
import useEruriAuth from "../../hooks/useEruriAuth";
import {HttpResultCode} from "../../libraries/Utils";
import {useHistory} from "react-router";
import useLogin, {saveLoginDataInStorage} from "../../hooks/useLogin";

interface ProfileLoadingCompProps {
    param: LoginCallbackParam
}

const ProfileLoadingComp = ({ param }: ProfileLoadingCompProps) => {
    const { eruri, getEruriProfile } = useEruriAuth()
    const { saveLoginDataInRedux } = useLogin()
    const history = useHistory()
    
    useEffect(() => {
        if(param.accessToken) {
            getEruriProfile(param.accessToken)
        }
        
    }, [getEruriProfile, param.accessToken])
    
    useEffect(() => {
        if(eruri.data
            && eruri.profileState === HttpResultCode.HTTP_200
            && param.accessToken
            && param.refreshToken) {
            saveLoginDataInStorage({
                ...eruri.data,
                accessToken: param.accessToken,
                refreshToken: param.refreshToken
            })
            saveLoginDataInRedux()
            history.replace("/")
        }

        if(eruri.profileState !== HttpResultCode.HTTP_200 && eruri.profileState !== HttpResultCode.NONE) {
            message.error("로그인 인증 토큰에 오류가 있습니다.")
            history.replace("/")
        }
    }, [eruri.profileState, eruri.data])
    
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
            <Spin size="large" />
        </div>
    );
};

export default ProfileLoadingComp;