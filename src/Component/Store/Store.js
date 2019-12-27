import React, { Component } from 'react';
import './store.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import noImage from '../../Assets/images/no-image.png';
import profile_pic from '../../Assets/images/profile/pf1.jpg';

const queryString = require('query-string');
const moment = require('moment');
moment.locale('fr');


class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            isFavorite: false,
            regions: [],
            categories: [],
        }
        this.annonceDetail = this.annonceDetail.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.filterValue = this.filterValue.bind(this);
    }

    componentDidMount() {
        var query = queryString.parse(location.search);
        var param = {};
        for(var par in query) {
            if(query[par] != '') {
                param[par] = query[par];
            }
        }
        
        axios.get(`http://localhost:3000/annonces/getAll`, {params: param})
        .then(res => {
            this.setState({
                annonces : res.data 
                });
        }).catch(error => {
            console.error(error);
        });
        axios.get(`http://localhost:3000/regions/getAll`)
        .then(res => {
            this.setState({
                regions : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
        axios.get(`http://localhost:3000/categories/getAll`)
        .then(res => {
            this.setState({
                categories : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
    }
    
    annonceDetail(annonce) {
        console.log("clicked");
      
            this.props.history.push({
                pathname: '/annonce/' + annonce.id,
                state: { myAnnonce: annonce }
              })

    }
    handleFavorite() {
        this.setState({
            isFavorite : !this.state.isFavorite
        })
    }
    filterValue(value) {
        console.log(value);
    }

    render() {
        const base_urrl = "http://localhost:3000";
        return(
            <div className="body_container">
                <div className="store-slide">
                    <div className="store-slide-profile">
                        <div className="profile_avatar">
                            <img src={profile_pic}></img>
                        </div>
                        <div className="profile_avatar">
                            <h4>Username</h4>
                        </div>
                    </div>
                </div>
             <div className="container">
                <Row>
                    <Col xs={8}>
                    
                    <div className="tab-pane" id="tab6">
                        <div className="sch-product-list">

                            {this.state.annonces && this.state.annonces.map(annonce =>{
                                return(
                                    <div className="list-annonce">
                                        <div className="sch-product-item">
                                            <Row>
                                                <Col xs={4}>
                                                        {annonce.images.length ?
                                                          <div className="sch-product-images">
                                                              <img className="sch-img-1" src={base_urrl + annonce.images[0].path} />
                                                                <div className="sch-product-new-label">
                                                                <span>
                                                                {annonce.images.length} <FontAwesomeIcon icon="image"/> 
                                                                </span>
                                                                </div>
                                                          </div>
                                                        :
                                                        <div className="sch-product-images">
                                                            <img className="sch-img-1" src={noImage} />
                                                        </div>  
                                                        }
                                                </Col>
                                                <Col xs={8}>
                                                <div className="sch-product-info">
                                                        <Row>
                                                            <Col xs={9}>
                                                                <div className="sch-title">
                                                                  <a onClick={() => this.annonceDetail(annonce)}>{annonce.title}</a> 
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div className="sch-favorite">
                                                                   {this.state.isFavorite ?
                                                                     <FaHeart onClick={() =>this.handleFavorite()} size="1.1em"/> :  <FaRegHeart onClick={() =>this.handleFavorite()} size="1.2em"/> 
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="sch-price">
                                                            {annonce.price} €
                                                        </div>
                                                        <div className="sch-name-description">
                                                            <Row>
                                                            <span>
                                                            {annonce.commune.commune_name} | {annonce.commune.postale_code}
                                                            </span>
                                                            </Row>
                                                            <Row>
                                                                <div className="sch-description">
                                                                    {annonce.categorie.name} 
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div className="sch-description">
                                                                    {moment(annonce.createdAt).format('l')} à {moment(annonce.createdAt).format('LT')}
                                                                </div>
                                                            </Row>
                                                        </div>
                                                    
                                                    </div>
                                                </Col>
                                            </Row>
                                        
                                        
                                        </div>
                                    </div>
                                )
                            })}
                            
                        
                    </div>
                </div>
                    </Col>
                    <Col xs={3}>
                        <p>test</p>
                    </Col>
                </Row>
                
            </div>
            </div>    
        )
    }
}




export default  Store;