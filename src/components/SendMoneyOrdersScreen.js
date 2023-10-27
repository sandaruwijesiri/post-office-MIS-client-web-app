import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SendMoneyOrdersScreen(){
  let navigate = useNavigate();
  
  const [SenderName, setSenderName] = useState("");
  const [SenderAddress, setSenderAddress] = useState("");
  const [RecipientName, setRecipientName] = useState("");
  const [RecipientAddress, setRecipientAddress] = useState("");
  const [RecipientBranch, setRecipientBranch] = useState("po-10");
  const [Amount, setAmount] = useState(0);
  

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };
  
  const handleSenderAddressChange = (event) => {
    setSenderAddress(event.target.value);
  };
  
  const handleRecipientNameChange = (event) => {
    setRecipientName(event.target.value);
  };
  
  const handleRecipientAddressChange = (event) => {
    setRecipientAddress(event.target.value);
  };
  
  const handleRecipientBranchChange = (event) => {
    setRecipientBranch(event.target.value);
  };
  
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmitButtonClick = (event) => {
    
    if(SenderName==="" || SenderAddress==="" || RecipientName==="" || RecipientAddress==="" || Amount<1000){
      navigate("/messageScreen/Sender Name, Sender Address, Recipient Name, Recipient Address Cannot Be Empty and Amount Cannot Be Less than 1000.");
      return;
    }
    navigate("/sendMoneyOrdersScreen/CheckoutForm",{state:{SenderName:SenderName,SenderAddress:SenderAddress,RecipientName:RecipientName,RecipientAddress:RecipientAddress,
                                                    RecipientBranch:RecipientBranch,Amount:parseInt(Amount)}});
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
        <TextField variant='filled' label='Sender Name'
        value={SenderName}
        onChange={handleSenderNameChange}/>
        </div>

        <div>
        Enter Sender Address:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Sender Address'
        value={SenderAddress}
        onChange={handleSenderAddressChange}/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Name:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Name'
        value={RecipientName}
        onChange={handleRecipientNameChange}/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Address:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Address'
        value={RecipientAddress}
        onChange={handleRecipientAddressChange}/>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Recipient Branch:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Recipient Branch' select
        value={RecipientBranch}
        onChange={handleRecipientBranchChange}>
          
          <MenuItem value={"po-10"}>Colombo</MenuItem>
          <MenuItem value={"po-3"}>Galle</MenuItem>
          <MenuItem value={"po-4"}>Matara</MenuItem>
        </TextField>
        </div>

        <div>
        <br></br>
        <br></br>
        Enter Amount In LKR:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Amount' type='number'
        value={Amount}
        onChange={handleAmountChange}/>
        </div>

      </div>
      <br></br>
      <br></br>
      <br></br>
      <Box textAlign='center'>
        <Button style={{background: '#952318'}} variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
      </Box>
      <br/>
      <p style={{fontSize:'0.8em'}}>*You will be charged 1% of the amount as transaction fees.</p>
    </div>
  </div>
  );
}