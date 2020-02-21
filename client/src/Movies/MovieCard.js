import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.remove(res.data);
        alert("Movie successfully deleted.");
      })
      .catch(err => {
        alert("Problem deleting the movie. Try again.");
      });
  };
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            props.history.push(`/update-movie/${id}`);
          }}
        >
          Edit
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            deleteMovie(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default withRouter(MovieCard);
