import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./director-view.scss";

/**
 * @module DirectorView
 * Class component for director view.
 */
export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="director-view">
        <Card.Title className="text-center">{director.Name} </Card.Title>

        <span className="text-center label">
          Birthday: {director.Birthday}{" "}
        </span>

        <Card.Body className="label">{director.Bio} </Card.Body>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Card>
    );
  }
}

/**
 * PropTypes validation.
 */
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
