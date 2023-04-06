import {
    SET_PAGE,
    SET_ARTICLE,
    ADD_ARTICLES_TO_LIST,
    SET_ARTICLES_COUNT,
    SET_TAGS,
    UPDATE_ARTICLES_LIST, ADD_MORE_ARTICLES
} from "./Actions";
import {createStore} from "redux";

const initialState = {
    currentPage: "articleList",
    currentArticle: null,
    articlesCount: 0,
    articles: [],
    tags: []

};
const store = (state = initialState, action) => {

    switch (action.type) {
        case SET_PAGE:
            return {...state, currentPage: action.page};
        case ADD_ARTICLES_TO_LIST:
            let articles = state.articles;
            articles = articles.concat(action.articles)
            return {...state, articles: articles};
        case UPDATE_ARTICLES_LIST:
            return {...state, articles: action.articles};
        case SET_ARTICLES_COUNT:
            return {...state, articlesCount: action.count};
        case SET_ARTICLE:
            return {...state, currentArticle: action.article};
        case SET_TAGS:
            return {...state, tags: action.tags};
        case ADD_MORE_ARTICLES:
            let current = state.currentArticle;
            current.moreArticles = action.moreArticles
            return {...state, currentArticle: current};
        default:
            return state;
    }
};

export const storage =  createStore(store, initialState)