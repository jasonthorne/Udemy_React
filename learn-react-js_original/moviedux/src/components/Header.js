import React from 'react';
import '../styles.css';

export default function Header(){
  return (
    //always return ONE parent tag ++++++++
    <div className="header">
        <img className="logo" src="logo.png" alt="im an alt" />
        <h2 className='app-subtitle'>I'm a sub title</h2>
    </div>
  );
};