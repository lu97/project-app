import React from 'react';
import './ArticleStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {Link} from "react-router-dom";
import {getArticleById, getMoreArticles} from "../integration_utils";
import {addMoreArticles, setArticle} from "../store/Actions";

class ArticleComponent extends React.Component {
    componentDidMount() {
        (async () => {
            window.scrollTo(0, 0)
            if (!this.props.currentArticle) {
                let articleId = window.location.href.split('/')[4]
                console.log(window.location.href)
                let data = await getArticleById(articleId)
                this.props.setArticle(data)
            }
            console.log(this.props.currentArticle)
            if (this.props.currentArticle.moreArticles === undefined){
                let tags = this.props.currentArticle.tags.map((tag)=>(tag.id))
                console.log(tags);
                let more_articles = await getMoreArticles(tags)
                this.props.addMoreArticles(this.props.currentArticle.id, more_articles)
            }
        })();
    }

    render() {
        const article = this.props.currentArticle
        return <div className="article_info">
            {!this.props.currentArticle && <div>Статья загружается, подождите немного...</div>}
            {this.props.currentArticle &&
                <div>
                    <div className='article_main_info'>
                        <HeaderComponent
                            onClickFunc={() => {
                                window.location.reload()
                            }}
                            headerText={"My beauty online"}
                            slogan={'Все, что тебе нужно'}
                        />
                        <div className="article_title">{article.title}</div>
                        <TagsComponent tags={article.tags}
                                       use_random_color={true}
                                       container_style={{width: "100%"}}
                                       use_grid={true}/>
                        <Link to={`/`} className="back">&larr; назад</Link>
                        <div className='article_content'
                             dangerouslySetInnerHTML={{__html: article.content}}/>
                        <Link to={`/`} className="back" id="bottom_back">&larr; назад</Link>
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
        setArticle,
        addMoreArticles
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)