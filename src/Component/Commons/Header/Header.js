import React , {Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../Assets/images/logo.png';
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
import { FaRegHeart, FaPlusSquare, FaSearch, FaRegUserCircle, FaRegPlusSquare, FaUserEdit } from "react-icons/fa";
import { AiOutlineLogout } from 'react-icons/ai';
import { LOGOUT_USER } from '../../Commons/reducers/userDetail/UserDetailActions';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        }
        this.setIsOpen = this.setIsOpen.bind(this);
    }
    setIsOpen() {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }


    render() {
        var {location, userDetails} = this.props;
        return(
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
                            Déposer une annonce
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact  to="/favoris" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaRegHeart color="#000" size="1.5em"/>
                            </div>
                            Favoris
                        </NavLink>
                    </NavItem>

                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact  to="/myAnnonces" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaUserEdit color="#000" size="1.5em"/>
                            </div>
                            Mes annonces
                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact  to="/profile" activeClassName="active" tag={RRNavLink} >
                            <div>
                                <FaUserEdit color="#000" size="1.5em"/>
                            </div>
                            Mon profile
                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success &&
                    <NavItem>
                        <NavLink exact onClick={this.props.logout}  activeClassName="active" >
                            <div>
                                <AiOutlineLogout color="#000" size="1.5em"/>
                            </div>
                            Déconnection
                        </NavLink>
                    </NavItem>
                    }
                    {userDetails.success ?
                        <NavItem>
                            <NavLink>
                                <div>
                                    <FaRegUserCircle color="#000" size="1.5em"/>
                                </div>
                                 {userDetails.userDetails.lastname }
                            </NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <NavLink exact  to="/auth/login" activeClassName="active" tag={RRNavLink} >
                                <div>
                                    <FaRegUserCircle color="#000" size="1.5em"/>
                                </div>
                                Connection
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
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        logout : () => dispatch({type: LOGOUT_USER})
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);