import axios from 'axios';
import Alert from '../components/Alertes'

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
        alert('Launch has created');
    }
    catch(error){
        alert('Submit failed, please check that your launch name is uniqe');
    }
};

export const whatsAppClick = (launch) => async dispatch => {
    try {
        console.log("WhastappClick");
        await axios.post('/api/whatsAppClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const smsClick = (launch) => async dispatch => {
    try {
        console.log("smsClick");
        await axios.post('/api/smsClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const outlookClick = (launch) => async dispatch => {
    try {
        console.log("outlookClick");
        await axios.post('/api/outlookClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const gmailClick = (launch) => async dispatch => {
    try {
        console.log("gmailClick");
        await axios.post('/api/gmailClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const fetchLaunches = () => async dispatch => {
    const res = await axios.get('/api/launch'); 
    dispatch({type: FETCH_LAUNCHES, payload: res.data});
};

export const fetchCurrentLaunch = (launchId) => async(dispatch) => {
    console.log('FetchLaunch');
    try {  
        const res = await axios.get('/api/launch/' + launchId);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
    }
    catch(error) {
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};