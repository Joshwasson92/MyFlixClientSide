import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default class ProfileView extends React.Component {

    render() {
        <Menu user={user} />
        const { user, onBackClick } = this.props;
        return (
            
            <div className='profile-view'>
                <div className='username'>
                    <span className='label'>Username:</span>
                    <span className='value'>{user}</span>
                    <Button onClick={() => { onBackClick(null); }}>Back</Button>
                </div>


            </div>
        )
    }
}