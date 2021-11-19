import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {eruriAuth, eruriProfile, eruriReset} from "../redux/modules/EruriAuth.redux";
import {EruriAuthForm} from "../libraries/types/EruriAuth.type";

export default function useEruriAuth() {
    const eruri = useSelector((state: RootState) => state.eruri)
    const dispatch = useDispatch()

    const getEruriProfile = (accessToken: string) => {
        dispatch(eruriProfile(accessToken))
    }

    const authEruri = (form: EruriAuthForm) => {
        dispatch(eruriAuth(form))
    }

    const resetEruriAuth = () => {
        dispatch(eruriReset())
    }

    return {
        eruri,
        getEruriProfile,
        authEruri,
        resetEruriAuth
    }
}