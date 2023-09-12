import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function SendMoneyOrdersScreen(){
  let navigate = useNavigate();
  
  const handleSubmitButtonClick = (event) => {
    // Do.
    navigate("/sendMoneyOrdersScreen/CheckoutForm");
  };
  return (
    <div className="SendMoneyOrdersScreen" style={{ padding: '70px 0' }}>
    <div style={{ margin: 'auto' , width: '60%', border: '3px solid #33AAFF', padding: '10px'}}>
      <h1>Send Money Order</h1>
      <br></br>
      Enter Sender Name:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Sender Name'/>
      <br></br>
      <br></br>
      <br></br>
      Enter Sender Address:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Sender Address'/>
      <br></br>
      <br></br>
      <br></br>
      Enter Recipient Name:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Recipient Name'/>
      <br></br>
      <br></br>
      <br></br>
      Enter Recipient Address:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Recipient Address'/>
      <br></br>
      <br></br>
      <br></br>
      Enter Recipient Branch:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Recipient Branch'/>
      <br></br>
      <br></br>
      <br></br>
      Enter Amount In Sri Lankan Rupees:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Amount'/>
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