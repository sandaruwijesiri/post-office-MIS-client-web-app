import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./CSS/TrackPackageMapStyling.css";

import {useState} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import db from '../Firebase';


export default function TrackMyPackageScreen(){

  const [PID, setPID] = useState(10);
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [securityCode, setSecurityCode] = useState(1234);
  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };
  const [lat, setLat] = useState(6.79581);
  const [long, setLong] = useState(79.90155);

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
      console.log('No matching documents.');
      return;
    }  
    
    snapshot.forEach((doc) => {
      setLat(doc.data().lat);
      setLong(doc.data().long);
    });
  };
  //

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAuYYZazxHt-Kl5vWNfLnfffVrYGDBdgeo",
  });

  return (
    <html>
      <head>
      <title>Track Package</title></head>
      <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>

        <div style={{width: '20%', background: '#fbfbd4'}}>
          <div style={{position: 'relative', textAlign: 'center', height: '20%', background: '#952318'}}>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <p style={{color: 'white', fontSize: '2em', fontWeight: 'bold'}}>
              Track 
              <br></br>
              Package
              </p>
            </div>
          </div>

          <div>
            <br></br>
            <br></br>
            <br></br>
            
            <Box textAlign='center'>
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
                <Button style={{background: '#952318'}} variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
            </Box>
          </div>
        </div>

        <div style={{width: '80%'}}>

          <div style={{position: 'relative', textAlign: 'center', height: '10%', background: '#fbfbd4'}}>
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <p style={{color: '#952318', fontSize: '2em', fontWeight: 'bold'}}>
                Out For Delivery
                </p>
              </div>
          </div>

          <div className='map-container-parent'>
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName='map-container'
                  center={{ lat: lat, lng: long }}
                  zoom={19}
                  >
                    
                  <Marker position={{ lat: lat, lng: long }} />
                  </GoogleMap>
              )}
          </div>
        </div>
      </div>
    </html>
  );
     // marker position
}