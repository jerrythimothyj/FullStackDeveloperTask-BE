import axios from "axios";

const instance = axios.create({
    baseURL: process.env.GITHUB_BASE_URL,
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, accept: 'application/vnd.github.v3+json' }
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