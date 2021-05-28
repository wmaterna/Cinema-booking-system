import 'antd/dist/antd.css';
import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';



function WelcomeScreen(props) {
  const [nextToInfo, setNextToInfo] = useState(false);
  const [seatsNumber, setSeatsNumber] = useState(2);



  const handleClick = () => setNextToInfo(!nextToInfo);
  const onFinish = (e) => {
    e.preventDefault()
    props.history.push({pathname:"/hall", state: {seatNumber: seatsNumber, nextTo: nextToInfo}});
  }



  return (<div className="basic-info-form">
    <Form onFinish={onFinish}>
      <Form.Item label="Liczba miejsc" name="seats">
        <Input placeholder="Liczba miejsc" onChange={(e) => setSeatsNumber(e.target.value)}></Input>
      </Form.Item>
      <Form.Item label="Czy miejsca maja być koło siebie?" name="seats">
        <Checkbox onClick={handleClick}></Checkbox>
      </Form.Item>
      <Form.Item>
        <Button  htmlType="submit" onClick={(e) => onFinish(e)}>Wybierz miejsca</Button>
      </Form.Item>
    </Form>
  </div>)
}
  

export default WelcomeScreen;