import React from 'react';
import './FeaturedMovie.scss';
import play from '../../assets/play.svg';
import plus from '../../assets/plus.svg';
import addList from '../../assets/add-list.svg';

class FeaturedMovie extends React.Component {
    render() {
        const background = {
            backgroundImage: "url('https://image.tmdb.org/t/p/original" + this.props.background +"')"
        };
        return(
            <div className='main-container'style={background}>
                <div className='featured-content'>
                    <p>ORIGINAL DE <span>LITEFLIX</span></p>
                    <div className='featured-title'>{this.props.title}</div>
                    <div className='featured-buttons-container'>
                        <button className='hero-btn'><img src={play} alt='play button' />Reproducir</button>
                        <a><img src={addList} alt='add button'/></a>
                        <button className='hero-btn'><img src={plus} alt='add button' />Mi Lista</button>
                    </div>
                    <div className='overview'>
                        <p>Ver temporada 1</p>
                        <p>{this.props.overview}</p>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default FeaturedMovie;