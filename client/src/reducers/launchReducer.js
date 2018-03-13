import {FETCH_LAUNCHES} from '../actions/types';

export default function(state = [], action){
    switch (action.type){
        case FETCH_LAUNCHES:
            return action.payload;
        default:
            return state;
    
    }
}