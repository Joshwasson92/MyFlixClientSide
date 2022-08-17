import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
import { MovieView } from "./components/movie-view/movie-view";
import { RegistrationView } from "./components/registration-view/registration-view";
import { ProfileView } from "./components/profile-view/profile-view";
import { MovieCard } from "./components/movie-card/movie-card";
import { Menu } from "./components/menu/menu";
import { LoginView } from "./components/login-view/login-view";
import { GenreView } from "./components/genre-view/genre-view";
import { DirectorView } from "./components/director-view/director-view";

/** Import statement to indicate you need to bundle './index.scss';*/
import "./index.scss";

/** @module MyFlixApplication
 * Main component (will eventually use all the others)*/

class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

/**
 *Defines app container.
 */
const container = document.getElementsByClassName("app-container")[0];

/** Tells React to render your app in the root DOM element */
ReactDOM.render(React.createElement(MyFlixApplication), container);
