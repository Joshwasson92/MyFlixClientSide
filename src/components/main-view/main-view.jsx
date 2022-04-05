import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import Menu from '../Menu/Menu';





import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import {DirectorView} from'../director-view/director-view';
import {GenreView} from'../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';
import {UserUpdate} from '../profile-view/user-update';
import  './main-view.scss';








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
    localStorage.setItem('token', authData.token);
    this.getMovies(authData.token);

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
          <Menu user={user} />
          <Container>
        <Row className='main-view justify-content-md-center'>
          <Route exact path="/"  render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
        <Route path='/register' render={() => {
            if (user) return <Redirector to='/' />
            return <Col lg={8} md={8}>
                <RegistrationView />
            </Col>
        }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
              const movie = movies.find(m => m._id === match.params.movieId)
              if (!movie) return 
            return <Col md={8}>
              <MovieView movie={movie} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          
          <Route exact path="/genres/:name" render={({ match, history }) => {
              const movie = movies.find(m => m.Genre.Name === match.params.name)
              if (!movie) return 
              return <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
          }}/>


         <Route path="/directors/:name" render={({ match, history }) => {
        
           

            const movie = movies.find(m => m.Director.Name === match.params.name)
            
            return <Col md={8}>
                <DirectorView director={movie.Director} onBackClick={ history.goBack } />
            </Col>
            }
            } />

        </Row>
        </Container>
      </Router>
    );
  }
}


















