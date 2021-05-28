import Axios from 'axios';
import {SEATS_LIST_REQUEST, SEATS_LIST_SUCCESS, SEATS_LIST_FAIL, CONVERT_SEATS} from '../constants/seatsConsts'

const validSeat = (id, data) => {
    var valid = false;
    data.map((seat) => {
      if (seat.id === id){
        valid = true;
        return false;
      }
    })
    return valid;
  }

  const isReserved = (id, data) =>{
    var reserved = false;
    data.map((seat) => {
      if (seat.id === id){
        if(seat.reserved){
          return false
        }
        reserved = true;
      }
    })
    return reserved;
  }


const getSeatsList = () => async (dispatch) => {
    try {
        dispatch({type: SEATS_LIST_REQUEST})
        const res = await Axios.get('http://localhost:3000/seats');


        dispatch({ type: SEATS_LIST_SUCCESS, payload: res.data});
        const rowsNumber = Math.max.apply(Math, res.data.map(function(e) { return e.cords.x; }))
        const columnsNumber = Math.max.apply(Math, res.data.map(function(e) { return e.cords.y; }))

        var seatsArray = [[]];
        for(var r=0; r<rowsNumber + 1; r++){
          seatsArray[r] = [];
          for (var c=0; c<columnsNumber + 1; c++){
            if(!isReserved("s" + r + c, res.data) && validSeat("s" + r + c, res.data)){
              seatsArray[r][c] = "RESERVED"
            }
            else if(validSeat("s" + r + c, res.data)){
              seatsArray[r][c] = "s" + r + c;
            }
            else{
              seatsArray[r][c] = "CORRIDOR"
            }
          }
      }
      dispatch({type: CONVERT_SEATS, payload: seatsArray})

    } catch(error){
        dispatch({type: SEATS_LIST_FAIL, payload: error.message});
    }
};



export {getSeatsList}