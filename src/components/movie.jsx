import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

class Movie extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4
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

  handlePageChange = currentPage => this.setState({ currentPage });

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database. </p>;

    const movies = paginate(allMovies, currentPage, pageSize);

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
          <tbody>{this.renderTableRows(movies)}</tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  renderTableRows(movies) {
    return movies.map(movie => (
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
