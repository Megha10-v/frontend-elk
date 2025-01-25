import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header'; // Adjust the import as needed
import Footer from './components/Footer';
import MobileLogin from './components/MobileLogin';


function App() {
  const [activeTab, setActiveTab] = useState('rentals'); // Track the active tab in App

 return (
   
      <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      < Footer/> 
      {/* <MobileLogin/> */}
      </>
      
   
  );
}

export default App;
