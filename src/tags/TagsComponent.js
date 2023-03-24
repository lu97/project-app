import React from 'react';
import './TagsStyle.css';
import {bindActionCreators} from "redux";
import {setArticles} from "../store/Actions";
import {connect} from "react-redux";
import {getRandomColor} from "../utils";

class TagsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 5};
    }

    render() {
        let tagsCount = this.props.tags && this.props.tags.length;
        let partial = this.props.tags && this.props.tags.slice(0, this.state.count)
        let use_all = this.props.use_all
        let use_more = this.props.use_more
        return <div className="tags" style={this.props.container_style}>
            {use_all &&
                <div className="tag" id="all" onClick={() => {
                    this.props.setArticles([])
                }}>Все</div>
            }
            {partial.map((tag) => {
                return <div className="tag"
                            key={tag.id}
                            style={{...this.props.tag_style, ...{color: getRandomColor()}}}
                            onClick={this.props.onClickFunc()}
                >{"#" + tag.name.toLowerCase()}</div>
            })}
            {this.props.use_more && tagsCount > 5 && partial.length < tagsCount &&
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