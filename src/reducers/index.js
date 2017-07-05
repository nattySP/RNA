import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SequenceReducer from './reducer_sequence';
import LayoutReducer from './reducer_layout';

const rootReducer = combineReducers({
    form: formReducer,
    sequence: SequenceReducer,
    layout: LayoutReducer
});

export default rootReducer;
