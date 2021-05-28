import { Button } from 'antd';
import React, {useEffect, useState} from 'react';



function SummaryScreen(props) {

  const [myLocalStorageData, setMyLocalStorageData] = useState([])
  useEffect(() => {
    const data = localStorage.getItem('selectedSeats').split(",");
    if(data !== ""){
      setMyLocalStorageData(data);
    }
    }, []);

    const getSeatLocationById = (id) =>{
      if(id.length === 3){
        return [parseInt(id.charAt(1))+1,parseInt(id.charAt(2))+1]
      } if(id.length === 4){
        return [parseInt(id.charAt(1))+1,parseInt(id.charAt(2)+id.charAt(3))+1]
      } if(id.length === 5){
        return [parseInt(id.charAt(1)+id.charAt(2))+1,parseInt(id.charAt(3)+id.charAt(4))+1]
      }
      else{
        return [0,0]
      }
    }

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
        <li key={seat}>- rząd {getSeatLocationById(seat)[0]}, miejsce {getSeatLocationById(seat)[1]} ({seat})</li>
      )})}
      </ul>
      <h3>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji</h3>
      <Button onClick={navigationHandler}>Rozpocznij ponownie rezerwacje</Button>
    </div> 
    
    : <div><h1>Miejsca nie zostaly wybrane</h1></div>}
   </div>
  );
}

export default SummaryScreen;