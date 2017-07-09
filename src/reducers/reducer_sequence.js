import _ from 'lodash';
import naview from '../utils/naview/getnaview'

const initialStyles = {
    colors: {
        aColor: 'Red',
        tColor: 'Orange',
        cColor: 'Green',
        gColor: 'Blue',
        nColor: 'Violet'
    },
    size: {
        residueSize: 30,
        edgeWidth: 1
    },
    font: 'Helvetica'
};

function stylesReducer(state=initialStyles, action) {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return _.assign({}, state, {colors: action.payload});
        case 'CHANGE_SIZE':
            return _.assign({}, state, {size: action.payload});
        case 'CHANGE_FONT':
            return _.assign({}, state, {font: action.payload})
    }
    return state;
}

function sequenceReducer(state=[], action, styles) {
    switch (action.type) {
        case 'NEW_SEQUENCE':
            return _getCoords(_mapSequenceToModel(action.payload, styles));
        case 'CHANGE_COLOR':
            return _applyColor(state, action.payload);
        case 'CHANGE_FONT':
            return _applyFont(state, action.payload);
        case 'NEW_BOND':
            return _addNewBond(state, action.payload);
    }
    return state;
}


export default function(state={}, action) {
    let currentStyles = stylesReducer(state.currentStyles, action);
    let currentSequence = sequenceReducer(state.currentSequence, action, currentStyles);
    return {currentStyles: currentStyles, currentSequence: currentSequence}
}

function _mapSequenceToModel({sequence, dbn}, {colors, font}){
    if (_.isString(sequence)) sequence = sequence.split('');
    if (_.isString(dbn)) dbn = dbn.split('');
    let colorMap = {
        'A': colors.aColor,
        'T': colors.tColor,
        'G': colors.gColor,
        'C': colors.cColor,
        'N': colors.nColor
    };

    return sequence.map((residue, idx) => {
        return {
            idx,
            residue,
            dbn: dbn[idx],
            color: colorMap[residue],
            font
        }
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
            case 'N':
                return _.assign({}, residue, {color: cColor});
        }
        return residue;
    })
}
function _applyFont(currentState, font) {
    return currentState.map((residue)=>{
        return _.assign({}, residue, {font});
    })
}

function _getCoords(sequence){
    let stack = [];

    let {nodes, links} = _.reduce(sequence, (mem, memberOfSequence, idx)=>{
        mem.nodes.push({name: memberOfSequence.residue});
        if (sequence[idx - 1]) {
            mem.links.push({source: idx-1, target: idx, type: 'phosphodiester'})
        }
        if (memberOfSequence.dbn === '(') {
            stack.push(idx);
        }
        else if (memberOfSequence.dbn === ')') {
            let source = stack.pop();
            let target = idx;
            mem.links.push({source, target, type: 'hbond'})
        }
        return mem;
    },{nodes: [], links: []});

    let coords = naview(nodes, links);
    let sequenceWithCoords = _.map(sequence, (memberOfSequence, idx)=>{
         return _.assign({}, memberOfSequence, coords[idx])
     });

    _.each(links, ({source, target, type})=>{
        sequenceWithCoords[source].links = sequenceWithCoords[source].links || [];
        sequenceWithCoords[source].links.push({target, type})
    });

    return sequenceWithCoords;
}

function _addNewBond(sequence, {source, target}) {
    return _.map(sequence, (residue, idx)=>{
        if (idx === source) {
            return _.assign({}, residue, {dbn: '('});
        }
        if (idx === target) {
            return _.assign({}, residue, {dbn: ')'});
        }
        return _.assign({}, residue);
    })

}