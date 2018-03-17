import { FETCH_CURRENT_LAUNC } from "../actions/types";

export default function(state = null, action){
    switch(action.type){
        case FETCH_CURRENT_LAUNC:
            return action.payload || false;

        default:
            return state;
    }
}