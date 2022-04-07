import React, { useState } from 'react';
import axios from 'axios';
import {Button, Row, Container, Col, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './registration-view.scss';
import { Menu } from '../navbar/navbar';

export function RegistrationView(props) {

const [username, setUsername ] = useState('');
const [password, setPassword ] = useState('');
const [email, setEmail ] = useState('');
const [birthday, setBirthday] = useState('');

// Hooks

const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
    
});


//user validation

const validate = () => {
    let isReq = true;
    if(!username){
        setValues({...Button, usernameErr: 'Username is required'});
        isReq = false;
    }else if(username.length< 2) {
        setValues({...values, usernameErr: 'Username must be atleast 2 characters long'});
        isReq = false;
    }
    if(!password){
        setValues({...values, passwordErr: 'Password is required'});
        isReq= false;

    }else if(password.length <6){
        setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
        isReq = false
    }
    if(!email){
        setValues({...values, emailErr: 'Email address is required'});
        isReq = false;
    }else if(email.indexOf('@') === -1 ) {
        setValues({...values,emailErr: 'Email is invalid'});
        isReq = false
    }
   
    

    return isReq;
}

const handleSubmit = (e) => {
    e.preventDefault();
    if(isReq){
        axios.post('https://jwmovieapi.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            alert('Registration successful, Please login.');
            window.open('/','_self');
        })
        .catch( response => {
            alert('An error occured')
        });
    }
};


return (
    <Container>
    <Row className="mt-5">
    <Col md={12}>
    <Menu />    
             <Form>
                    <h3> Sign Up</h3>
                    <p></p>  
                    <Form.Group controlId='formUsername' className='reg-form-inputs'>
                    <Form.label>Username:</Form.label>
                        <Form.Control type='text' placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlID='formPassword' className='reg-form-inputs'>
                        <Form.label>Password</Form.label>
                        <Form.Control type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                
                    <Form.Group controlId='formEmail' className='reg-form-inputs'>
                        <Form.label>Email:</Form.label>
                        <Form.Control type='text' placeholder='user@example.com' value={email} onChange={e => setPassword(e.target.value)} />]
                        {values.emailErr ** <p>{values.passwordErr}</p>}
                        <Button variant='primary' type='submit' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
         </Row>
    </Container>
  );

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};