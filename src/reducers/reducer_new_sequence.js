export default function newSequenceReducer(state=false, action) {
    switch (action.type) {
        case 'NEW_SEQUENCE':
            return true;
    }
    return false
}