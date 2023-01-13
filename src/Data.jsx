import React, { useState, useEffect } from 'react';
import './App.css';
import {sendPostRequest} from './AJAX.jsx'

async function sendData(month, year) {
    let obj = {month: month, year: year,};
    let data = await sendPostRequest("/query/sendData", obj);
    // console.log("DATA:", data);
    return data;
}

export default sendData;
