import React from 'react';
import './ArticleListStyle.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { setArticle} from "../store/Actions";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {tags} from "../sources/mocks/mock_sources";
import {Link} from "react-router-dom";

class ArticleListComponent extends React.Component {
    render() {
        return <div>
            <HeaderComponent
                onClickFunc={() => {
                    window.location.reload()
                }}
                headerText={"Girls power"}
                slogan={'Все, что тебе нужно'}
            />
            <div className="selector">
                <TagsComponent tags={tags}/>
            </div>
            <div className="articles">
                {this.props.articles.map((article) => {
                    return <Link to={`/page/${article.id}`}
                                 className="article" id={article.id}
                                 onClick={() => {this.props.setArticle(article)}}>
                        <div className="article_title"> {article.title}</div>
                        <div className="article_img">
                            <img src={`data:image/jpeg;base64,${article.main_image}`}/>
                        </div>
                        <div className="article_content_preview"
                             dangerouslySetInnerHTML={{__html: article.content.substring(0, 155) + '...'}}/>
                    </Link>
                }).sort(() => .5 - Math.random())
                }
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    const {currentPage, articles} = state
    return {
        currentPage: currentPage,
        articles: articles,
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setArticle
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListComponent)
