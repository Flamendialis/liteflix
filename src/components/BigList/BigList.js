import React from 'react';
import './BigList.scss';

class BigCard extends React.Component {
    render() {
        const background = {
            backgroundImage: "url('https://image.tmdb.org/t/p/w300" + this.props.background +"')"
        };
        return(
            <div className='big-card' style={background}>
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
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default BigList;