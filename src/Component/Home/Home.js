import React , { Component } from 'react';
import prd1 from '../../Assets/images/announces/prd1.jpg';
import prd2 from '../../Assets/images/announces/prd2.jpg';
import prd3 from '../../Assets/images/announces/prd3.jpg';
import prd4 from '../../Assets/images/announces/prd4.jpg';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';





class Home extends Component {

    constructor(props) {
        super(props);
        this.state= {
            regions: [],
            categories: [],
            search_text: '',
            categorie: '',
            region: ''
        }
        this.goCategories = this.goCategories.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
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
    goCategories () {
        var params = '';
        params += '?title=' + this.state.search_text;
        params += '&categorie=' + this.state.categorie;
        params += '&location=' + this.state.region;
        this.props.history.push('/categories' + params);
    }
    
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    render() {
        return(
            <div className="body_container">
                <section className="sec_search_home">
                    <div className="filter-homepage">
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col xs={9}>
                        <div className="form_frame">
                            <div className="home-filter">
                                <strong>Donner leur une seconde vie!</strong>
                                <FormGroup>
                                    <Input type="text" name="title" id="title" placeholder="Que recherchez-vous ?"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input 
                                        type="select"
                                        id="categorie" 
                                        name="categorie"                                        
                                        onChange= {this.handleChange}
                                        placeholder="Categorie">
                                         <option hidden>Categories</option>
                                            {this.state.categories && this.state.categories.map(categorie => {
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
                                        onChange= {this.handleChange}
                                        placeholder="Categorie">
                                         <option hidden>Localisation</option>
                                            {this.state.regions && this.state.regions.map(region => {
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
                    
                            {/* <form>
                                <div className="form_frame_inner">
                                    <div className="form-row">
                                    <div className="form-group col-md-4 col-lg-5">
                                        <input 
                                            type="text"
                                            name="search_text"
                                            className="form-control" 
                                            onChange= {this.handleChange}
                                            id="inputCity" 
                                            placeholder="Que recherchez-vous ?" />
                                    </div>
                                    <div className="form-group col-md-3 col-lg-3">
                                        <select 
                                            id="inputState"
                                            name="categorie"                                        
                                            onChange= {this.handleChange}
                                            className="form-control">
                                        <option hidden>Categories</option>
                                        {this.state.categories && this.state.categories.map(categorie => {
                                            return(
                                                <option value={categorie.id}>{categorie.name}</option>
                                            )
                                        })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 col-lg-3">
                                        <select 
                                            id="inputState"
                                            name="region"
                                            onChange= {this.handleChange}
                                            className="form-control">
                                        <option hidden>Localisation</option>
                                        {this.state.regions && this.state.regions.map(region => {
                                            return(
                                                <option value={region.code}>{region.name}</option>
                                            )
                                        })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2 col-lg-1">
                                        <button onClick={this.goCategories} className="btn">GO
                                        
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </form> */}
                        </div>
                        </Col>		
                    </Row>
                    </div>
                    <div className="container">
                    
                    </div>
                </section>
                <section className="sec_category sec_pad_50  pb-0 d-none d-md-block d-lg-block d-xl-block">
                    <Container>
                        <Row>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="vetements" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Vetements/chaussures</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="transport" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Poussettes/sieges</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="mobilier" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Ameublement</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="juex" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Jeux/eveil</a>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="puericulter" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Soins/toillette</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="dvd" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Livres/DVD</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="services" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Services</a>
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div  className="category_box">
                                    <div id="offers" className="bg_div">
                                    </div>
                                </div>
                            
                                <div className="categorie_title">
                                    <a href="#" >Offres d'emploi</a>
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

export default Home;