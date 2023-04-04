import axios from "axios";

const BACK_URL = 'http://localhost:5000'

export async function getArticlesData(start) {
    const res = await axios(
        {
            method: "GET",
            url: `${BACK_URL}/list/${start}`
        });
    console.log(res);
    return await res.data;
}

export async function getArticlesCount() {
    const res = await axios(
        {
            method: "GET",
            url: `${BACK_URL}/list/count`
        });
    return await res.data;
}
export async function getTags() {
    const res = await axios(
        {
            method: "GET",
            url: `${BACK_URL}/tags`
        });
    return await res.data;
}

export async function getArticleById(id) {
    const res = await axios(
        {
            method: "GET",
            url: `${BACK_URL}/article/${id}`
        });
    return await res.data;
}


export async function getArticleByTagId(tagId) {
    const res = await axios(
        {
            method: "GET",
            url: `${BACK_URL}/articles/${tagId}`
        });
    return await res.data;
}

