import {SET_PAGE, SET_ARTICLE, SET_ARTICLES} from "./Actions";
import {createStore} from "redux";
import {mock_article_list} from "../sources/mocks/mock_sources";

const initialState = {
    currentPage: "articleList",
    currentArticle: null,
    articles: mock_article_list

};
const store = (state = initialState, action) => {

    switch (action.type) {
        case SET_PAGE:
            return {...state, currentPage: action.page};
        case SET_ARTICLES:
            return {...state, articles: action.articles};
        case SET_ARTICLE:
            return {...state, currentArticle: action.article};
        default:
            return state;
    }
};

export const storage =  createStore(store, initialState)