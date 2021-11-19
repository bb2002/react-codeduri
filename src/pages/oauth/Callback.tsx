import React, {useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EruriAuthComp from "../../components/oauth/EruriAuth.comp";
import {useHistory} from "react-router";
import queryString from 'query-string';
import {LoginCallbackParam} from "../../libraries/types/EruriAuth.type";
import ProfileLoadingComp from "../../components/oauth/ProfileLoading.comp";


const Callback = () => {
    const history = useHistory()
    const [cbParam, setCbParam] = useState<LoginCallbackParam>({ isAuthed: false })

    useEffect(() => {
        let params = queryString.parse(history.location.search)

        if(params.id !== undefined) {
            // 이 사용자는 인증되지 않음.
            setCbParam({
                id: params.id as string,
                isAuthed: false
            })
        }

        if(params.accessToken !== undefined && params.refreshToken !== undefined) {
            // 이 사용자는 인증이 됨.
            setCbParam({
                id: undefined,
                accessToken: params.accessToken as string,
                refreshToken: params.refreshToken as string,
                isAuthed: true
            })
        }
    }, [history.location.search])

    return (
        <div>
            <Header />
            <br /><br />
            <div className="container">
                {
                    cbParam.isAuthed ? (
                        <ProfileLoadingComp
                            param={cbParam}/>
                    ) : (
                        <EruriAuthComp
                            param={cbParam}/>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default Callback;