export const getSearchId = (reqQuery: { text: string, type: string, page: string, per_page: string }) => {
    const { text, type, page, per_page } = reqQuery;
    return `text=${text}&type=${type}&page=${page}&per_page=${per_page}`
}