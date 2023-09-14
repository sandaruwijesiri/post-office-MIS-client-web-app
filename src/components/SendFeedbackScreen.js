import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

import {collection, addDoc} from 'firebase/firestore';
import db from '../Firebase';

export default function SendFeedbackScreen(){
  let navigate = useNavigate();

  const [PID, setPID] = useState(1);
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [securityCode, setSecurityCode] = useState(1000);
  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };
  const [feedback, setFeedback] = useState('');
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitButtonClick = async (event) => {
      // database access
      const collectionRef = collection(db,'Feedback');
      const docRef = await addDoc(collectionRef, {
        PID: Number(PID),
        SecurityCode: Number(securityCode),
        Feedback: feedback
      });
      navigate('/messageScreen/Success!');
    };


  return (
    <div className="SendFeedbackScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
        <h1>Send Feedback</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div>
          Enter PID:
          <br></br>
          <br></br>
          <TextField variant='filled' label='PID'
              value={PID}
              onChange={handlePIDChange}/>
          </div>
          
          <div>
          Enter Security Code:
          <br></br>
          <br></br>
          <TextField variant='filled' label='Security Code'
              value={securityCode}
              onChange={handleSecurityCodeChange}/>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        Enter Feedback:
        <br></br>
        <br></br>
        <TextField variant='filled' multiline fullWidth minRows={10} maxRows={10} label='Feedback' 
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