const NEW_SEQUENCE = 'NEW_SEQUENCE';
const HOVER_RESIDUE = 'HOVER_RESIDUE';
const CHANGE_COLOR = 'CHANGE_COLOR';
const CHANGE_FONT = 'CHANGE_FONT';
const CHANGE_SIZE = 'CHANGE_SIZE';
const UPDATE_LAYOUT_JSON = 'UPDATE_LAYOUT_JSON';
const NEW_BOND = 'NEW_BOND';

export function submitSequence(props) {
    return {
        type: NEW_SEQUENCE,
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
    let {aColor, cColor, tColor, gColor, nColor} = props;
    return {
        type: CHANGE_COLOR,
        payload: {
            aColor,
            cColor,
            tColor,
            gColor,
            nColor
        }
    }
}

export function updateFont(props) {
    return {
        type: CHANGE_FONT,
        payload: props.font
    }
}

export function updateResidueSize(props) {
    let {residueSize, edgeWidth} = props;
    return  {
        type: CHANGE_SIZE,
        payload: {
            residueSize: parseInt(residueSize, 10),
            edgeWidth: parseInt(edgeWidth, 10)
        }
    }
}

export function updateLayoutJson(props) {
    return {
        type: UPDATE_LAYOUT_JSON,
        payload: props
    }
}

export function newBond(props) {
    return {
        type: NEW_BOND,
        payload: props
    }
}