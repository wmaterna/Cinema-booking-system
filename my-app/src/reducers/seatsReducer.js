import {SEATS_LIST_REQUEST, SEATS_LIST_SUCCESS, SEATS_LIST_FAIL, CONVERT_SEATS, CONVERT_SEATS_SUCCESS, CONVERT_SEATS_REQUEST} from '../constants/seatsConsts'

function seatsListReducer(state =[ { loading: false, seats: []}], action){
    switch(action.type){
        case SEATS_LIST_REQUEST:
            return {...state, loading: true, seats: []};
        case SEATS_LIST_SUCCESS:
            return {...state, loading: false, seats: action.payload};
        case SEATS_LIST_FAIL:
            return {...state, loading: false, error: action.payload };
        // case CONVERT_SEATS:
        //     return {...state, loading: false, seats: action.payload}
        default:
            return state;
    }
}




export {seatsListReducer}