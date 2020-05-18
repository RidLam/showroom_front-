import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { GET_REGION } from '../Commons/reducers/region/RegionActions';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';
import ApiClient from '../Api/ApiClient';
import * as homeReducer from './HomeReducer';


var client = new ApiClient();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state= {
            regions: [],
            categories: [],
            title: '',
            categorie: '',
            region: ''
        }
        this.goCategories = this.goCategories.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    UNSAFE_componentWillMount() {
       this.props.getAllCategories();
       this.props.getAllRegions();
       
    }
    goCategories () {
        var params = '';
        if(this.state.title) {
            if(params == '') {
                params += '?title=' + this.state.title;
            }else {
                params += '&title=' + this.state.title;
            }
        }
        if(this.state.categorie) {
            if(params == '') {
                params += '?categorie=' + this.state.categorie;
            }else {
                params += '&categorie=' + this.state.categorie;
            }
        }
        if(this.state.region) {
            if(params == '') {
                params += '?region=' + this.state.region;
            }else {
                params += '&region=' + this.state.region;
            }
        }
        
        this.props.history.push('/annonces/search' + params);
    }
    
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    render() {
        var { categories , regions} = this.props;
        return(
            <div className="home_page_container">
                <section className="sec_search_home">
                    <div className="filter-homepage">
                    
                        <div className="form_frame">
                            <div className="home-filter">
                                <strong>Donner leur une seconde vie!</strong>
                                <FormGroup>
                                    <Input type="text" onChange= {this.handleChange} name="title" id="title" placeholder="Que recherchez-vous ?"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input 
                                        type="select"
                                        id="categorie" 
                                        name="categorie"                                        
                                        onChange= {this.handleChange}
                                        onFocus= {() =>this.props.getAllCategories()}   
                                        placeholder="Categorie">
                                         <option hidden>Categories</option>
                                            {categories && categories.map(categorie => {
                                                return(
                                                    <option value={categorie.id}>{categorie.name}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input 
                                        type="select" 
                                        name="region" 
                                        id="region" 
                                        name="region" 
                                        onFocus= {() =>this.props.getAllRegions()}                                      
                                        onChange= {this.handleChange}
                                        placeholder="Categorie">
                                         <option hidden>Localisation</option>
                                            {regions && regions.map(region => {
                                                return(
                                                    <option value={region.code}>{region.name}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup>
                                <div className="home-filter-btn">
                                    <Button onClick={this.goCategories} className="primary">Lancer la recherhche</Button>
                                </div>
                                </div>
                    
                            
                        </div>
                    </div>
                    <div className="container">
                    
                    </div>
                </section>
                <section className="sec_category sec_pad_50  pb-0 d-none d-md-block d-lg-block d-xl-block">
                    <Container>
                        <Row>
                            <Col md='3'>
                                <div  className="category_box">
                                    <div id="vetements" className="bg_div">
                                        <div className="categorie-title">
                                            <a href="#"> Vetements/chaussures</a>
                                        </div>
                                    </div>
                                </div>
                            
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="transport" className="bg_div">
                                        <div className="categorie-title">
                                            <a href="#">Poussettes/sieges</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="mobilier" className="bg_div">
                                        <div className="categorie-title">
                                            <a href="#">Ameublement</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="juex" className="bg_div">
                                        
                                        <div className="categorie-title">
                                            <a href="#">Jeux/eveil</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="puericulter" className="bg_div">
                                        <div className="categorie-title">
                                            <a href="#">Soins/toillette</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="dvd" className="bg_div">
                                       
                                        <div className="categorie-title">
                                            <a href="#"> Livres/DVD</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="services" className="bg_div">
                                        
                                        <div className="categorie-title">
                                            <a href="#">Services</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="offers" className="bg_div">
                                        
                                        <div className="categorie-title">
                                            <a href="#">Offres d'emploi</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="sec_announces sec_pad_50 d-none d-md-block d-lg-block d-xl-block">
                    <div className="container">
                        <div className="row">
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = function(state) {
    return {
        categories : state.homeReducer.categories,
        regions : state.homeReducer.regions,
        userDetails : state.userDetailReducer.userDetails
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        getAllCategories: () => dispatch({type: 'API_CALL', payload : homeReducer.getCategories()}),
        getAllRegions: () => dispatch({type: 'API_CALL', payload : homeReducer.getRegions()}),
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);