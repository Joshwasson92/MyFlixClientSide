import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className='genre-view'>
                <div className='genre-name'>
                    <span classname='label'>Genre: </span>
                    <span classname='value'>{genre.Name}</span>
                </div>

                <div classname='genre description'>
                    <span classname='label'> Description: </span>
                    <span className='value'>{genre.Description}</span>
                </div>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
        )
    }
}