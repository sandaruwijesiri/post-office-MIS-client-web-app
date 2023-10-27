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
  
  const [PID, setPID] = useState("");
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [securityCode, setSecurityCode] = useState("");
  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };

  // database access
  const collectionRef = collection(db,'MailServiceItem');
  const queryRef = query(
    collectionRef,
    where('security_number', '==', securityCode)
  );
  const handleSubmitButtonClick = async (event) => {
    // handle button click.
    const snapshot = await getDocs(queryRef);
    if (snapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  

    let found = false;
    let ETA = "";
    let nowDate = new Date();
    let finalDate = new Date();
    snapshot.forEach((doc) => {
      if(!found && doc.id===PID){
        const sttus = doc.data().status;
        let timeTaken = 0;
        if(sttus==="To be Dispatched" || sttus==="Queued" || sttus==="To be Bundled" || sttus==="Bundled" || sttus==="Dispatched"){
          //ETA = "3 days";
          timeTaken = 3;
        }else if(sttus==="To be Delivered" || sttus==="Out for Delivery" || sttus==="To be Assigned" || sttus==="Assigned"){
          //ETA = "1 day";
          timeTaken = 1;
        }else{
          ETA = "Invalid Status";
        }
        let tempDate = new Date();
        tempDate.setDate(nowDate.getDate()+timeTaken);
        if(tempDate.getDay()===0){
          tempDate.setDate(tempDate.getDate()+1);
        }else if(tempDate.getDay()===6){
          tempDate.setDate(tempDate.getDate()+2);
        }
        finalDate = tempDate;
        found=true;
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }

    let differenceInDays = Math.round((finalDate.getTime()-nowDate.getTime())/(1000*3600*24));
    if(ETA===""){
      if(differenceInDays===1){
        ETA = "1 day";
      }else {
        ETA = differenceInDays + " days";
      }
      navigate('/messageScreen/Estimated Delivery Time: ' + ETA);
      return;
    }
    
    navigate('/messageScreen/ ' + ETA);
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
        Enter Security Number:
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