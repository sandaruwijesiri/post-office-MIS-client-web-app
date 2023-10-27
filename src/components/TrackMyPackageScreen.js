import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./CSS/TrackPackageMapStyling.css";
import { useNavigate } from "react-router-dom";

import {useState} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { getDatabase, ref, onValue, set } from "firebase/database";
import db from '../Firebase';


export default function TrackMyPackageScreen(){
  let navigate = useNavigate();

  const [PID, setPID] = useState("");
  const handlePIDChange = (event) => {
    setPID(event.target.value);
  };
  const [securityCode, setSecurityCode] = useState("");
  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };
  const [status, setStatus] = useState("");
  const [lat, setLat] = useState(6.79581);
  const [long, setLong] = useState(79.90155);

  // database access
  const collectionRef = collection(db,'MailServiceItem');
  const queryRef = query(
    collectionRef,
    where('security_number', '==', securityCode)
  );

  const employeesRef = collection(db,'employees');
  const employeesQueryRef = query(
    employeesRef
  );

  const postOfficeRef = collection(db,'Postoffice');
  const postOfficeQueryRef = query(
    postOfficeRef
  );

  const addressRef = collection(db,'Address');
  const addressQueryRef = query(
    addressRef
  );

  const regionRef = collection(db,'Region');
  const regionQueryRef = query(
    regionRef
  );




  const handleSubmitButtonClick = async (event) => {
    // handle button click.
    const snapshot = await getDocs(queryRef);
    if (snapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  
    
    let found = false;
    snapshot.forEach((doc) => {
      if(!found && doc.id===PID){
        const sttus = doc.data().status;
        if(sttus==="To be Dispatched" || sttus==="Queued" || sttus==="To be Bundled" || sttus==="Bundled" || sttus==="Dispatched"){
          setStatus("At Sender's Branch");
        }else if(sttus==="To be Delivered" || sttus==="Out for Delivery" || sttus==="To be Assigned" || sttus==="Assigned"){
          setStatus("At Recipient's Branch");
        }else{
          setStatus("Unknown");
        }

        // Do
        if(sttus==="To be Dispatched" || sttus==="Queued" || sttus==="To be Bundled" || sttus==="Bundled" || sttus==="Dispatched" || sttus==="Assigned"){
          const acceptedReceptionist = doc.data().accepted_receptionist;
          getReceptionistPostOffice({acceptedReceptionist});
        }else if(sttus==="To be Delivered" || sttus==="To be Assigned"){
          const receiverAddressId = doc.data().receiver_address_id;
          getAddress({receiverAddressId});
        }else if(sttus==="Out for Delivery"){
          const assignedPostmanId = doc.data().assigned_postman;
          getPostmanRealtimeLocation({assignedPostmanId});
        }
        //

        found=true;
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }
  };

  const getReceptionistPostOffice = async ({acceptedReceptionist}) => {
    const employeesSnapshot = await getDocs(employeesQueryRef);
    if (employeesSnapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  

    let found = false;
    employeesSnapshot.forEach((doc) => {
      if(!found && doc.id===acceptedReceptionist){
        found=true;
        const postOffice  = doc.data().postoffice;
        getPostOffice({postOffice});
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }
  }

  const getPostOffice = async ({postOffice}) => {
    const postOfficeSnapshot = await getDocs(postOfficeQueryRef);
    if (postOfficeSnapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  

    let found = false;
    postOfficeSnapshot.forEach((doc) => {
      if(!found && doc.id===postOffice){
        found=true;
        setLat(Number(doc.data().Location[0]));
        setLong(Number(doc.data().Location[1]));
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }
  }

  const getAddress = async ({receiverAddressId}) => {
    
    const addressSnapshot = await getDocs(addressQueryRef);
    if (addressSnapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  

    let found = false;
    addressSnapshot.forEach((doc) => {
      if(!found && doc.id===receiverAddressId){
        found=true;
        const regionId = doc.data().RegionID;
        getRegion({regionId});
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }
  }

  const getRegion = async ({regionId}) => {
    
    const regionSnapshot = await getDocs(regionQueryRef);
    if (regionSnapshot.empty) {
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }  

    let found = false;
    regionSnapshot.forEach((doc) => {
      if(!found && doc.id===regionId){
        found=true;
        const postOffice = doc.data().postoffice_id;
        getPostOffice({postOffice});
      }
    });

    if(!found){
      navigate('/messageScreen/Invalid PID or Security Code');
      return;
    }
  }

  const getPostmanRealtimeLocation = async ({assignedPostmanId}) => {
    
    const db = getDatabase();
    const userLocationRef = ref(db, 'userLocation/' + assignedPostmanId);
    onValue(userLocationRef, (snapshot) => {
      const data = snapshot.val();
      setLat(Number(data.lat));
      setLong(Number(data.long));
    });
  }


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
              <TextField variant='filled' label='PID' type='number'
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
                <Button style={{background: '#952318'}} variant="contained" onClick={handleSubmitButtonClick} >Submit</Button>
            </Box>
          </div>
        </div>

        <div style={{width: '80%'}}>

          <div style={{position: 'relative', textAlign: 'center', height: '10%', background: '#fbfbd4'}}>
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <p style={{color: '#952318', fontSize: '2em', fontWeight: 'bold'}}>
                {status}
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