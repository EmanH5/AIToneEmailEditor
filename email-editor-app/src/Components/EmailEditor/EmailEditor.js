import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import '../../Assets/Styles/EmailEditor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import fetch from 'node-fetch'; 

const EmailEditor = () => {
    const [toEmail, setToEmail] = useState('');
    const [emailSubject, setemailSubject] = useState('');
    const [value, setValue] = useState('');
    const [tone, setTone] = useState('Professional');
    const [recommendation, setRecommendation] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleCheckTone = async () => {
        try {
            //const randomRecommendation = Math.random() < 0.5 ? 'Positive' : 'Negative';
            const response = await fetch('http://localhost:3001/check-tone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tone,
                    value,
                })
            });

            if (response.ok) {
                const result = await response.json();
                const values = JSON.parse(result.response);
                setRecommendation(values.email_body);
            } else {
                console.error('Failed to check tone');
            }
        } catch (error) {
            console.error('An error occurred while checking tone:', error);
        }
    };

    const fromEmail= '<your-sendgrid-email>';
    
    const handleSendEmail = async () => {
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fromEmail,
                    toEmail,
                    emailSubject,
                    emailBody: value
                })
            });
           
            if (response.ok) {
                console.log('Email sent successfully');
                setEmailSent(true); 
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('An error occurred while sending email:', error);
        }
    };

    const handleCopyRecommendation = () => {
        console.log(recommendation);
        setValue(recommendation);
    };

    return (
        <Container className="email-editor-container">
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="toEmail">
                            <Form.Label>To Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter email"
                                value={toEmail}
                                onChange={(e) => setToEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="subject">
                                    <Form.Label>Email Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Enter subject"
                                        value={emailSubject}
                                        onChange={(e) => setemailSubject(e.target.value)}
                                    />
                                </Form.Group>
                        <Form.Group controlId="richEditor" className='richEditor'>
                            <Form.Label>Email Body</Form.Label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} required />
                        </Form.Group>
                        <Form.Group controlId="tone">
                            <Form.Label>Tone</Form.Label>
                            <Form.Control
                                as="select"
                                className='toneSelector'
                                required
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                            >
                                <option value="Professional">Professional</option>
                                <option value="Friendly">Friendly</option>
                                <option value="Salesy">Salesy</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleCheckTone}>
                            Check & Recommend Tone
                        </Button>{' '}
                        <Button variant="success" onClick={handleSendEmail}>
                            Send Email
                        </Button>
                        {emailSent && <span style={{ color: 'green', marginLeft: '10px' }}>Email sent successfully</span>}
                    </Form>
                </Col>
                <Col>
                    <div className="result-container">
                        <div className="result-label">
                            <span className="positive">Recommendation</span>
                        </div>
                        <div
                            className="result-text"
                            // this could be enhanced with an react html parser
                        >
                            <ReactQuill  theme="snow" value={recommendation} toolbar={false} readOnly />

                        </div>
                        <Button variant="secondary" onClick={handleCopyRecommendation}>
                            Copy Recommendation
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EmailEditor;