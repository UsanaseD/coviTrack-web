import { combineReducers } from 'redux';
import countryReducer from './countryReducer';


const reducers = combineReducers({
	countryReducer,
});

export default reducers;
