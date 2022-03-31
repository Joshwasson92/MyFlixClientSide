import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {
const [username, setUsername ] = useState('');
const [password, setPassword ] = useState('');
const [email, setEmail ] = useState('');

// Hooks

const [ usernameErr, setUsernameErr ] = useState('');
const [ passwordErr, setPasswordErr ] = useState('');
const [ emailErr, setEmailErr ] = useState('');

//user validation

const validate =() => {
    let isReq = true;
    if(!username){
        setUsernameErr('Username is required');
        isReq = false;

    }else if(username.length< 2) {
        setUsernameErr('Username must be atleast 2 characters long');
        isReq = false;

    }
    if(!password){
        setPasswordErr('Password is required');
        isReq= false;

    }else if(password.length <6){
        setPassword('Password must be at least 6 characters long');
        isReq = false
    }

    if(!email){
        setEmailErr('Email address is required');
        isReq = false;
    }else if(email.indexOf('@') === -1 ) {
        setValues({...values,emailErr: 'Email is invalid'});
        isReq = false
    }
    



    return isReq;
}

const handleSubmit =(e) => {
    e.preventDefault();
    if(isReq){
        axios.post('https://jwmovieapi.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email
        })
        .then(response =>{
            const data= response.data;
            props.onLoggedIn(data);
        })
        .catch( e => {
            console.log('Invalid information entered')
        })
    }
}


return (
    <Form>
        <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
            <Form.Control type='text' placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Form.Group controlId='formEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='text' placeholder='user@example.com' value={email} onChange={e => setPassword(e.target.value)} />

        </Form.Group>
    </Form>
  );

}