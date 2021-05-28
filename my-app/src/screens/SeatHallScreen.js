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

    console.log(seatNumber, nextTo)

    useEffect(() => {
      dispatch(getSeatsList());
      }, []);

    useEffect(() => {
        if(seatData.loading === false){
          setSeats(proposedSeats(seatData.seats));
        }
    }, [seatData]);
    console.log(seats)

    useEffect(() => {
      if(seats.length !== 0){
        seats.map((seat) => {
          if(document.getElementById(seat) !== null){
            document.getElementById(seat).setAttribute("checked", true);
          }
        })
        setAlert(false);
      } else {
        setAlert(true);
      }
    }, [seats])
    
//makes list of seats based on user input
const proposedSeats = (dataArray) => {
  var seatsList = []
  var counter = 0;
  if(nextTo){
    for (var i=0; i<dataArray.length; i++){
      for (var j=0; j<dataArray[i].length; j++){
        if(counter < seatNumber ){
          if(dataArray[i][j] !== 'RESERVED' && dataArray[i][j] !== 'CORRIDOR'){
            seatsList.push(dataArray[i][j]);
            counter++;
          } else{
            counter = 0;
            seatsList = []
          }
        } else {
          return seatsList;
        }
      }
      counter = 0;
      seatsList = []
    }
  } else {
    for (var i=0; i<dataArray.length; i++){
      for (var j=0; j<dataArray[i].length; j++){
        if(counter<seatNumber && dataArray[i][j] !== 'RESERVED' && dataArray[i][j] !== 'CORRIDOR'){
          seatsList.push(dataArray[i][j]);
            counter++;
      }
    }
  }
  return seatsList;
}
return seatsList
}
//save checked checkboxes in seats state
const handleCheckbox = (e, item) =>{
  var checkedCheckboxes = seats;
  if(e.target.checked){
    checkedCheckboxes.push(item);
  } else{
    if(checkedCheckboxes.includes(item)){
      const index = checkedCheckboxes.indexOf(item);
      if(index > -1){
        checkedCheckboxes.splice(index, 1);
      }
    }
    setSeats(checkedCheckboxes);
  }
}
const handleSubmit = () => {
  localStorage.setItem('selectedSeats', seats);
  props.history.push("/summary");
}

//generates net of seats in cinema hall
const seatsGenerator = (prepareData) => {
    return(
      <table id="cinema-hall">
      <thead>
      </thead>
        <tbody>
          {seatData.seats.map((row, index_row) => {
            return(
            <tr key={index_row}>
            {row.map((column, index_column) => {
             return(
              column==='RESERVED' ? <td key={index_column}><input type="checkbox" disabled={true} id={column} value={column} style={{width: "40px", height: "40px"}}/></td> :
              column==='CORRIDOR' ? <td key={index_column} style={{color: "white"}}>cor</td> :
               <td  key={index_column}><input type="checkbox" id={column} value={column} style={{width: "40px", height: "40px"}} onClick={(e)=> handleCheckbox(e, e.target.id)} /></td>) 
            } )}</tr>)
            })}
        </tbody>
      </table>
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
      <Form.Item>
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
