import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Categorie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import noImage from '../../Assets/images/no-image.png';
import SearchForm from './SearchForm';
import { GET_REGION } from '../Commons/reducers/region/RegionActions';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';
import NoResultFound from '../notFound/NoResultFound';
const queryString = require('query-string');
const moment = require('moment');
moment.locale('fr');


class Categorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            isFavorite: false,
            categorieSlide : 'categorie-vetement.jpg',
            categorieSlideName: 'All catégorie',
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
        this.setState({
            categorieSlide: value.categorie.image_name,
            categorieSlideName: value.categorie.name
        })
    }

    render() {
        const base_urrl = "http://localhost:3000";
        const { categorieSlide, categorieSlideName } = this.state;
        const { regions } = this.props;
        return(
            <div className="body_container">
                    <div className="categorie-slide">
                        <img src={base_urrl + "/images/categorieSlides/" + categorieSlide}></img>
                        <div className="categorie-slide-title">
                            <span>
                                <strong>{categorieSlideName}</strong>
                                <p>Il y a actuellement <span>2745</span> en ligne.</p>
                            </span>
                        </div>
                    </div>
                <SearchForm
                    getFilterValue={this.filterValue}
                    regions= {regions}
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
                            {this.state.annonces.length == 0 && 
                                <NoResultFound/>
                            }
                            
                        
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

const mapStateToProps = function(state) {
    return {
        categories : state.categorieReducer.categories,
        regions : state.regionReducer.regions
    }
  }
const mapDispatchToProps = function(dispatch) {
    console.log(GET_CATEGORIE);
    return {
        getCategorie: dispatch({type: GET_CATEGORIE}),
        getRegions: dispatch({type: GET_REGION})
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categorie);