import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

import {useState} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import db from '../Firebase';

export default function CheckEstimatedDeliveryTimeScreen(){
  let navigate = useNavigate();
  
  const [PID, setPID] = useState(10);
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [securityCode, setSecurityCode] = useState(1234);
  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };

  // database access
  const collectionRef = collection(db,'PackageLocations');
  const queryRef = query(
    collectionRef,
    where('PID', '==', Number(PID)),
    where('SecurityCode', '==', Number(securityCode))
  );
  const handleSubmitButtonClick = async (event) => {
    // handle button click.
    const snapshot = await getDocs(queryRef);
    if (snapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  
    
    let ETA = '';
    snapshot.forEach((doc) => {
      ETA = doc.data().ETA;
    });
    
    navigate('/messageScreen/Estimated Delivery Time: ' + ETA);
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
        <TextField variant='filled' label='PID'
              value={PID}
              onChange={handlePIDChange}/>
        <br></br>
        <br></br>
        <br></br>
        Enter Security Code:
        <br></br>
        <br></br>
        <TextField variant='filled' label='Security Code'
              value={securityCode}
              onChange={handleSecurityCodeChange}/>
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