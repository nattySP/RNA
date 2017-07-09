import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SequenceReducer from './reducer_sequence';
import LayoutReducer from './reducer_layout';
import HoverReducer from './reducer_hover';
import NewSequenceReducer from './reducer_new_sequence';

const rootReducer = combineReducers({
    form: formReducer,
    hover: HoverReducer,
    sequence: SequenceReducer,
    layout: LayoutReducer,
    isNewSequence: NewSequenceReducer
});

export default rootReducer;
