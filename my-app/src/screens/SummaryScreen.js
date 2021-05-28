import { Button } from 'antd';
import React, {useEffect, useState} from 'react';



function SummaryScreen(props) {
  const [myLocalStorageData, setMyLocalStorageData] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('selectedSeats'));
    if(data !== ""){
      setMyLocalStorageData(data);
    }
    }, []);

    const navigationHandler = () => {
      props.history.push({pathname:"/"});
    }
  return (
   <div className="booking-summary">
   {myLocalStorageData.length != 0 ? <div>
     <h1>Twoje rezerwacja przebiegła pomyślnie!</h1>
     <h3>Wybrałeś miejsca: </h3>
    <ul>
      {myLocalStorageData.map((seat) => {
        return(
        <li key={seat.id}> - {seat.cords.x + 1} rząd, miejsce {seat.cords.y +1} , id({seat.id})</li>
      )})}
      </ul>
      <h3>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji</h3>
    </div> 
    : <div><h1>Miejsca nie zostaly wybrane</h1></div>}
    <Button onClick={navigationHandler}>Rozpocznij ponownie rezerwacje</Button>
   </div>
  );
}

export default SummaryScreen;