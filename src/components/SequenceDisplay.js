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
                    className={`${hover ? 'hover': ''} background-${color} sequence-display-residues`}
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
                    className={`${hover ? 'hover': ''} sequence-display-dbn`}
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
                    className={`${hover ? 'hover': ''} sequence-display-idx`}
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
            <div className="display-container">
                <div className="columns">
                    <div className="column is-1">{this.props.currentSequence.length ? "5'" : ''}</div>
                    <div className="column">
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
                    <div className="column is-1">{this.props.currentSequence.length ? "3'" : ''}</div>
                </div>
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