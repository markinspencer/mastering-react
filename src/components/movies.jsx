import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      genres,
      movies: getMovies()
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      currentPage: 1,
      selectedGenre: genre
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return {
      totalCount: filteredMovies.length,
      data: movies
    };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the database. </p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <React.Fragment>
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
            <p>Showing {totalCount} in the database </p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default Movies;
