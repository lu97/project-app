import React from 'react';
import './TagsStyle.css';
import {bindActionCreators} from "redux";
import {setArticles} from "../store/Actions";
import {connect} from "react-redux";
import {getRandomColor} from "../utils";
import {mock_article_list} from "../sources/mocks/mock_sources";
import {Link} from "react-router-dom";


class TagsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 5};
        this.filterByTag = this.filterByTag.bind(this);
    }

    render() {
        let tagsCount = this.props.tags && this.props.tags.length;
        let partial = this.props.tags && this.props.tags.slice(0, this.state.count)
        let page = window.location.pathname;
        return <div className="tags">
            {page === '/' &&
                <div className="tag" id="all" onClick={() => {
                    this.props.setArticles(mock_article_list)
                }}>Все</div>
            }
            {partial.map((tag) => {
                return <div className="tag"
                            key={tag.id}
                            style={{color: getRandomColor()}}
                            onClick={() => {
                                this.filterByTag(tag.id)
                            }}
                >{"#" + tag.name}</div>
            })}
            {tagsCount > 5 && partial.length < tagsCount &&
                <div className="show_more"
                     key='add'
                     onClick={() => {
                         this.setState(prevState => {
                             return {count: prevState.count + 5}
                         })
                     }}
                >еще...</div>
            }
        </div>
    }

    filterByTag(id) {
        let selected = mock_article_list.filter((article) => (article.tags && article.tags.indexOf(id) !== -1))
        this.props.setArticles(selected);
    }
}

function mapStateToProps(state) {
    const {currentPage, articles} = state
    return {currentPage: currentPage, articles: articles}
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        setArticles
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsComponent)