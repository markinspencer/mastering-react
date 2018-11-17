import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movie extends Component {
  state = {
    movies: []
  };

  constructor() {
    super();
    this.state.movies = getMovies().map(movie => {
      return { ...movie, isLiked: false };
    });
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(movie => id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const { movies } = this.state;
    const index = movies.indexOf(movie);
    const isLiked = !movie.isLiked;
    movies[index] = { ...movie, isLiked };

    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database. </p>;

    return (
      <React.Fragment>
        <p>Showing {count} in the database </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  renderTableRows() {
    return this.state.movies.map(movie => (
      <tr key={movie._id}>
        <td> {movie.title} </td>
        <td> {movie.genre.name}</td>
        <td> {movie.numberInStock}</td>
        <td> {movie.dailyRentalRate}</td>
        <td>
          <Like
            onClick={() => this.handleLike(movie)}
            isLiked={movie.isLiked}
          />
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(movie._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }
}

export default Movie;
