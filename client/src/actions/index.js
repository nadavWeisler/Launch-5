import axios from 'axios';

import {FETCH_USER, FETCH_LAUNCHES, FETCH_CURRENT_LAUNC} from './types';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res.data});
};

export const addEmailToLaunch = (email, launchId) => async dispatch =>{
    var res = await axios.post('/api/addEmailToLaunch', {email: email, launchId: launchId});
    dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
};

export const removeEmailToLaunch = (email, launchId) => async dispatch =>{
    var res = await axios.post('/api/removeEmailToLaunch', {email: email, launchId: launchId});
    dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

export const submitLaunch = (values, history) => async dispatch => {
    try {
        const res = await axios.post('/api/launch', values);
        history.push('/');
        dispatch({type: FETCH_USER, payload: res.data});
        alert('שיגור נוצר בהצלחה');
    }
    catch(error){
        alert('יצירת שיגור נכשלה, בדוק אם שיגור בשם זהה קיים');
    }
};

export const editLaunch = (values) => async dispatch => {
    await axios.post('/api/editLaunch', values);
};

export const removeLaunchAndGetOthers = (launch) => async dispatch =>{
    const res = await axios.post('/api/deleteLaunchAndGetOther', launch);
    dispatch({type: FETCH_LAUNCHES, payload: res.data});
};

export const whatsAppClick = (launch) => async dispatch => {
    try {
        console.log(launch);
        await axios.post('/api/whatsAppClick', launch);
    }
    catch(error){
        console.log("ERROR: " + error);
    }
};

export const smsClick = (launch) => async dispatch => {
    try {
        await axios.post('/api/smsClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const outlookClick = (launch) => async dispatch => {
    try {
        await axios.post('/api/outlookClick', launch);
    }
    catch(error){
        console.log(error);
    }
};

export const gmailClick = (launch) => async dispatch => {
    try {
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
    try {  
        if(launchId){
            const res = await axios.get('/api/launch/' + launchId);
            dispatch({type: FETCH_CURRENT_LAUNC, payload: res.data});
        }
    }
    catch(error) {
        console.log(error);
        dispatch({type: FETCH_CURRENT_LAUNC, payload: null});
    }
};