import axios from 'axios';
import {FETCH_USER} from './types';
import errors from '../utils/errors';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

export const submitLaunch = (values, history) => async dispatch => {
    try {
        const res = await axios.post('/api/launch', values);
        history.push('/');
        dispatch({type: FETCH_USER, payload: res.data});
    }
    catch(error){
        alert(errors.submitFailed);
    }
}