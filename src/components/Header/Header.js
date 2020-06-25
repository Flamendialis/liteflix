import React from 'react';
import logo from '../../assets/liteflix.svg';
import plus from '../../assets/plus.svg';
import bell from '../../assets/bell.svg';
import user from '../../assets/user-01.svg';
import arrow from '../../assets/arrow.svg';
import avatar from '../../assets/fill-1.svg';
import avatarDark from '../../assets/fill-2.svg';
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
                <a href='#'><img className='logo' src={logo} alt='liteflix logo' /></a>
                <nav className='navbar'>
                    <ul>
                        <a href='#'><li className='nav-item'>Inicio</li></a>
                        <a href='#'><li className='nav-item'>Series</li></a>
                        <a href='#'><li className='nav-item'>Películas</li></a>
                        <a href='#'><li className='nav-item'>Agregados recientemente</li></a>
                        <a href='#'><li className='nav-item'>Mi lista</li></a>
                    </ul>
                </nav>
                <div className='add-movie'>
                    <img src={plus} alt='plus symbol' />
                    <p>Agregar película</p> 
                </div>
                <div className='user-navbar-container'>
                    <div className='user-navbar'>
                        <a href='#'><div className='nav-item'>Niños</div></a>
                        <a href='#'>
                            <div className='bell-container'>
                                <img className='bell' src={bell} alt='bell' />
                            </div>
                        </a>
                        <div className='user-menu-container'>
                            <a href='#'><img className='user' src={user} alt='user avatar' /></a>
                            <div className='user-menu'>
                                <div className='active-user'>
                                    <div className='circled-avatar active'>
                                        <img  src={avatar}  alt='user avatar' />
                                    </div>
                                    <a href='#'><p>Ernesto G...</p></a>
                                </div>
                                <div className='inactive-user'>
                                    <div className='circled-avatar inactive'>
                                        <img  src={avatarDark} alt='user avatar' />
                                    </div>
                                    <a href='#'><p>User 03</p></a>
                                </div>
                                <div className='inactive-user'>
                                    <div className='circled-avatar inactive'>
                                        <img  src={avatarDark} alt='user avatar' />
                                    </div>
                                    <a href='#'><p>User 04</p></a>
                                </div>
                                <div className='user-options'>
                                    <a href='#'><p>Configuración</p></a>
                                </div>
                                <div className='user-options'>
                                    <a href='#'><p>Ayuda</p></a>
                                </div>
                                <div className='user-options'>
                                    <a href='#'><p>Log Out</p></a>
                                </div>

                            </div>
                        </div>
                        <a href='#'><img className='arrow' src={arrow} alt='down arrow' /></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;