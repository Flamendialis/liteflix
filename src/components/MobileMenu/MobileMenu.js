import React from 'react';
import './MobileMenu.scss';
import logo from '../../assets/liteflix.svg';
import avatar from '../../assets/fill-1.svg';
import bell from '../../assets/bell.svg';
import plus from '../../assets/plus.svg';


class MobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
        this.collapseSidebar = this.collapseSidebar.bind(this);
    }
    collapseSidebar() {
        if(!this.state.collapsed) {
            document.getElementById('sidebar').classList.add('collapsed');
            this.setState({ collapsed: true });
        }
        else{
            document.getElementById('sidebar').classList.remove('collapsed');
            this.setState({ collapsed: false });

        }  
    }
    render() {
        return(
            <div className='mobile-menu-container'>
                <div className='hamburger' onClick={this.collapseSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div id='sidebar' className='sidebar collapsed'>
                    <div className='mobile-menu-logo'>
                        <a><img src={logo} alt='liteflix logo'/></a>
                    </div>
                    <div className='mobile-user'>
                        <div className='avatar'>
                            <img src={avatar} alt='avatar' />
                        </div>
                        <p>Ernesto Garmendia</p>
                    </div>
                    <div className='user-options'>
                        <div>
                            <a><p>Cambiar usuario</p></a>
                        </div>
                        <div>
                            <a><p>Configuración</p></a>
                        </div>
                        <div>
                            <a><p>Ayuda</p></a>
                        </div>
                    </div>
                        <div className='news'>
                            <a>
                                <div>
                                    <img src={bell} alt='bell' />
                                </div>
                                <p>Novedades</p>
                            </a>
                        </div>
                    <div className='mobile-navbar'>
                        <a><p>Series</p></a>
                        <a><p>Pelícuas</p></a>
                        <a><p>Mi lista</p></a>            
                        <a><p>Niños</p></a>
                    </div>
                    <div className='mobile-add-movie'>
                        <img src={plus} alt='add symbol' />
                        <p>Agregar película</p>
                    </div>
                    <div className='mobile-logout'>
                        <a><p>Log Out</p></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileMenu;