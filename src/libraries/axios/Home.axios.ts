import getAxiosInstance from "../config/AxiosConfig";

export const searchAxios = (text: string) => getAxiosInstance().get("/search?q=" + text)