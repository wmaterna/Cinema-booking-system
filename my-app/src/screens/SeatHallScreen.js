import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSeatsList} from '../actions/seatsAction';
import { Form, Button, Alert } from 'antd';
import _ from "lodash";

function SeatHallScreen(props) {
    const seatData = useSelector(state => state.seatsList);
    const dispatch = useDispatch();
    const [seats, setSeats] = useState([]);
    const [alert, setAlert] = useState(false);
    const {seatNumber, nextTo} = (props.location.state) || {};


    useEffect(() => {
      dispatch(getSeatsList());
      }, []);

    useEffect(() => {
        if(seatData.loading === false){
          setSeats(proposedSeats(seatData.seats));
        }
    }, [seatData]);

    useEffect(() => {
      if(seats.length !== 0){
        seats.map((seat) => {
          if(document.getElementById(seat.id) !== null){
            document.getElementById(seat.id).setAttribute("checked", true);
          }
        })
        setAlert(false);
      } else {
        setAlert(true);
      }
    }, [seats])


//list of seats that are in the same line, not reserved no corridor between any of them
const proposedSeats = (dataArray) => {
  var seatsList = []
  var counter = 0;
  var currentRow = dataArray[0].cords.x;
  var currentColumn = dataArray[0].cords.y;
  if(nextTo){
    for (var j=0; j<dataArray.length; j++) {
      if(counter < seatNumber){
        if(!dataArray[j].reserved){
          if(dataArray[j].cords.x === currentRow && 
            (dataArray[j].cords.y === currentColumn || dataArray[j].cords.y === currentColumn+1)){
            counter++;
            seatsList.push(dataArray[j]);
            currentColumn = seatsList[seatsList.length - 1].cords.y;
            currentRow = dataArray[j].cords.x;
        } else{
          seatsList = []
          counter = 0;
          seatsList.push(dataArray[j]);
          counter++;
          currentColumn = seatsList[seatsList.length - 1].cords.y;
          currentRow = dataArray[j].cords.x;
        }
      }
        else{
          seatsList = []
          counter = 0;
          currentColumn = dataArray[j].cords.y;
          currentRow = dataArray[j].cords.x;
        }
      } else{
        return seatsList;
      }
    }
  }
  else {
   for (var j=0; j<dataArray.length; j++){
    if(dataArray[j].reserved === false && counter<seatNumber){
      seatsList.push(dataArray[j]);
        counter ++;
    }
   }
  }
  if(seatsList.length !== Number(seatNumber)){
      return []
  }
  return seatsList;
 
}
//save checked checkboxes in seats state
const handleCheckbox = (e, item) =>{
  var checkedCheckboxes = seats;
  if(e.target.checked){
    const checkbox = seatData.seats.find(element => element.id === item);
    checkedCheckboxes.push(checkbox);
  } else{
    if(checkedCheckboxes.some(element => element.id === item)){
      const index = checkedCheckboxes.findIndex((element) => {
        return element.id === item;
      });
      if(index > -1){
        checkedCheckboxes.splice(index, 1);
      }
    }
    setSeats(checkedCheckboxes);
  }
}

const handleSubmit = () => {
  localStorage.setItem('selectedSeats', JSON.stringify(seats));
  props.history.push("/summary");
}

//generate net of seats based on grid layout
const seatsGenerator = (prepareData) => {
    const rowsNumber = Math.max.apply(Math, seatData.seats.map(function(e) { return e.cords.y; })) + 1;
    const columnsNumber = Math.max.apply(Math, seatData.seats.map(function(e) { return e.cords.x; })) + 1;
    return(
      <div id="cinema-hall" style={{display: "grid", gridTemplateColumns: `repeat(${rowsNumber}, 40px)`, gridTemplateRows: `repeat(${columnsNumber}, 40px) `, }}>
        {seatData.seats.map((seat) => {
          return(<div style={{gridColumnStart: seat.cords.y + 1, gridColumnEnd: seat.cords.y + 2, gridRowStart: seat.cords.x + 1, gridRowEnd: seat.cords.x + 2 }}>
          {seat.reserved ? <input type="checkbox" id={seat.id} disabled={true} style={{width: "40px", height: "40px"}} /> : 
          <input type="checkbox" id={seat.id} disabled={false} onClick={(e) => handleCheckbox(e, e.target.id)} style={{width: "40px", height: "40px"}} />}
        </div>)
        })
        }
      </div>
    )
}

  return (<div>{
    seatData.loading ? <p>Loading hall data</p> : 
    !_.isEmpty(seatData.seats) ? 
    <div>
    {alert ?  <Alert
      message="Sorry, seats in this configuration are not available"
      type="warning"
      closable
    /> : <div></div>}
    <Form>
      <Form.Item className="hall-seats-contailer">
        {seatsGenerator()}
      </Form.Item>
      <Form.Item className="seats-info">
        <label><input type="checkbox" disabled={true} style={{width: "40px", height: "40px"}}  onChange={(e) => console.log(e.target.type)}/>Zarezerwowany</label>
        <label><input type="checkbox" style={{width: "40px", height: "40px"}} defaultChecked={false} onChange={(e) => console.log(e.target.type)}/>Dostępne</label>
        <label><input type="checkbox" style={{width: "40px", height: "40px"}} defaultChecked onChange={(e) => console.log(e.target.type)}/>Twrój wybór</label>
        <Button className="book-btn" type="submit" onClick={handleSubmit} >Rezerwuj</Button>
      </Form.Item>
    </Form>
    </div> 
    : seatData.error ? <p>{seatData.error}</p> : <p>Sorry, a problem occured while rendering data</p>
  }
  </div>);
};
export default SeatHallScreen;
