import React , {Component } from 'react';
import profile from '../../../Assets/images/profile.png';
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
import { Link } from 'react-router-dom';
import './Header.css';
import { faPlusSquare, faHeart, faGratipay } from '@fortawesome/free-solid-svg-icons'
import { FaRegHeart, FaPlusSquare, FaSearch, FaRegUserCircle } from "react-icons/fa";



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
        return(
            <Navbar color="light" light expand="md" fixed>
                <Link className="navbar-brand" exact  to="/">
                    <img src={logo}/>
                </Link>
                <NavbarToggler onClick={this.setIsOpen} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto justify-content-end" navbar>
                <NavItem>
                    <Link exact  to="/newAnnonce">
                        <NavLink>
                            <div>
                                <FaPlusSquare size="1.5em"/>
                            </div>
                            Déposer une annonce
                        </NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                        <Link exact  to="/newAnnonce">
                            <NavLink>
                                <div>
                                    <FaSearch size="1.5em"/>
                                </div>
                                Recherche
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link exact  to="/newAnnonce">
                            <NavLink>
                                <div>
                                    <FaRegHeart size="1.5em"/>
                                </div>
                            Favorite
                        </NavLink>
                        </Link>
                        
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <div>
                            <FaRegUserCircle size="1.5em"/>
                        </div>
                        Connect
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
                    </UncontrolledDropdown>
                </Nav>
                </Collapse>
            </Navbar>
        )
    }
}


export default Header;