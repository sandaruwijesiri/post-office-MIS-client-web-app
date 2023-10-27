import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

import {collection, addDoc} from 'firebase/firestore';
import db from '../Firebase';
import { Feedback } from '@mui/icons-material';

export default function SendFeedbackScreen(){
  let navigate = useNavigate();

  const [PID, setPID] = useState("");
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [Name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [Email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [RatingGiven, setRatingGiven] = useState(5);
  const handleRatingGivenChange = (event) => {
    setRatingGiven(event.target.value);
  };
  const [feedback, setFeedback] = useState('');
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitButtonClick = async (event) => {
      // database access
      const collectionRef = collection(db,'Feedback');
      if(PID==="" || Feedback==="" || Name==="" || Email===""){
        navigate('/messageScreen/Name, email, PID and feedback cannot be empty!');
      }else {
        const docRef = await addDoc(collectionRef, {
          PID: parseInt(PID),
          Feedback: feedback,
          Name: Name,
          Email: Email,
          Rating: RatingGiven.toString()
        });
        navigate('/messageScreen/Success!');
      }
    };


  return (
    <div className="SendFeedbackScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
        <h1>Send Feedback</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div>
          Enter Name:
          <br></br>
          <br></br>
          <TextField variant='filled' label='Name'
              value={Name}
              onChange={handleNameChange}/>
          <br/>
          <br/>
          </div>
          
          <div>
          Enter Email:
          <br></br>
          <br></br>
          <TextField variant='filled' label='Email'
              value={Email}
              onChange={handleEmailChange}/>
          <br/>
          <br/>
          </div>
          <div>
          Enter PID:
          <br></br>
          <br></br>
          <TextField variant='filled' label='PID' type='number'
              value={PID}
              onChange={handlePIDChange}/>
          </div>

          <div>
          Rating:
          <br></br>
          <br></br>
          <div style={{background:"#3f3430", width:"205px", height:"60px"}}>  
          <center>
            <Rating
              style={{padding:"18px"}}
              name="simple-controlled"
              value={RatingGiven}
              onChange={handleRatingGivenChange}
            />
            </center>
          </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        Enter Feedback:
        <br></br>
        <br></br>
        <TextField variant='filled' multiline fullWidth minRows={5} maxRows={5} label='Feedback' 
        value={feedback}
        onChange={handleFeedbackChange}/>
        <br></br>
        <br></br>
        <br></br>
        <Box textAlign='center'>
          <Button style={{background: '#952318'}} variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
        </Box>
      </div>
    </div>
  );
}