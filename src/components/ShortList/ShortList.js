import React from 'react';
import './ShortList.scss'

class ShortCard extends React.Component {
    render() {
        const background = {
            backgroundImage: "url('https://image.tmdb.org/t/p/w300" + this.props.background +"')"
        };
        return(
            <div className='short-card' style={background}>
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
                            />
                        )
                    }
                </div>
            </div>
        );

    }

}

export default ShortList;