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
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';
import AnnonceDetail from '../Annonce/AnnonceDetail';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import noImage from '../../Assets/images/no-image.png';
import categorie from '../../Assets/images/categorie-vetement.jpg';
import SearchForm from './SearchForm';

const queryString = require('query-string');
const moment = require('moment');
moment.locale('fr');


class Categorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            isFavorite: false,
            regions: [],
            categories: [],
            favorite: []
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
        var myFavorite = localStorage.getItem('myFavorite');
        var favoriteArr = [];
        if(myFavorite) {
            myFavorite = JSON.parse(myFavorite);
            for(var fav in myFavorite) {
                favoriteArr.push(myFavorite[fav].id);
            }
            this.setState({
                favorite: favoriteArr
            })
        }

    }
    
    annonceDetail(annonce) {
        console.log("clicked");
      
            this.props.history.push({
                pathname: '/annonce/' + annonce.id,
                state: { myAnnonce: annonce }
              })

    }
    handleFavorite(annonce, type) {
        var myFavorite = {};
        var newFavorite = [];
        if(type == 'add') {
            var myFavorite = localStorage.getItem('myFavorite');
            myFavorite = JSON.parse(myFavorite);
            if(myFavorite == undefined){
                myFavorite = {};
                myFavorite[annonce.id] = annonce;
            }else{
                myFavorite[annonce.id] = annonce;
                for(var fav in myFavorite) {
                    newFavorite.push(myFavorite[fav].id);
                }
            }
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite));
        }else {
            var myFavorite = localStorage.getItem('myFavorite');
            myFavorite = JSON.parse(myFavorite);
            delete myFavorite[annonce.id];
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite));
            for(var fav in myFavorite) {
                newFavorite.push(myFavorite[fav].id);
            }
        }
        
        this.setState({
            favorite : newFavorite
        })
    }
    filterValue(value) {
        console.log(value);
    }

    render() {
        const base_urrl = "http://localhost:3000";
        return(
            <div className="body_container">
                <Row>
                    <div className="categorie-slide">
                        <div className="categorie-slide-title">
                            <span>
                                <strong>Vetements & chaussures</strong>
                                <p>Il y a actuellement <span>2745</span> en ligne.</p>
                            </span>
                        </div>
                    </div>
                </Row>
                <SearchForm
                    getFilterValue={this.filterValue}
                    regions= {this.state.regions}
                />
             <div className="container">
                <Row>
                    <Col xs={8}>
                    
                    <div className="tab-pane" id="tab6">
                        <div className="sch-product-list">

                            {this.state.annonces.length > 0 && this.state.annonces.map(annonce =>{
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
                                                                   {this.state.favorite.indexOf(annonce.id) >= 0 ?
                                                                     <FaHeart onClick={() =>this.handleFavorite(annonce, 'delete')} size="1.1em"/> :  <FaRegHeart onClick={() =>this.handleFavorite(annonce, 'add')} size="1.2em"/> 
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
                                                                {/* {annonce.commune.name} | {annonce.commune.code} */}
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




export default  Categorie;