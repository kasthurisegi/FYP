import React, { useState, useContext } from 'react';
import Index from './Index';
import { UserInfoContextProvider } from './src/context/userInfoContext';
import { DataProcessorContextProvider } from './src/context/DataProcessor';

export default function App() {
  
  return (
    <UserInfoContextProvider>
      <DataProcessorContextProvider>
        <Index/>
      </DataProcessorContextProvider>
    </UserInfoContextProvider>
  );
}