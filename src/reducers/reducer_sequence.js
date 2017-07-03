import _ from 'lodash';

const initialStyles = {
    colors: {
        aColor: 'Red',
        tColor: 'Orange',
        cColor: 'Green',
        gColor: 'Blue'
    }
};

function stylesReducer(state=initialStyles, action) {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {colors: action.payload};
    }
    return state;
}

function sequenceReducer(state=[], action, styles) {
    switch (action.type) {
        case 'SEQUENCE_CHANGE':
            return _mapSequenceToModel(action.payload, styles);
        case 'HOVER_RESIDUE':
            return _setHoverValue(state, action.payload);
        case 'CHANGE_COLOR':
            return _applyColor(state, action.payload);
    }
    return state;
}


export default function(state={}, action) {
    let currentStyles = stylesReducer(state.currentStyles, action);
    let currentSequence = sequenceReducer(state.currentSequence, action, currentStyles);
    return {currentStyles: currentStyles, currentSequence: currentSequence}
}

//TODO: beef up the model with current color, cytoscape shit etc.
function _mapSequenceToModel({sequence, dbn}, {colors}){
    if (_.isString(sequence)) sequence = sequence.split('');
    if (_.isString(dbn)) dbn = dbn.split('');
    let colorMap = {
        'A': colors.aColor,
        'T': colors.tColor,
        'G': colors.gColor,
        'C': colors.cColor
    };

    return sequence.map((residue, idx) => {
        return {
            idx,
            residue,
            dbn: dbn[idx],
            hover: false,
            color: colorMap[residue]
        }
    })
}

function _setHoverValue(currentState, {idx, val}){
    return currentState.map((residue, i)=>{
        if (i === idx) {
            residue.hover = val;
        }
        return residue;
    })
}

function _applyColor(currentState, {aColor, tColor, cColor, gColor}) {
    return currentState.map((residue)=>{
        switch (residue.residue){
            case 'A':
                return _.assign({}, residue, {color: aColor});
            case 'T':
                return _.assign({}, residue, {color: tColor});
            case 'G':
                return _.assign({}, residue, {color: gColor});
            case 'C':
                return _.assign({}, residue, {color: cColor});
        }
        return residue;
    })
}

function _parseSequence(sequence, dbn) {


}