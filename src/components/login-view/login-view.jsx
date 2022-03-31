import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function LoginView(props) {
    const [ username, setUsername ] = useState ('');
    const [ password, setPassword ] = useState ('');
    

    // Hook for input

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    //Validate user input
    const validate =() => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username is required');
            isReq = false;
        }else if(username.length < 2 ){
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password required');
            isReq = false;
        }else if(password.length < 6){
            setPassword('Password must be 6 characters long');
            isReq = false
        }

        return isReq;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            axios.post('https://jwmovieapi.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response =>{
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('User does not exist!')
            });
        }
    }


return (
    <Form>
        <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
        </Button>
        
    </Form>
 )
}
