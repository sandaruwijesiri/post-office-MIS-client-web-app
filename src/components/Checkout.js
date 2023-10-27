import { CLIENT_ID } from '../Config/Config';
import React, { useState, useEffect } from "react" ;
import {useLocation} from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


import {collection, query, getDocs, serverTimestamp, doc, setDoc, addDoc} from 'firebase/firestore';
import db from '../Firebase';

const Checkout = () => {
    const location = useLocation();

    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);


    const api = "https://api.exchangerate-api.com/v4/latest/USD";
    let ratio=0;
    function getRates() {
        const cur = fetch(`${api}`)
            .then(currency => {
                return currency.json();
            }).then(setRatio);
            
    }
    function setRatio(currency) {
        ratio = currency.rates["USD"]/currency.rates["LKR"];
    }
    getRates();
    

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Money Order",
                    amount: {
                        currency_code: "USD",
                        value: Math.round(location.state.Amount*ratio*1.01),
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {

        const addToDatabase = async (event) => {
            let id = 0;
            const collectionRef = collection(db,'MailServiceItem');
            const queryRef = query(
                collectionRef
            );

            const snapshot = await getDocs(queryRef);
            if (snapshot.empty) {
                //id = 14100000001; 
            }else{
                snapshot.forEach((doc) => {
                    if(doc.id.startsWith("141") && id<=parseInt(doc.id)){
                        id = parseInt(doc.id)+1;
                    }
                });
            }

            if(id===0){
                id = 14100000001; 
            }
            
            await setDoc(doc(db, "MailServiceItem", id.toString()), {
                cost: (location.state.Amount*0.01).toString(),
                transfer_amount: (location.state.Amount).toString(),
                sender_name: location.state.SenderName,
                sender_address: location.state.SenderAddress,
                recipient_name: location.state.RecipientName,
                recipient_address: location.state.RecipientAddress,
                destination_postoffice_id: location.state.RecipientBranch,
                paid: false,
                type: "money order",
                timestamp: serverTimestamp()
            });
        }

        if (success) {
            addToDatabase();
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);            
        }

    },[success]);

    return (

<div style={{position: 'relative', textAlign: 'center', height: '100%', width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #fbfbd4, #f2c848)'}}>
<div style={{marginLeft: '25%'}}>
<PayPalScriptProvider options={{ "client-id": CLIENT_ID}}>
                <div>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </div>
            </PayPalScriptProvider>
</div>
</div>
    );
}

export default Checkout