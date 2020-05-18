import React , {Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../Assets/images/logo.png';
import { browserHistory } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link, NavLink as RRNavLink } from 'react-router-dom';
import './Header.css';
import { faPlusSquare, faHeart, faGratipay } from '@fortawesome/free-solid-svg-icons'
import { FaRegHeart, FaPlusSquare, FaSearch, FaRegUserCircle, FaRegPlusSquare, FaUserEdit,FaList } from "react-icons/fa";
import { AiOutlineLogout } from 'react-icons/ai';
import { LOGOUT_USER } from '../../Commons/reducers/userDetail/UserDetailActions';
import { GET_USERDETAIL } from '../../Commons/reducers/userDetail/UserDetailActions';
import MenuDrawer from '../drawerMenu/MenuDrawer';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            user: {}
        }
        this.setIsOpen = this.setIsOpen.bind(this);
        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }
    setIsOpen() {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    getUser() {
        var user = window.sessionStorage.getItem('user');
        if(user) {
            user = JSON.parse(user);
            this.setState({
                user
            })
        }
      }
      logout() {
          localStorage.removeItem('id_session');
          this.props.logout();
          window.location.reload();
      }
    UNSAFE_componentWillReceiveProps(nexProps, nextState) {
        console.log(nexProps);
    }
    
      componentWillMount() {
          var pathname = window.location.pathname;
          localStorage.setItem('barowserHistory', pathname);
          console.log(browserHistory)
      }

      
    render() {
        var {location, userDetails} = this.props;
        return(
            <div>
            <Navbar fluid className=' fixed-top navbar-light bg-light'  color="light" light expand="md" >
                <Link className="navbar-brand" exact  to="/">
                    <img src={logo}/>
                </Link>
                <NavbarToggler onClick={this.setIsOpen} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto justify-content-end" navbar>

                    <NavItem>
                        <NavLink exact  to="/newAnnonce" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaRegPlusSquare color="#000" size="1.5em"/>
                            </div>
                            <span className="navbar-item-title">Déposer une annonce</span>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact  to="/favoris" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaRegHeart color="#000" size="1.5em"/>
                            </div>
                            
                            <span className="navbar-item-title">Favoris</span>
                        </NavLink>
                    </NavItem>

                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact  to="/mesAnnonces" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaList color="#000" size="1.5em"/>
                            </div>
                            <span className="navbar-item-title">Mes annonces</span>

                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact  to="/profile" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaUserEdit color="#000" size="1.5em"/>
                            </div>
                            <span className="navbar-item-title">Mon profile</span>
                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact onClick={() => this.logout()}  activeClassName="active" >
                            <div>
                                <AiOutlineLogout color="#000" size="1.5em"/>
                            </div>
                            <span className="navbar-item-title">Déconnection</span>
                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success ?
                        <NavItem>
                            <NavLink>
                                <div>
                                    <FaRegUserCircle color="#000" size="1.5em"/>
                                </div>
                                <span className="navbar-item-title">{userDetails.user.lastname }</span>
                            </NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <NavLink exact  to="/auth/login" activeClassName="active" tag={RRNavLink} >
                                <div>
                                    <FaRegUserCircle color="#000" size="1.5em"/>
                                </div>
                                <span className="navbar-item-title">Connection</span>
                            </NavLink>
                        </NavItem>}
                    {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <div>
                            <FaRegUserCircle color="#000" size="1.5em"/>
                        </div>
                        <Link exact  to="/auth/login">Connection</Link>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link exact  to="/mesAnnonces">Mes annonces</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link exact  to="/profile">Profile</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link exact  to="/signout">Logout</Link>
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
                </Collapse>
            </Navbar>
            <MenuDrawer/>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        isAuthenticated : state.userDetailReducer.isAuthenticated

    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        logout : () => dispatch({type: LOGOUT_USER}),
        getUserDetail : user => dispatch({type: GET_USERDETAIL, action: user}),

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);