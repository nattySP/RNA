import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { submitSequence } from '../actions/index';

class SequenceInput extends Component {
    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        this.props.initializeForm({
            sequence: this.props.sequence,
            dbn: this.props.dbn
        })
    }


    render(){
        const {fields: { sequence, dbn }, handleSubmit } = this.props;
        return (
            <form className="sequence-input">
                <div className="field">
                    <label className="label">SEQUENCE</label>
                    <p className="control">
                        <input type="text" className={`input ${sequence.touched && sequence.invalid ? 'is-danger' : ''}`} {...sequence}/>
                    </p>
                    <p className="help is-danger">
                        {sequence.touched ? sequence.error : ''}
                    </p>
                </div>
                <div className="field">
                    <label className="label">DBN</label>
                    <p className="control">
                        <input type="text" className={`input ${dbn.touched && dbn.invalid ? 'is-danger' : ''}`} {...dbn}/>
                    </p>
                    <p className="help is-danger">
                        {dbn.touched ? dbn.error: ''}
                    </p>
                </div>

                <button onClick={handleSubmit(this.props.submitSequence)} className="button is-primary">RENDER SEQUENCE</button>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.sequence) {
        errors.sequence = 'Enter a sequence'
    }

    if (!values.dbn) {
        errors.dbn = 'Enter the dot bracket notation';
        return errors;
    }

    if (values.dbn.length !== values.sequence.length) {
        errors.dbn = 'The length of the dot brack notation entered does not match the length of the sequence entered.'
    }

    if (!balancedBrackets(values.dbn)) {
        errors.dbn = 'Brackets are not balanced'
    }

    if (hasInvalidPairing(values.dbn, values.sequence)) {
        errors.dbn = 'Dot Bracket Notation indicates illegal base pairing'
    }

    return errors;
}

function balancedBrackets(input) {
    let stack = [];
    let array = input.split('');

    _.each(array, (char, idx)=>{
      if (char === '(') stack.push(idx);
      else if (char === ')') stack.pop();
    });

    return !stack.length;
}

function hasInvalidPairing(input, sequence) {
    let stack = [];
    let array = input.split('');
    let pairings = {
        'A': 'T',
        'T': 'A',
        'G': 'C',
        'C': 'G'
    };

    let invalidPairing = false;
    _.each(array, (char, idx)=>{
        if (char === '(') stack.push(idx);
        else if (char === ')') {
            let complementIdx = stack.pop();
            let currentBase = sequence[idx];
            let complementBase = sequence[complementIdx];
            if (pairings.hasOwnProperty(currentBase) && pairings[currentBase] !== complementBase) {
                invalidPairing = true
            }
        }
    });

    return invalidPairing;
}

export default reduxForm({
    form: 'SequenceInputForm',
    fields: ['sequence', 'dbn'],
    validate
}, state => ({
    sequence: _.map(state.sequence.currentSequence, ({residue}) =>{
        return residue;
    }).join(''),
    dbn: _.map(state.sequence.currentSequence, ({dbn}) =>{
        return dbn;
    }).join('')
}), { submitSequence })(SequenceInput);