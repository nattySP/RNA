export default function(state={}, action) {
    if (action.type === 'UPDATE_LAYOUT_JSON') {
        return action.payload
    }
    if (action.type === 'NEW_SEQUENCE') {
        return {}
    }
    return state;
}