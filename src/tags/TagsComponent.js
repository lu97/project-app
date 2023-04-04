import React from 'react';
import './TagsStyle.css';
import {bindActionCreators} from "redux";
import {updateArticlesList} from "../store/Actions";
import {connect} from "react-redux";
import {getRandomColor} from "../utils";
import {getArticleByTagId, getArticlesData} from "../integration_utils";

class TagsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.get_color = this.get_color.bind(this);
        this.tag_counstructor = this.tag_counstructor.bind(this);
        this.updateArticles = this.updateArticles.bind(this);
        this.uploadArticles = this.uploadArticles.bind(this);
        this.state = {count: 5};
    }

    uploadArticles() {
        (async () => {
            let data = await getArticlesData(0)
            this.props.updateArticlesList(data)
        })();
    }

    updateArticles(id) {
        (async () => {
            let data = await getArticleByTagId(id)
            this.props.updateArticlesList(data)
        })();
    }

    render() {
        let tagsCount = this.props.tags && this.props.tags.length;
        let count = this.props.count ? this.props.count : this.state.count
        let partial = this.props.tags && this.props.tags.slice(0, count)
        let use_all = this.props.use_all
        let use_more = this.props.use_more
        return <div className="tags" style={this.props.container_style}>
            {use_all &&
                <div className="tag" id="all" onClick={() => {
                    this.uploadArticles()
                }}>Все</div>
            }
            {partial.map((tag, index) => {
                return <div className="tag"
                            key={tag.id}
                            style={this.get_color(index)}
                            onClick={() => {
                                this.updateArticles(tag.id)
                            }}
                >{this.tag_counstructor(tag, index, partial)}</div>
            })}
            {use_more && tagsCount > 5 && partial.length < tagsCount &&
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

    tag_counstructor(tag, index, partial) {
        let grid = this.props.use_grid ? "#" : ""
        let use_comma = this.props.use_comma && index !== partial.length - 1 ? " /" : ""
        return grid + tag.name.toLowerCase() + use_comma
    }

    get_color(index) {
        let range = this.props.tag_color_range
        if (range) {
            if (index % 2 === 0) {
                return {...this.props.tag_style, ...{"color": range[0]}}
            } else {
                return {...this.props.tag_style, ...{"color": range[1]}}
            }
        } else {
            return this.props.use_random_color
                ? {...this.props.tag_style, ...{color: getRandomColor()}}
                : this.props.tag_style
        }
    }
}

function mapStateToProps(state) {
    const {currentPage, articles} = state
    return {currentPage: currentPage, articles: articles}
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        updateArticlesList: updateArticlesList
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsComponent)