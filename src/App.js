import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/authSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios'; 
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import AdTabs from './components/AdTabs';

function App() {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['elk_authorization_token']);

    useEffect(() => {
        if (cookies.elk_authorization_token) {
            fetchUserData(cookies.elk_authorization_token);
        }
    }, [cookies]);

    const fetchUserData = async (token) => {
        try {
            const { id: userId } = jwtDecode(token); // Extract user ID from token
            console.log(jwtDecode(token))
            console.log('meghaaaa')

            const response = await axios.post(`http://localhost:5000/api/get_user?id=${userId}`, {}, {
              headers: { authorization: `Bearer ${token}` }
          });
          

            const userData = response.data;
            dispatch(setUser({ user: userData, token })); // Set user & token in Redux store
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Tabs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/post-ad" element={<AdTabs />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;

