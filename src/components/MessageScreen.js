import * as React from 'react';
import { useParams } from "react-router-dom";

export default function MessageScreen(){
    let params = useParams();
    return (
        <div className="MessageScreen" style={{ padding: '70px 0' }}>
        <div style={{ margin: 'auto' , width: '60%', border: '3px solid #33AAFF', padding: '10px'}}>
            <h1>{params.message}</h1>
        </div>
        </div>
    );
}