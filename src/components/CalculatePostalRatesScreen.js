import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

export default function CalculatePostalRatesScreen(){
  let navigate = useNavigate();
  
  const handleSubmitButtonClick = (event) => {
    // Find postal rate.
    navigate('/messageScreen/Estimated Postal Rate: 115 LKR');
  };
  return (
    <div className="CalculatePostalRatesScreen" style={{ padding: '70px 0' }}>
    <div style={{ margin: 'auto' , width: '60%', border: '3px solid #33AAFF', padding: '10px'}}>
      <h1>Calculate Postal Rates</h1>
      <br></br>
      Select Post Type:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Type' select>
        <MenuItem value={"normal"}>Normal Post</MenuItem>
        <MenuItem value={"registered"}>Registered Post</MenuItem>
      </TextField>
      <br></br>
      <br></br>
      <br></br>
      Enter Weight In Grams:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Weight In Grams'/>
      <br></br>
      <br></br>
      <br></br>
      <Box textAlign='center'>
        <Button variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
      </Box>
    </div>
  </div>
  );
}