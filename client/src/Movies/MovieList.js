import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  removeFromList = id =>
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id)
    });

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails
            key={movie.id}
            movie={movie}
            remove={this.removeFromList}
          />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, remove }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} remove={remove} />
    </Link>
  );
}
