import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

import {useState} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import db from '../Firebase';

export default function CalculatePostalRatesScreen(){
  let navigate = useNavigate();

  const [type, setType] = useState('normal');
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const [weight, setWeight] = useState(0);
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  // database access
  const collectionRef = collection(db,'PostalRates');
  const queryRef = query(
    collectionRef,
    where('title', '==', 'rates')
  );

  const handleSubmitButtonClick = async (event) => {
    
    console.log(type + " svba");

    const snapshot = await getDocs(queryRef);
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    
    let cost = 0;
    let weightAboveActual = 50000;
    snapshot.forEach((doc) => {
      let jsonn = null;
      if(type==='normal'){
        jsonn = doc.data().normal;
      }else if(type==='registered'){
        jsonn = doc.data().registered;
      }else if(type==='logi'){
        jsonn = doc.data().logi;
      }else if(type==='courier'){
        jsonn = doc.data().courier;
      }
      for(let key in jsonn){
        let temp = Number(key.substring(2));
        if(temp<weightAboveActual && Number(weight)<=temp){
          weightAboveActual = temp;
          cost = jsonn[key];
        }
      }
    });

    if(weightAboveActual===50000){
      navigate('/messageScreen/Maximum Weight Exceeded.');
      return;
    }

    // Find postal rate.
    navigate('/messageScreen/Estimated Postal Rate: ' + cost + ' LKR');
  };
  //


  return (
    <div className="CalculatePostalRatesScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
      <h1>Calculate Postal Rates</h1>
      <br></br>
      Select Post Type:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Type' select
        value={type}
        onChange={handleTypeChange}>

        <MenuItem value={"normal"}>Normal Post</MenuItem>
        <MenuItem value={"registered"}>Registered Post</MenuItem>
        <MenuItem value={"logi"}>Logi Post</MenuItem>
        <MenuItem value={"courier"}>Fast Track Courier</MenuItem>
      </TextField>
      <br></br>
      <br></br>
      <br></br>
      Enter Weight In Grams:
      <br></br>
      <br></br>
      <TextField variant='filled' label='Weight In Grams' type='number'
        value={weight}
        onChange={handleWeightChange}/>
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