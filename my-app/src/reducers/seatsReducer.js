import {SEATS_LIST_REQUEST, SEATS_LIST_SUCCESS, SEATS_LIST_FAIL} from '../constants/seatsConsts'

function seatsListReducer(state =[ { loading: false, seats: []}], action){
    switch(action.type){
        case SEATS_LIST_REQUEST:
            return {...state, loading: true, seats: []};
        case SEATS_LIST_SUCCESS:
            return {...state, loading: false, seats: action.payload};
        case SEATS_LIST_FAIL:
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
}




export {seatsListReducer}