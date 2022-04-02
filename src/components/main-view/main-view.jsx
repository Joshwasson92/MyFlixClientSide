import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://jwmovieapi.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
        // Assign the result to the state
        this.setState({
            movies: response.data
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}


componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
    }
}

onLoggedIn(authData) {
    console.log(authData);
    this.setState({
        user: authData.user.Username
    });
}

render() {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/genres/:name" render={({ match }) => {
              return <Col md={8}>

              </Col>
          }}/>


         <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            }
            } />

        </Row>
      </Router>
    );
  }
}


















