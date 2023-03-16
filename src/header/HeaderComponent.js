import React from 'react';
import './HeaderStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getRandomInt, imageData} from "../utils";


class HeaderComponent extends React.Component {
    render() {
       let img = imageData[getRandomInt(1, 10)];
        return <div className="head" onClick={this.props.onClickFunc} style={this.props.style}>
            <div className="logo"><img src={img}/></div>
            <div className="text_container">
                <div className="title">{this.props.headerText}</div>
                {this.props.slogan && <div className="slogan">{this.props.slogan}</div>}
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    const {currentPage} = state
    return {currentPage: currentPage}
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)