import React, { Component } from 'react';
import { NavLink as Link, NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

class Header1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: true,
            user: {},
            isAuthenticated: false,
            show: true,
            scrollPos: 0
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

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
    // componentDidMount() {
    //     var user = window.sessionStorage.getItem('user');
    //     var token = window.sessionStorage.getItem('token');
    //     if(user) user = JSON.parse(user);
    //     if(user && token) {
    //         this.setState({
    //             user,
    //             isAuthenticated: true
    //             })
    //     }
        
    // }

    UNSAFE_componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
      
    UNSAFE_componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const { scrollPos } = this.state;
        this.setState({
          scrollPos: document.body.getBoundingClientRect().top,
          show: document.body.getBoundingClientRect().top > scrollPos
        });
      }

    openFilter() {
        this.props.openFilter();
    }

    render() {
        var { user, isAuthenticated } = this.state;
        return(
            <header>
        {/*  add dark-nav  */}
        <nav className={this.state.show ? "showHeader nav" : "hideHeader nav"}>
          <div className="nav-container">
            <div className="nav-heading">
              {/* <button class="toggle-nav" data-toggle="open-navbar1"><i class="fas fa-bars fa-2x"></i></button> */}
                <div className="toggle-nav">
                    <button onClick={() => this.toggleDrawer()}><i class="fa fa-bars fa-lg" aria-hidden="true"></i></button>
                </div>
                <div className="">
                    <Link to="/">
                        <div className="logo"><span className="first">Showroom</span><span className="second">baby</span></div>
                    </Link>
                </div>
                <div className={this.state.showDrawer ? 'menu show-drawer' : 'menu hide-drawer'}>
                <ul className="list">
                  <div className="drawer-header"> 
                    {/* <div className="navbar-mobile-logo" /> */}
                    <div className="logo-drawer"><span className="first">Showroom</span><span className="second">baby</span></div>
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
                {isAuthenticated  && 
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
                <i onClick={() => this.openFilter()} className="fas fa-search fa-lg" />
              </div>
            </div>
          </div>
        </nav>
      </header>
        )
    }
}
const mapStateToProps = function(state) {
    return {
        message: state.userReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
          openFilter: () => dispatch({type: 'OPEN_MOBILE_FILTER', payload: null})
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header1)