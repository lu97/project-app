export const SET_PAGE = 'set_page';
export const SET_ARTICLE = 'set_article';
export const SET_ARTICLES = 'set_articles';

export const setArticle = (article) => ({type: SET_ARTICLE, article});
export const setArticles = (articles) => ({type: SET_ARTICLES, articles});