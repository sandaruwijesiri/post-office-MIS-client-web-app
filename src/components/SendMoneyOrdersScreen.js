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
    <div className="SendMoneyOrdersScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
      <h1>Send Money Order</h1>
      <br></br>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>

        <div>
        Enter Sender Name:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Sender Name'/>
        </div>

        <div>
        Enter Sender Address:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Sender Address'/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Name:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Name'/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Address:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Address'/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Branch:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Branch'/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Amount In LKR:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Amount'/>
        </div>

      </div>
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