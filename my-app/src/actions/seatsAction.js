import Axios from 'axios';
import {SEATS_LIST_REQUEST, SEATS_LIST_SUCCESS, SEATS_LIST_FAIL} from '../constants/seatsConsts'


const getSeatsList = () => async (dispatch) => {
    try {
        dispatch({type: SEATS_LIST_REQUEST})
        const res = await Axios.get('http://localhost:3000/seats');
        dispatch({ type: SEATS_LIST_SUCCESS, payload: res.data});

    } catch(error){
        dispatch({type: SEATS_LIST_FAIL, payload: error.message});
    }
};

export {getSeatsList}