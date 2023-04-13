import React from 'react';
import './ArticleListStyle.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setArticle, addArticlesToList, setArticlesCount, setTags} from "../store/Actions";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {Link} from "react-router-dom";
import {
    getArticlesCount, getArticlesData,
    getTags
} from "../integration_utils";

class ArticleListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.uploadArticles = this.uploadArticles.bind(this);
        this.uploadCount = this.uploadCount.bind(this);
        this.uploadTags = this.uploadTags.bind(this)
    }

    componentDidMount() {
        if (this.props.articles.length === 0) {
            this.uploadArticles(0)
            this.uploadCount();
            this.uploadTags();
        }
    }

    uploadArticles(start) {
        (async () => {
            let data =await getArticlesData(start)
            this.props.addArticlesToList(data)
        })();
    }

    uploadCount() {
        (async () => {
            let articlesCount = await getArticlesCount()
            this.props.setArticlesCount(articlesCount)
        })();
    }

    uploadTags() {
        (async () => {
            let tags = await getTags()
            this.props.setTags(tags)
        })();
    }

    render() {
        return <div>
            <HeaderComponent
                onClickFunc={() => {
                    window.location.reload()
                }}
                headerText={"My beauty online"}
                slogan={'Все, что тебе нужно'}
            />
            {this.props.tags &&
                <div className="selector">
                    <TagsComponent tags={this.props.tags}
                                   use_all={true}
                                   use_grid={true}
                                   use_more={true}
                                   onClickFunc={()=>{}}
                                   use_random_color={true}/>
                </div>}
            <div className="articles">
                {this.props.articles && this.props.articles.map((article, index) => {
                    return <Link to={`/page/${article.id}`}
                                 className="article"
                                 style={index % 2 == 0 ? {"backgroundColor": "aliceblue"}: {"backgroundColor": "#f5f0ff"}}
                                 key={article.id}
                                 onClick={() => {
                                     this.props.setArticle(article)
                                 }}>
                        <div className="article_title"> {article.title.toUpperCase()}</div>
                        <div className="article_img">
                            {article.preview_image && <img src={`data:image/jpeg;base64,${article.preview_image}`}/>}
                        </div>
                        <div className="article_content_preview"
                             dangerouslySetInnerHTML={{__html: article.preview_content + '...'}}/>
                        <TagsComponent tags={article.tags}
                                       tag_style={{fontSize: "20px", margin: "0 4px"}}
                                       tag_color_range = {["#10164b", "#14380c"]}
                                       container_style={{width: "100%"}}
                                       use_grid={false}
                                       use_comma={true}
                                       onClickFunc={()=>{}}
                                       count={article.tags.length}
                        />
                    </Link>
                }) //.sort(() => .5 - Math.random())
                }
            </div>
            {this.props.articlesCount > this.props.articles.length
                && <div className="moreArticles" onClick={() => {
                    this.uploadArticles(this.props.articles.length)
                }}>Больше статей...</div>}
        </div>
    }
}

function mapStateToProps(state) {
    const {currentPage, articles, articlesCount, tags} = state
    return {
        currentPage: currentPage,
        articles: articles,
        articlesCount: articlesCount,
        tags: tags
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setArticle,
        setArticlesCount,
        addArticlesToList: addArticlesToList,
        setTags
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListComponent)
