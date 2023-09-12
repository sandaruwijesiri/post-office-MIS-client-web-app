import * as React from 'react';
import { useParams } from "react-router-dom";

export default function MessageScreen(){
    let params = useParams();
    return (
        <div className="MessageScreen" style={{ background: 'linear-gradient(135deg, #fbfbd4, #f2c848)', height: '100vh', width: '100vw',
        display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: 'auto' , width: '60%', border: '3px solid #945a4e', padding: '10px'}}>
            <h1>{params.message}</h1>
        </div>
        </div>
    );
}