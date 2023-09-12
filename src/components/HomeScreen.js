import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import "./CSS/HomeScreenStyling.css";

// git push PostOfficeMIS-ClientWebApp

export default function HomeScreen(){
  let navigate = useNavigate();
  return (
    <>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>
    <div className="HomeScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
       display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ margin: 'auto' , width: '60%', padding: '10px'}}>
        <ul style={{ listStyle: 'none', lineHeight: '580%' }}>
          <li>
            <Box textAlign='center'>
              <Button style={{width: '33%', background: '#952318'}} variant="contained" onClick={() => { navigate('/trackMyPackageScreen'); }} >Track My Package</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button style={{width: '33%', background: '#952318'}} variant="contained" onClick={() => { navigate('/checkEstimatedDeliveryTimeScreen'); }} >Check Estimated Delivery Time</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button style={{width: '33%', background: '#952318'}} variant="contained" onClick={() => { navigate('/sendMoneyOrdersScreen'); }} >Send Money Orders</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button style={{width: '33%', background: '#952318'}} variant="contained" onClick={() => { navigate('/calculatePostalRatesScreen'); }} >Calculate Postal Rates</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button style={{width: '33%', background: '#952318'}} variant="contained" onClick={() => { navigate('/sendFeedbackScreen'); }} >Send Feedback</Button>
            </Box>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}