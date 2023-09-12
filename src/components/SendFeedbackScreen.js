import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function SendFeedbackScreen(){
  let navigate = useNavigate();

  const [feedback, setFeedback] = useState('');
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };


  return (
    <div className="SendFeedbackScreen" style={{ padding: '70px 0' }}>
      <div style={{ margin: 'auto' , width: '60%', border: '3px solid #33AAFF', padding: '10px'}}>
        <h1>Send Feedback</h1>
        <br></br>
        Enter PID:
        <br></br>
        <br></br>
        <TextField variant='filled' label='PID'/>
        <br></br>
        <br></br>
        <br></br>
        Enter Security Code:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Security Code'/>
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
          <Button variant="contained" onClick={() => { navigate('/messageScreen/Success!' + ' ' + feedback); }} >Submit</Button>
        </Box>
      </div>
    </div>
  );
}