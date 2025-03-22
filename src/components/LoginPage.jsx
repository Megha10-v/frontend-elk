import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('phone'); 
    const [verificationId, setVerificationId] = useState('');
    const [, setCookie] = useCookies(['elk_authorization_token']);

   

    const navigate = useNavigate();

    const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
    const validateOtp = (otp) => /^[0-9]{6}$/.test(otp);

    // Handle sending OTP
    const handleSendOtp = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/send_otp', { mobile: phoneNumber });

            console.log('OTP Sent:', response.data);
            setStep('otp'); 
            setVerificationId(response.data.verificationId)
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle verifying OTP
    const handleVerifyOtp = async () => {
        if (!validateOtp(otp)) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/verify_otp', { verificationId: verificationId, otp: otp });

            console.log('OTP Verified:', response.data);
            setCookie('elk_authorization_token',response.data.data.token,{path:'/',maxAge: 7 * 24 * 60 * 60, })
            navigate('/'); // Navigate to home after successful verification
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Container>
                <Card className="shadow-lg p-4 border-0 rounded-4 mx-auto" style={{ maxWidth: '400px' }}>
                    <Card.Body>
                        <h3 className="text-center mb-3" style={{ fontWeight: 'bold', color: '#4FBBB4' }}>
                            {step === 'phone' ? 'Welcome Back!' : 'Enter OTP'}
                        </h3>
                        <p className="text-muted text-center mb-4">
                            {step === 'phone'
                                ? 'Login or Sign Up with your phone number'
                                : `OTP sent to ${phoneNumber}`}
                        </p>

                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                        <Form>
                            {step === 'phone' && (
                                <Form.Group controlId="phoneNumber" className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter your 10-digit phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        isInvalid={!!error}
                                    />
                                </Form.Group>
                            )}

                            {step === 'otp' && (
                                <Form.Group controlId="otp" className="mb-3">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control
                                        className='mb-3'
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        isInvalid={!!error}
                                    />
                                </Form.Group>
                            )}

                            <Button
                                className="w-100 py-2"
                                onClick={step === 'phone' ? handleSendOtp : handleVerifyOtp}
                                style={{
                                    fontWeight: 'bold',
                                    letterSpacing: '0.5px',
                                    backgroundColor: '#fdd77f',
                                    borderColor: '#fdd77f',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                                disabled={loading}
                            >
                                {loading && <Spinner as="span" animation="border" size="sm" />}
                                {step === 'phone' ? 'Send OTP' : 'Verify OTP'}
                            </Button>
                        </Form>

                        <p className="text-muted text-center mt-4" style={{ fontSize: '14px' }}>
                            By continuing, you agree to our <a href="https://elkbusinesshub.com/terms" target="_blank">Terms of Service</a> &{' '}
                            <a href="https://elkbusinesshub.com/privacy" target="_blank" >Privacy Policy</a>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginPage;

