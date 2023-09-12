import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function HomeScreen(){
  let navigate = useNavigate();
  return (
    <>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>
    <div className="HomeScreen" style={{ padding: '70px 0' , backgroundColor: '#772266'}}>
      <div style={{ margin: 'auto' , width: '60%', border: '3px solid #33AAFF', padding: '10px'}}>
        <ul style={{ listStyle: 'none', lineHeight: '580%' }}>
          <li>
            <Box textAlign='center'>
              <Button variant="contained" onClick={() => { navigate('/trackMyPackageScreen'); }} >Track My Package</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button variant="contained" onClick={() => { navigate('/checkEstimatedDeliveryTimeScreen'); }} >Check Estimated Delivery Time</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button variant="contained" onClick={() => { navigate('/sendMoneyOrdersScreen'); }} >Send Money Orders</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button variant="contained" onClick={() => { navigate('/calculatePostalRatesScreen'); }} >Calculate Postal Rates</Button>
            </Box>
          </li>
          <li>
            <Box textAlign='center'>
              <Button variant="contained" onClick={() => { navigate('/sendFeedbackScreen'); }} >Send Feedback</Button>
            </Box>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}