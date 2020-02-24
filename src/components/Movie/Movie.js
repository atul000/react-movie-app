import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColdGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

export default class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    // fetch movie
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: res }, () => {
            // fetch actors in setState callback function
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(res => res.json())
              .then(res => {
                console.log(res);
                const directors = res.crew.filter(
                  member => member.job === "Director"
                );
                this.setState({
                  actors: res.cast,
                  directors,
                  loading: false
                });
                console.log(this.directors);
                console.log(this.actors);
              });
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="rmdb-movie">
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
        {/* <FourColdGrid /> */}
        <Spinner />
      </div>
    );
  }
}