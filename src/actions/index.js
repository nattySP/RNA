
const SEQUENCE_CHANGE = 'SEQUENCE_CHANGE';
const HOVER_RESIDUE = 'HOVER_RESIDUE';
const CHANGE_COLOR = 'CHANGE_COLOR';
const GET_SHAREABLE = 'GET_SHAREABLE';

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

export function getShareable(props) {
    return {
        type: GET_SHAREABLE,
        payload: props
    }
}