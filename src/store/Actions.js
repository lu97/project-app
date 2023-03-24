export const SET_PAGE = 'set_page';
export const SET_ARTICLE = 'set_article';
export const SET_ARTICLES_COUNT = 'set_articles_count';
export const SET_ARTICLES = 'set_articles';
export const SET_TAGS = 'set_tags';

export const setArticle = (article) => ({type: SET_ARTICLE, article});
export const setArticles = (articles) => ({type: SET_ARTICLES, articles});
export const setArticlesCount = (count) => ({type: SET_ARTICLES_COUNT, count});
export const setTags = (tags) => ({type: SET_TAGS, tags});