export default function hoverReducer(state=null, action){
    switch (action.type) {
        case 'HOVER_RESIDUE':
            let {val, idx} = action.payload;
            if (val) {
                return idx;
            }
            else return null;
    }
    return state;
}