import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = {
    movies: []
  };

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(movie => id !== movie._id);
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
          {" "}
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
