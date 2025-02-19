import axios from "axios";

const instance = axios.create({
  baseURL: process.env.GITHUB_BASE_URL,
  headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, accept: 'application/vnd.github.v3+json' }
});

export const ajaxGet = (url: string, params: { q: string, page: number, per_page: number }) => instance.get(
  url,
  {
    params
  }
)