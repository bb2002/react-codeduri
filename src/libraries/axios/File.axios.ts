import getAxiosInstance from "../config/AxiosConfig";

export const uuidToOriginalNameAxios = (uuids: string[]) => getAxiosInstance().post(`/file/nconv`, uuids)