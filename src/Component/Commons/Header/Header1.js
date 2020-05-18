import React, { Component } from 'react';
import { NavLink as Link, NavLink as RRNavLink } from 'react-router-dom';


import './Header1.css';

class Header1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: true,
            user: {},
            isAuthenticated: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);

    }
    toggleDrawer() {
        console.log('clicked');
        this.setState({
            showDrawer : !this.state.showDrawer
        })

    }
    UNSAFE_componentWillReceiveProps(nexProps, nextState) {
        if(nexProps.user) {
            this.setState({
                user: nexProps.user
            })
        }
        console.log(this.props.children)
    }
    UNSAFE_componentWillUpdate(nexProps, nextState) {
        // if(nexProps.user) {
        //     this.setState({
        //         user: JSON.parse(nexProps.user)
        //     })
        // }
        console.log(this.props.children)

    }
    componentDidMount() {
        var user = window.sessionStorage.getItem('user');
        var token = window.sessionStorage.getItem('token');
        if(user) user = JSON.parse(user);
        if(user && token) {
            this.setState({
                user,
                isAuthenticated: true
                })
        }
        
    }

    render() {
        var { user, isAuthenticated } = this.state;
        return(
            <header>
        {/*  add dark-nav  */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-heading">
              {/* <button class="toggle-nav" data-toggle="open-navbar1"><i class="fas fa-bars fa-2x"></i></button> */}
                <div className="toggle-nav">
                    <button onClick={() => this.toggleDrawer()}><i class="fa fa-bars fa-lg" aria-hidden="true"></i></button>
                </div>
                <div className="navbar-logo">
                    <Link to="/">
                        
                    </Link>
                </div>
                <div className={this.state.showDrawer ? 'menu show-drawer' : 'menu hide-drawer'}>
                <ul className="list">
                  <div className="drawer-header"> 
                    <div className="navbar-mobile-logo" />
                    <div className="close-drawer-btn" >
                        <button onClick={() => this.toggleDrawer()}>
                        <i class="fa fa-times fa-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                  </div>
                  <li className="seprator">
                        <span>Info generale</span>
                        <hr/>
                    </li>
                  <li>
                      <Link to="/newAnnonce" activeClassName='active'>
                        <div className="nav-icon">
                            <i className="far fa-plus-square fa-lg" />
                        </div>
                        <span>Ajouter une annonce</span>
                    </Link>
                </li>
                <li>
                      <Link to="/favoris" activeClassName='active'>
                        <div className="nav-icon">
                            <i className="far fa-heart fa-lg" />
                        </div>
                        <span>Mes favoris</span>
                    </Link>
                </li>
                {!isAuthenticated &&
                    <li>
                    <Link to="/auth/login" activeClassName='active'>
                        <div className="nav-icon">
                            <i className="fas fa-sign-in-alt fa-lg" />
                        </div>
                        <span>Connection</span>
                    </Link>
                </li>
                }
                {isAuthenticated && 
                    <li className="categories">
                    <div className="profile" />
                    <ul className="drop-down" id="target">
                        <li className="seprator">
                            <span>Info personnelle</span>
                            <hr/>
                        </li>
                    
                        <li>
                            <Link to="/favoris" activeClassName='active'>
                                <div className="nav-icon">
                                    <i className="fas fa-user-secret fa-lg" />
                                </div>
                                <span>Mon profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/favoris" activeClassName='active'>
                                <div className="nav-icon">
                                    <i className="fas fa-user-times" />
                                </div>
                                <span>Mes annonces</span>
                            </Link>
                        </li>
                        <li className="sub-drop-down">
                            <Link to="/favoris" activeClassName='active'>
                                <div className="nav-icon">
                                    <i className="fas fa-sign-in-alt fa-lg" />
                                </div>
                                <span>Deconnection</span>
                            </Link>
                        </li>
                    </ul>
                  </li>
                }
                </ul>
              </div>
              <div className="search-btn">
                <i className="fas fa-search fa-2x" />
              </div>
            </div>
          </div>
        </nav>
      </header>
        )
    }
}


export default Header1