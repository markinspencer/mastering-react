import React, { Component } from "react";
import "./App.css";
import Movie from "./components/movie";

class App extends Component {
  render() {
    return (
      <main role="main" className="container">
        <Movie />
      </main>
    );
  }
}

export default App;
