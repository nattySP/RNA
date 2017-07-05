import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class GetShareable extends Component {
    render() {
        return (
            <div>
                Share This Page
                <div>
                    <a target="_blank" href={`${window.location.origin}${window.location.pathname}?state=${this.getEncodedState()}`}>
                        link
                    </a>
                </div>
            </div>
        )
    }

    getEncodedState() {
        return window.btoa(JSON.stringify(this.props.shareable))
    };
}

function mapStateToProps(state) {
    return {
        shareable: {
            sequence: state.sequence,
            layout: state.layout
        }
    }
}

export default connect(mapStateToProps, null)(GetShareable);