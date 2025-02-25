import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileLogin from './components/MobileLogin';
import AdminHome from './components/admin2/AdminHome';
import AdminNotificationForm from './components/admin2/AdminNotification';

function App() {
  const [activeTab, setActiveTab] = useState('rentals');

  return (
    <>
      {/* <Header activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path='/notification' element={<AdminNotificationForm/>}/>
        {/* <Route path="/" element={<HomeAdmin />} /> */}
      </Routes>
      {/* < Footer/>  */}
    </>
  );
}

export default App;
