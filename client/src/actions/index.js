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
        alert('Submit failed, please check that your launch name is uniqe');
    }
};

export const whatsAppClick = (launch) => async dispatch => {
    try {
        console.log("WhastappClick");
        const res = await axios.post('/api/whatsAppClick', launch);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error){
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};

export const smsClick = (launch) => async dispatch => {
    try {
        console.log("smsClick");
        const res = await axios.post('/api/smsClick', launch);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error){
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};

export const outlookClick = (launch) => async dispatch => {
    try {
        console.log("outlookClick");
        const res = await axios.post('/api/outlookClick', launch);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
        window.location.reload();
    }
    catch(error){
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};

export const gmailClick = (launch) => async dispatch => {
    try {
        console.log("gmailClick");
        const res = await axios.post('/api/gmailClick', launch);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error){
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};

export const fetchLaunches = () => async dispatch => {
    const res = await axios.get('/api/launch'); 
    dispatch({type: FETCH_LAUNCHES, payload: res.data});
};

export const fetchCurrentLaunch = (launchId) => async(dispatch) => {
    console.log('FetchLaunch');
    try {  
        setState({launchId: launchId});
        const res = await axios.get('/api/launch/' + launchId);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error) {
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};