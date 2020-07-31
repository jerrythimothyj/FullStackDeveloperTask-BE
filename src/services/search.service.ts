import { ajaxGet } from "./api.service";

export const fetchData = (type: string, params: { text: string, page: number, per_page: number }) => ajaxGet(`search/${type}`, {
    q: params.text,
    page: params.page,
    per_page: params.per_page,
})