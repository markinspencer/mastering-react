import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "./../services/auth.service";

class MoviesTable extends Component {
  columns;
  baseColumns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          isLiked={movie.isLiked}
          onClick={() => this.props.onLike(movie)}
        />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: movie => {
      return (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      );
    }
  };

  constructor() {
    super();
    const user = getCurrentUser();

    this.columns =
      user && user.isAdmin
        ? [...this.baseColumns, this.deleteColumn]
        : [...this.baseColumns];
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
