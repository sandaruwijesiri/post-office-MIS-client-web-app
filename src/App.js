import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  //BrowserRouter,
  Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Button from '@mui/material/Button';

import HomeScreen from './components/HomeScreen';
import TrackMyPackageScreen from './components/TrackMyPackageScreen';
import CheckEstimatedDeliveryTimeScreen from './components/CheckEstimatedDeliveryTimeScreen';
import SendMoneyOrdersScreen from './components/SendMoneyOrdersScreen';
import CalculatePostalRatesScreen from './components/CalculatePostalRatesScreen';
import SendFeedbackScreen from './components/SendFeedbackScreen';
import MessageScreen from './components/MessageScreen';
import CheckoutForm from "./components/Checkout";

/*
https://mui.com/material-ui/getting-started/usage/#responsive-meta-tag

Responsive meta tag

Material UI is a mobile-first component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head> element: 

<meta name="viewport" content="initial-scale=1, width=device-width" />
*/

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <div>
        <div className="container">
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/trackMyPackageScreen" element={<TrackMyPackageScreen />} />
            <Route path="/checkEstimatedDeliveryTimeScreen" element={<CheckEstimatedDeliveryTimeScreen />} />
            <Route path="/sendMoneyOrdersScreen" element={<SendMoneyOrdersScreen />} />
            <Route path="/calculatePostalRatesScreen" element={<CalculatePostalRatesScreen />} />
            <Route path="/sendFeedbackScreen/" element={<SendFeedbackScreen />} />
            <Route path="/messageScreen/:message" element={<MessageScreen />} />
            <Route path="/sendMoneyOrdersScreen/CheckoutForm" element={<CheckoutForm />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;