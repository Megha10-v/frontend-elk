import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MobileLogin = () => {
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [name, setName] = useState(''); // Optional: Ask user for name
  const [,setCookie] = useCookies(['elk_authorization_token'])

  // Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    axios
      .post(
        'http://localhost:5000/api/send_otp',
        { mobile: mobileNumber },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        setVerificationId(response.data.verificationId);
        setError('');
        setIsOtpSent(true);
        console.log(`OTP sent to: ${mobileNumber}`);
      })
      .catch((err) => {
        setError('Error sending OTP: ' + err.message);
        setIsOtpSent(false);
        console.log(err);
      });
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {

    e.preventDefault();

    console.log('otp session...')
  
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
  
    axios
      .post(
        'http://localhost:5000/api/verify_otp',
        { verificationId: verificationId, otp: otp, name: name },
        { headers: { 'Content-Type': 'application/json' } },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          setCookie('elk_authorization_token',response.data.data.token,{path:'/',maxAge: 7 * 24 * 60 * 60, })
          const verifiedName = response.data.data.name || 'Guest'; // Use verified name or fallback to 'Guest'
          const userId = response.data.data.user_id;
          setIsLoggedIn(true)
          console.log('login succeesfully..')
        } else {
          setError('Incorrect OTP. Please try again.');
        }
      })
      .catch((err) => {
        setError('Error verifying OTP: ' + err.message);
        console.log(err);
      });
  };
  

 

  // Resend OTP
  const handleResendOtp = () => {
    axios
      .post(
        'http://localhost:5000/api/send_otp',
        { mobile: mobileNumber },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        setError('');
        console.log('OTP resent to: ' + mobileNumber);
      })
      .catch((err) => {
        setError('Error resending OTP: ' + err.message);
        console.log(err);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
      <h2>{isLoggedIn ? 'Welcome!' : 'Login with Mobile Number'}</h2>

      {isLoggedIn ? (
        <p>Welcome, {mobileNumber}!</p>
      ) : (
        <>
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  style={{
                    padding: '0.5rem',
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} >
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP"
                  style={{
                    padding: '0.5rem',
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                type="submit"
                
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '1rem',
                }}
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Resend OTP
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default MobileLogin;
