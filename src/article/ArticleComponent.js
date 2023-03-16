import React from 'react';
import './ArticleStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HeaderComponent from "../header/HeaderComponent";
import TagsComponent from "../tags/TagsComponent";
import {getTagNames} from "../utils";
import {tags} from "../sources/mocks/mock_sources";
import {Link} from "react-router-dom";

class ArticleComponent extends React.Component {

    render() {
        const article = this.props.currentArticle
        return <div className="article_info">
            <div className='article_main_info'>
                <HeaderComponent
                    onClickFunc={() => {}}
                    headerText={article.title}
                    style={{"font-family":  'PT Sans Narrow', "font-size": "15px"}}
                />
                <TagsComponent tags={getTagNames(tags, article.tags)}/>
                <Link to={`/`} className="back">&larr; назад</Link>
                <div className='article_content'
                     dangerouslySetInnerHTML={{__html: article.content}}/>
            </div>
        </div>;
    }
}

function mapStateToProps(state) {
    const {currentPage, currentArticle} = state
    return {
        currentPage: currentPage,
        currentArticle: currentArticle
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)