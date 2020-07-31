import axios from "axios";
import { ajaxGet } from "./api.service";

const instance = axios.create({
    baseURL: process.env.GITHUB_BASE_URL,
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, accept: 'application/vnd.github.v3+json' }
});

export const fetchData = (type: string, params: { text: string, page: number, per_page: number }) => ajaxGet(`search/${type}`, {
    q: params.text,
    page: params.page,
    per_page: params.per_page,
})