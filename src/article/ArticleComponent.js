import React from 'react';
import './ArticleStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {Link} from "react-router-dom";
import {getArticleById} from "../intagration_utils";
import {setArticle} from "../store/Actions";

class ArticleComponent extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.currentArticle) {
            (async () => {
                let articleId = window.location.href.split('/')[4]
                console.log(window.location.href)
                let data = await getArticleById(articleId)
                this.props.setArticle(data)
            })();
        }
    }


    render() {
        const article = this.props.currentArticle
        return <div className="article_info">
            {!this.props.currentArticle && <div>Статья загружается, подождите немного...</div>}
            {this.props.currentArticle &&
                <div>
                    <div className='article_main_info'>
                        <HeaderComponent
                            onClickFunc={() => {}}
                            headerText={article.title}
                        />
                        <TagsComponent tags={article.tags}
                                       onClickFunc={()=>{}}/>
                        <Link to={`/`} className="back">&larr; назад</Link>
                        <div className='article_content'
                             dangerouslySetInnerHTML={{__html: article.content}}/>
                        <Link to={`/`} className="back">&larr; назад</Link>
                    </div>
                    <div className="moreArticles" id="moreArticlesPage">
                        Другие статьи по теме:
                    </div>
                </div>}
        </div>;
    }
}

function mapStateToProps(state) {
    const {currentPage, currentArticle, tags} = state
    return {
        currentPage: currentPage,
        currentArticle: currentArticle,
        tags: tags
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setArticle
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)