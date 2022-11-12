import React, { useState, useContext } from 'react';
import Index from './Index';
import { UserInfoContextProvider } from './src/context/userInfoContext';

export default function App() {
  
  return (
    <UserInfoContextProvider>
      <Index/>
    </UserInfoContextProvider>
  );
}