
const SEQUENCE_CHANGE = 'SEQUENCE_CHANGE';
const HOVER_RESIDUE = 'HOVER_RESIDUE';
const CHANGE_COLOR = 'CHANGE_COLOR';
const UPDATE_LAYOUT_JSON = 'UPDATE_LAYOUT_JSON';

export function submitSequence(props) {
    return {
        type: SEQUENCE_CHANGE,
        payload: {
            sequence: props.sequence,
            dbn: props.dbn
        }
    }
}

export function hoverResidue(props) {
    return {
        type: HOVER_RESIDUE,
        payload: props
    }
}

export function updateColor(props) {
    return {
        type: CHANGE_COLOR,
        payload: props
    }
}

export function updateLayoutJson(props) {
    return {
        type: UPDATE_LAYOUT_JSON,
        payload: props
    }
}