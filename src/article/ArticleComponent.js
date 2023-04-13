import React from 'react';
import './ArticleStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {Link} from "react-router-dom";
import {getArticleById, getMoreArticles} from "../integration_utils";
import {addMoreArticles, setArticle} from "../store/Actions";
import {fruitsImageData, getRandomInt, imageData, isNotEmpty} from "../utils";

class ArticleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentArticle
            && this.props.currentArticle
            && prevProps.currentArticle.id !== this.props.currentArticle.id) {
            window.location.reload()
        }
    }


    componentDidMount() {
        (async () => {
            window.scrollTo(0, 0)
            if (!this.props.currentArticle) {
                let articleId = window.location.href.split('/')[4]
                console.log(window.location.href)
                let data = await getArticleById(articleId)
                this.props.setArticle(data)
            }
            if (this.props.currentArticle && this.props.currentArticle.moreArticles === undefined) {
                let tags = this.props.currentArticle.tags.map((tag) => (tag.id))
                let more_articles = await getMoreArticles(this.props.currentArticle.id, tags)
                this.props.addMoreArticles(more_articles)
            }

            this.setState({
                ...this.state,
                article: this.props.currentArticle
            })
        })();
    }

    render() {
        return <div className="article_info">
            {this.state.article &&
                <div>
                    <div className='article_main_info'>
                       <Link to="/">
                           <HeaderComponent
                               onClickFunc={() => {}}
                               headerText={"My beauty online"}
                               slogan={'Все, что тебе нужно'}
                           />
                       </Link>
                        <div className="article_title">{this.state.article.title}</div>
                        <TagsComponent tags={this.state.article.tags}
                                       use_random_color={true}
                                       container_style={{width: "100%"}}
                                       use_grid={true}/>
                        <Link to={`/`} className="back">&larr; назад</Link>
                        <div className='article_content'
                             dangerouslySetInnerHTML={{__html: this.state.article.content}}/>
                        <Link to={`/`} className="back" id="bottom_back">&larr; назад</Link>
                    </div>
                    {isNotEmpty(this.state.article.moreArticles) &&
                        <div className="more_articles_part">
                            <div className="more_articles">Другие статьи по теме:</div>
                            {this.state.article.moreArticles.map((article, index) => {
                                return <Link to={`/page/${article.id}`}
                                             key={index}
                                             style={{backgroundColor: index % 2 === 0 ? "#f2faf9": "#f6fcf5"}}
                                             className="more_articles_title"
                                             onClick={() => {
                                                 this.props.setArticle(article)
                                             }}>
                                    <div><img
                                        src={fruitsImageData[getRandomInt(0, 8)]}
                                        width={30}
                                        height={30}
                                        style={{marginRight: "4px"}}/>
                                    </div>
                                    <div>{article.title}</div>
                                </Link>
                            })}
                        </div>
                    }
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