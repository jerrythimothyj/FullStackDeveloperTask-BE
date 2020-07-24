import axios from "axios";
import { BASE_URL, GITHUB_TOKEN } from "../constants/api.constant";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
});

export const apiGet = (url: string, params: { text: string, page: number, per_page: number }) => instance.get(
    url,
    {
        params: {
            q: params.text,
            page: params.page,
            per_page: params.per_page,
        }
    }
)