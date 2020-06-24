import React from 'react';
import logo from '../../assets/liteflix.svg';
import plus from '../../assets/plus.svg';
import bell from '../../assets/bell.svg';
import user from '../../assets/user-01.svg';
import arrow from '../../assets/arrow.svg';
import './Header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: 'transparent'
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll() {
        if(window.scrollY > 50) {
            this.setState({background: '#000000'})
        }
        else {
            this.setState({background: 'transparent'})
        }
    }
    render() {
        const background = {backgroundColor: this.state.background}
        return(
            <div className='header' style={background}>
                <a><img className='logo' src={logo} alt='liteflix logo' /></a>
                <nav className='navbar'>
                    <ul>
                        <a><li className='nav-item'>Inicio</li></a>
                        <a><li className='nav-item'>Series</li></a>
                        <a><li className='nav-item'>Películas</li></a>
                        <a><li className='nav-item'>Agregados recientemente</li></a>
                        <a><li className='nav-item'>Mi lista</li></a>
                    </ul>
                </nav>
                <div className='add-movie'>
                    <img src={plus} alt='plus symbol' />
                </div>
                <div className='user-navbar-container'>
                    <div className='user-navbar'>
                        <a><div className='nav-item'>Niños</div></a>
                        <a>
                            <div className='bell-container'>
                                <img className='bell' src={bell} alt='bell' />
                            </div>
                        </a>
                        <a><img className='user' src={user} alt='user avatar' /></a>
                        <a><img className='arrow' src={arrow} alt='down arrow' /></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;