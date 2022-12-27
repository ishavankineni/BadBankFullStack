import { React } from 'react';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from "../Images/bank.png";


function Home(){
    return (
      <Card style={{ width: '28%' , marginLeft: '10px'}}>
      <Card.Title> <center><h4>WELCOME TO THE BANK</h4></center></Card.Title>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>Bad Bank</Card.Title>
        <Card.Text>
          Welcome to the Bad Bank! We are not secure , but you may deposit or withdraw all the money you want!
        </Card.Text>
      </Card.Body>
    </Card>   
    );  
  }
export default Home;