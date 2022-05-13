import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./genre-view.scss";
import PropTypes from "prop-types";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-background">
        <Card className="genre-card">
          <Card.Title className="text-center genre-description-font">
            {genre.Name}
          </Card.Title>
          <Card.Body className="genre-description-font">
            Description: {genre.Description}
          </Card.Body>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
