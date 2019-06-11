import { combineReducers } from 'redux';
import counter from './counter';
import ui from './ui';

export const reducers = combineReducers({
    counter, ui
});

export default reducers;