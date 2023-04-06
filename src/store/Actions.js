export const SET_PAGE = 'set_page';
export const SET_ARTICLE = 'set_article';
export const SET_ARTICLES_COUNT = 'set_articles_count';
export const ADD_ARTICLES_TO_LIST = 'add_articles_to_list';
export const UPDATE_ARTICLES_LIST = 'update_articles_list';
export const ADD_MORE_ARTICLES = 'add_more_articles';
export const SET_TAGS = 'set_tags';

export const setArticle = (article) => ({type: SET_ARTICLE, article});
export const addMoreArticles = (article_id, moreArticles) => ({type: ADD_MORE_ARTICLES, article_id, moreArticles});
export const addArticlesToList = (articles) => ({type: ADD_ARTICLES_TO_LIST, articles});
export const updateArticlesList = (articles) => ({type: UPDATE_ARTICLES_LIST, articles});
export const setArticlesCount = (count) => ({type: SET_ARTICLES_COUNT, count});
export const setTags = (tags) => ({type: SET_TAGS, tags});