import React from 'react';
import './App.scss';
import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie'
import ShortList from './components/ShortList'
import BigList from './components/BigList'
import MobileMenu from './components/MobileMenu'
import UploadModal from './components/UploadModal'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredMovie: {},
      upcomingMovies: [],
      myMovies: [],
      popularMovies: [],
      showModal: false
    }
    this.getFeaturedMovie = this.getFeaturedMovie.bind(this);
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getUpcomingMovies = this.getUpcomingMovies.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.updateMyMovies = this.updateMyMovies.bind(this);
    this.openModal = this.openModal.bind(this);
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
    this.updateMyMovies();
  }
  openModal() {
    if(this.state.myMovies.length >= 4) {
      alert('Memoria local llena!')
    }
    else {
      this.toggleModal()
    }
  }
  toggleModal() {
    if(this.state.showModal){
      this.setState({showModal: false});
    }
    else {
      this.setState({showModal: true});
    }
  }
  updateMyMovies(){
    if(window.localStorage.getItem('myMovies')){
      this.setState({ myMovies: JSON.parse(window.localStorage.getItem('myMovies')).myMovies })
    }
  }
  addNewMovie(poster, title, category){
    window.localStorage.setItem( 
      'myMovies',
      JSON.stringify({
        myMovies: [
          ...this.state.myMovies,
          {
            title: title,
            genre_ids: [category],
            poster: poster,
            backdrop_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
          }
        ]
      })
    )
    if(JSON.parse(window.localStorage.getItem('myMovies')).myMovies.length <= 4){
      this.updateMyMovies();
    }
    else{
      alert('Memoria full')
    }
  }
  render() {
    return (
      <div>
        <Header openModal={this.openModal} />
        <MobileMenu openModal={this.openModal} />
        { 
          this.state.showModal 
          && 
          <UploadModal 
            closeModal={this.toggleModal}
            addNewMovie={this.addNewMovie} 
          /> 
        }
        <FeaturedMovie 
          title = {this.state.featuredMovie.title}
          background ={this.state.featuredMovie.backdrop_path}
          overview = {this.state.featuredMovie.overview}
        />
        <div style = {{marginTop: -102}}>
          <ShortList title='Próximamente' moviesList={this.state.upcomingMovies} local={false}/>
          {
            this.state.myMovies.length > 0
            &&
            <ShortList title='Mis películas' moviesList={this.state.myMovies} local={true} />
          }
        </div>
        <BigList title='POPULARES DE LITEFLIX' moviesList={this.state.popularMovies} />
      </div>
    );
  }
}

export default App;
