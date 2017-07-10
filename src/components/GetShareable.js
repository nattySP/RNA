import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Clipboard from 'clipboard';
new Clipboard('.button');

class GetShareable extends Component {
    render() {
        let url = `${window.location.origin}${window.location.pathname}?state=${this.getEncodedState()}`;
        return (
            <div className="box">
                <h3>
                    SHARE THIS VIEW
                </h3>
                <div className="field">
                    <button className="button">
                        <a target="_blank" href={url}>
                            OPEN VIEW IN NEW TAB
                        </a>
                    </button>
                </div>
                <div>
                    <button className="button is-primary" data-clipboard-text={url}>
                        COPY LINK TO CLIPBOARD
                    </button>
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