import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function CheckEstimatedDeliveryTimeScreen(){
  let navigate = useNavigate();
  
  const handleSubmitButtonClick = (event) => {
    // Find estimated delivery time.
    navigate('/messageScreen/Estimated Delivery Time: 3 Days');
  };

    return (
      <div className="CheckEstimatedDeliveryTimeScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
      display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
        <h1>Check Estimated Delivery Time</h1>
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
        <Box textAlign='center'>
          <Button style={{background: '#952318'}} variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
        </Box>
      </div>
    </div>
    );
  }