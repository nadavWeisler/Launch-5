import axios from 'axios';
import {FETCH_USER, FETCH_LAUNCHES, FETCH_CURRENT_LAUNC} from './types';

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
        alert('Submit failed, pleas check that you have at least 1 credit and that your launch name is uniqe');
    }
}

export const whatsappClick = (launch) => async dispatch => {
    const res = await axios.post('/api/whastappClick', launch);
    dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
}

export const fetchLaunches = () => async dispatch => {
    const res = await axios.get('/api/launch'); 
    dispatch({type: FETCH_LAUNCHES, payload: res.data});
}

export const fetchCurrentLaunch = (launchId, history) => async(dispatch) => {
    console.log('FetchLaunch');
    try {  
        const res = await axios.get('/api/launch/' + launchId);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error) {
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
}