import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/SearchBox";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genre.service";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/movie.service";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const genres = await getGenres();
    const updatedGenres = [{ _id: "", name: "All Genres" }, ...genres];

    this.setState({
      genres: updatedGenres,
      movies: await getMovies()
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
      searchQuery: "",
      selectedGenre: genre
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  searchMovies = movie => {
    const { searchQuery } = this.state;

    if (!searchQuery) return true;

    return _.startsWith(_.lowerCase(movie.title), _.lowerCase(searchQuery));
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

    const searchedMovies = filteredMovies.filter(this.searchMovies);

    const sortedMovies = _.orderBy(
      searchedMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);
    return {
      totalCount: searchedMovies.length,
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
      sortColumn,
      searchQuery
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
            <SearchBox
              placeholder="Search..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
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
