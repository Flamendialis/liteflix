import React from 'react';
import './App.scss';
import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie'
import ShortList from './components/ShortList'
import BigList from './components/BigList'
import MobileMenu from './components/MobileMenu'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredMovie: {},
      upcomingMovies: [],
      myMovies: [],
      popularMovies: [],
    }
    this.getFeaturedMovie = this.getFeaturedMovie.bind(this);
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getUpcomingMovies = this.getUpcomingMovies.bind(this);
  }
  getFeaturedMovie() {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({featuredMovie: result.results[0]});
        })
  }
  getUpcomingMovies() {
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=6f26fd536dd6192ec8a57e94141f8b20")
      .then(res => res.json())
      .then(
        (result) => {
          let firstFour = result.results.slice(0, 4);
          this.setState({upcomingMovies: firstFour});
        })  
  }
  getPopularMovies() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20")
      .then(res => res.json())
      .then(
        (result) => {
          let firstFour = result.results.slice(0,4);
          this.setState({popularMovies: firstFour});
        }) 
  }

  componentDidMount() {
    this.getFeaturedMovie();
    this.getUpcomingMovies();
    this.getPopularMovies();
  }
  


  render() {
    return (
      <div>
        <Header />
        <MobileMenu />
        <FeaturedMovie 
          title = {this.state.featuredMovie.title}
          background ={this.state.featuredMovie.backdrop_path}
          overview = {this.state.featuredMovie.overview}
        />
        <div style = {{marginTop: -102}}>
          <ShortList title='Próximamente' moviesList={this.state.upcomingMovies} />
          <ShortList title='Mis películas' moviesList={this.state.upcomingMovies} />
        </div>
        <BigList title='POPULARES DE LITEFLIX' moviesList={this.state.popularMovies} />
      </div>
    );
  }
}

export default App;
