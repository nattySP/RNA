import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue } from "../actions/index";
import { bindActionCreators } from "redux";

class SequenceDisplay extends Component {
    renderSequenceResidues() {
        return this.props.currentSequence.map(({idx, residue, color, font})=>{
            let hover = this.props.hover === idx;
            return (
                <td
                    className={`${hover ? 'hover text-white': ''} background-${color}`}
                    style={{'fontFamily': font}}
                    key={`residue-${idx}`}
                    onMouseEnter={() => this.props.hoverResidue({idx, val: true})}
                    onMouseLeave={() => this.props.hoverResidue({idx, val: false})}
                    >
                    {residue}
                </td>
            )
        })
    }

    renderSequenceDBN() {
        return this.props.currentSequence.map(({idx, dbn})=>{
            let hover = this.props.hover === idx;
            return (
                <td
                    className={`${hover ? 'hover text-white': ''}`}
                    key={`dbn-${idx}`}
                    onMouseEnter={() => this.props.hoverResidue({idx, val: true})}
                    onMouseLeave={() => this.props.hoverResidue({idx, val: false})}
                    >
                    {dbn}
                </td>
            )
        })
    }

    renderIndex() {
        return this.props.currentSequence.map(({idx})=>{
            let hover = this.props.hover === idx;
            return (
                <td
                    className={`${hover ? 'hover text-white': ''}`}
                    key={`idx-${idx}`}
                    onMouseEnter={() => this.props.hoverResidue({idx, val: true})}
                    onMouseLeave={() => this.props.hoverResidue({idx, val: false})}
                    >
                    {idx + 1}
                </td>
            )
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-1">5'</div>
                <div className="col-xs-10">
                    <table className="table">
                        <tbody>
                            <tr>
                                {this.renderIndex()}
                            </tr>
                            <tr>
                                {this.renderSequenceResidues()}
                            </tr>
                            <tr>
                                {this.renderSequenceDBN()}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-1">3'</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence,
        hover: state.hover
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceDisplay);