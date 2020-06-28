import React from 'react';
import './BigList.scss';
import play from '../../assets/play.svg';
import like from '../../assets/like.svg';
import arrow from '../../assets/thin-arrow.svg';

var categories = require('../../categories/categories.json');

class BigCard extends React.Component {
    render() {
        const background = {
            backgroundImage: "url('https://image.tmdb.org/t/p/w300" + this.props.background +"')"
        };
        return(
            <div className='big-card' style={background}>
                <div className='big-card-content'>

                    <div className='big-card-play'>
                        <a href='#'>
                            <div className='big-play-wrapper'>    
                                <img src={play} alt='play button' />
                            </div>
                        </a>
                    </div>

                    <div className='big-card-info'>

                        <div className='big-info-container'>
                            <div className='big-card-title'>
                                <p>{this.props.title}</p>
                            </div>
                            <div className='big-card-specs'>    
                                <div className='big-card-match'>
                                    <p>98% Coincidencia</p>
                                </div>
                            </div>
                            <div className='big-card-specs'>      
                                <div className='big-card-age'>
                                    <p>+16</p>
                                </div>
                                <div className='big-card-duration'>
                                    <p>1h 30 min</p>
                                </div>
                            </div>
                            <div className='big-card-genre'>
                                <p>
                                    {
                                        categories.genres.filter(cat => cat.id === this.props.category)[0].name
                                    }
                                </p>
                            </div>
                        </div>

                        <a href='#'>
                            <div className='big-like-wrapper'>
                                <img src={like} alt='like button' />
                            </div>
                        </a>

                    </div>

                    <div className='big-card-arrow'>
                        <a href='#'>
                            <img src={arrow} alt='down arrow' />
                        </a>
                    </div>


                </div>        
            </div>    
        );
    }
}

class BigList extends React.Component {
    
    render() {
        return(
            <div className='big-list-container'>
                <h2>{this.props.title}</h2>
                <div className='big-cards-container'>
                    {
                        this.props.moviesList.map(
                            movie => 
                            <BigCard 
                                background={movie.poster_path}
                                title={movie.title}
                                category={movie.genre_ids[0]}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default BigList;