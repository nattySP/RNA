import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SequenceReducer from './reducer_sequence';

const rootReducer = combineReducers({
    form: formReducer,
    sequence: SequenceReducer
});

export default rootReducer;
