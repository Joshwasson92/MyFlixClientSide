import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img crossOrigin="anonymous" src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        
     <div>
         <Link to={`/directors/${movie.Director.Name}`}>
             <Button variant='link'>Director</Button>
         </Link>
     </div>
     <div>
         <Link to={`/genres/${movie.Genre.Name}`}>
             <Button variant='link'>{movie.Genre.Name}</Button>
         </Link>
     </div>
        

  
        <Button onClick={() => { onBackClick(null); }}>Back</Button>

       </div>
    );
  }
}
