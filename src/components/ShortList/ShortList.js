import React from 'react';
import './ShortList.scss';
import play from '../../assets/play.svg';
import like from '../../assets/like.svg';
import add from '../../assets/add-list.svg';
import arrow from '../../assets/thin-arrow.svg';

var categories =require('../../categories/categories.json')

class ShortCard extends React.Component {
    render() {
        const background = {
            backgroundImage: "url('https://image.tmdb.org/t/p/w300" + this.props.background +"')"
        };
        return(
            <div className='short-card' style={background}>
                <div className='short-card-content'>
                    <div className='short-card-buttons'>
                        <a href='#'>
                            <img src={add} alt='add symbol' />
                        </a>
                        <a href='#'>
                            <div className='like-wrapper'>
                                <img src={like} alt='like button' />
                            </div>
                        </a>
                    </div>
                    <div className='short-card-play'>
                        <a href='#'>
                            <div className='play-wrapper'>    
                                <img src={play} alt='play button' />
                            </div>
                        </a>
                    </div>
                    <div className='short-card-info'>
                        <div className='info-container'>
                            <div className='short-card-title'>
                                <p>{this.props.title}</p>
                            </div>
                            <div className='short-card-specs'>    
                                <div className='short-card-match'>
                                    <p>98% Coincidencia</p>
                                </div>
                                <div className='short-card-age'>
                                    <p>+16</p>
                                </div>
                                <div className='short-card-duration'>
                                    <p>1h 30 min</p>
                                </div>
                            </div>
                            <div className='short-card-genre'>
                                <p>
                                    {
                                        categories.genres.filter(cat => cat.id === this.props.category)[0].name
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='short-card-arrow'>
                        <a href='#'>
                            <img src={arrow} alt='down arrow' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

class ShortList extends React.Component {
    render() {
        return(
            <div className='short-list-container'>
                <div>
                    <h2>{this.props.title}</h2>
                </div>
                <div className='short-cards-container'>
                    {
                        this.props.moviesList.map(
                            movie => 
                            <ShortCard 
                                background={movie.backdrop_path}
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

export default ShortList;