import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue } from "../actions/index";
import { bindActionCreators } from "redux";

class SequenceDisplay extends Component {
    renderSequenceResidues() {
        return this.props.currentSequence.map(({idx, residue, hover, color})=>{
            return (
                <td
                    className={`${hover ? 'bg-primary text-white': ''} background-${color}`}
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
        return this.props.currentSequence.map(({idx, dbn, hover})=>{
            return (
                <td
                    className={`${hover ? 'bg-primary text-white': ''}`}
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
        return this.props.currentSequence.map(({idx, hover})=>{
            return (
                <td
                    className={`${hover ? 'bg-primary text-white': ''}`}
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
            <div>
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
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceDisplay);