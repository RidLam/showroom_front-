import React, { Component } from 'react';
import './Categorie.css';
import paca from '../../Assets/images/paca.png';
import pays_de_la_loire from '../../Assets/images/pays-de-la-loire.png';
import corse from '../../Assets/images/corse.png';
import outre_mer from '../../Assets/images/outre-mer.png';
import bretagne from '../../Assets/images/bretagne.png';
import FilterView from './FilterView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AnnonceDetail from '../Annonce/AnnonceDetail';
const queryString = require('query-string');
const moment = require('moment');
moment.locale('fr');


class Categorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: []
        }
        this.annonceDetail = this.annonceDetail.bind(this);
    }

    componentDidMount() {
        var query = queryString.parse(location.search);
        var param = {};
        for(var par in query) {
            if(query[par] != '') {
                param[par] = query[par];
            }
        }
        
        axios.get(`http://localhost:3000/annones`, {params: param})
        .then(res => {
            this.setState({
                annonces : res.data 
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
    render() {
        const base_urrl = "http://localhost:3000";
        return(
             <div className="container">
                <Row>
                    <Col xs={9}>
                    
                    <div className="tab-pane" id="tab6">
                    <div className="sch-product-list">

                            {this.state.annonces && this.state.annonces.map(annonce =>{
                                return(
                                    <div className="list-annonce">
                                        <div className="sch-product-item">
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="sch-product-images">
                                                        <img className="sch-img-1" src={annonce.images[0] ?
                                                            base_urrl + annonce.images[0].path : null} />
                                                        {/* <img className="sch-img-2" src={bretagne} /> */}
                                                        <div className="sch-product-new-label">
                                                            <span>
                                                            {annonce.images.length} <FontAwesomeIcon icon="image"/> 
                                                            </span>
                                                        </div>
                                                
                                                    </div>
                                                </Col>
                                                <Col xs={9}>
                                                <div className="sch-product-info">
                                                        <Row>
                                                            <Col xs={9}>
                                                                <div className="sch-title">
                                                                  <a onClick={() => this.annonceDetail(annonce)}>{annonce.title}</a> 
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div className="sch-price">
                                                                    {annonce.price}€
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="sch-name-description">
                                                            <Row>
                                                            <h3 className="sch-name"><a href="#"><FontAwesomeIcon icon="map-marker-alt"/>{annonce.commune.name} | {annonce.commune.code}</a></h3>
                                                            </Row>
                                                            <Row>
                                                                <div className="sch-description">
                                                                    {annonce.categorie.name} 
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={6}>
                                                                    <div className="sch-description">
                                                                        {moment(annonce.createdAt).format('l')}
                                                                    </div>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <div className="sch-description">
                                                                        <div className="sch-social"> 
                                                                            <a href="#" data-tooltip="Search"><FontAwesomeIcon icon="heart" color="#bb225a" mask={['far', 'circle']} size="lg"/></a>
                                                                            <a href="#" data-tooltip="Heart"><FontAwesomeIcon icon="share-alt-square" color="#bb225a" size="lg"/></a>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            
                                                        </div>
                                                        {/* <div className="sch-social"> 
                                                            <a href="#" data-tooltip="Search"><FontAwesomeIcon icon="heart" color="blue"/></a>
                                                            <a href="#" data-tooltip="Heart"><FontAwesomeIcon icon="share-alt-square" color="blue"/></a>
                                                        </div> */}
                                                    
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
                
        )
    }
}




export default  Categorie;