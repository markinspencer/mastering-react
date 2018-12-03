import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import _ from "lodash";
import { getGenres } from "../services/genre.service";
import { getMovie, saveMovie } from "../services/movie.service";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "New Movie",
      genreId: "",
      numberInStock: "3",
      dailyRentalRate: "3"
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount = async () => {
    const { data } = this.state;
    const genres = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") {
      this.mapToViewModel({ ...data, genre: _.first(genres) });
      return;
    }

    const movie = await getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.mapToViewModel(movie);
  };

  mapToViewModel(movie) {
    const { genre, ...props } = movie;
    this.setState({
      data: {
        ...props,
        genreId: genre._id
      }
    });
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>Movie Form {id}</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}
        {this.renderButton("Save")}
      </div>
    );
  }
}
export default MovieForm;
