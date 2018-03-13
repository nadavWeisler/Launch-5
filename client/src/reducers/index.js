import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import launchReducer from './launchReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    launches: launchReducer
});
