import React, { Component } from 'react';
import { Row, Col, Button} from 'reactstrap';
import { MdClose, MdMenu } from "react-icons/md";
import { FaRegHeart, FaPlusSquare, FaSearch, FaRegUserCircle, FaRegPlusSquare, FaUserEdit,FaList, FaHome, FaHeart, FaUserCircle, FaLastfmSquare } from "react-icons/fa";
import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import logo from '../../../Assets/images/logo-mobile.png';

import './MenuDrawer.css';
import MobileFilter from '../../Categorie/MobileFilter';


class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer : false,
            showMobileFilter: false,
            showSearchIcon: false
        }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.showSearchIcon) {
            this.setState({
                showSearchIcon: nextProps.showSearchIcon
            })
        }
    }

    toggleDrawer() {
        console.log(this.props.location);

        this.setState({
            showDrawer : !this.state.showDrawer
        })
    }
    toggleFilter() {
        this.setState({
            showMobileFilter : !this.state.showMobileFilter
        })
    }
    getCurrentLOcation() {
        return window.location.pathname == "/annonces/search" ? true : false;
     }
    render() {
        var showSearchIcon = this.getCurrentLOcation()
        return(
            <div className="nav-drawer">
                <div className="menu-header">
                    <Row>
                        <Col xs={2}>
                            <div>
                                {!this.state.showDrawer ?
                                    <MdMenu  color="#000" size="2em" onClick={() => this.toggleDrawer()}/>
                                    :
                                    <MdClose color="#000" size="2em" onClick={() => this.toggleDrawer()}/>

                                }
                                
                            </div>
                        </Col>
                        <Col xs={9}>
                            <div className="menu-drawer-logo">
                                
                            </div>
                        </Col>
                        {/* <Col xs={1}>
                           {showSearchIcon &&
                             <div className="menu-drawer-search">
                                <FiSearch  color="#000" size="1.5em" onClick={() => this.toggleFilter()}/>
                            </div>
                           }
                        </Col> */}
                    </Row>
                </div>
                <div className= {this.state.showDrawer ? 'display-drawer' : 'hide-drawer'}>
                    <div className="menu-items">
                        <ul>
                            <li><a><span className="menu-drawer-icon"> <AiOutlineHome  color="#000" size="1.4em" onClick={() => this.toggleDrawer()}/></span> <a>Accueil</a></a></li>
                            <li><a><span className="menu-drawer-icon"><FaRegPlusSquare  color="#000" size="1.2em" onClick={() => this.toggleDrawer()}/></span> <a>Déposer une annonce</a></a></li>
                            <li><a><span className="menu-drawer-icon"><FaRegHeart  color="#000" size="1.2em" onClick={() => this.toggleDrawer()}/></span> <a> Mes favoris</a></a></li>
                            <li><a><span className="menu-drawer-icon"><FaList  color="#000" size="1em" onClick={() => this.toggleDrawer()}/></span> <a>Mes annonces</a></a></li>
                            <li><a><span className="menu-drawer-icon"><FaRegUserCircle  color="#000" size="1.2em" onClick={() => this.toggleDrawer()}/></span> <a>Profile</a></a></li>
                            <li><a><span className="menu-drawer-icon"><AiOutlineLogin  color="#000" size="1.2em" onClick={() => this.toggleDrawer()}/></span> <a>Se connecter</a></a></li>
                        </ul>
                    </div>
                </div>
                {/* <div className={this.state.showMobileFilter ? 'display-mobile-filter': 'hide-mobile-filter'}>
                    <MobileFilter/>
                </div> */}
            </div>
        )
    }
}

export default MenuDrawer;