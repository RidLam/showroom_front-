import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { GET_REGION } from '../Commons/reducers/region/RegionActions';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';




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
        var { categories , regions} = this.props;
        return(
            <div className="body_container">
                <section className="sec_search_home">
                    <div className="filter-homepage">
                    
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
                                        onFocus= {() =>this.props.getCategories()}   
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
                                        onFocus= {() =>this.props.getRegionAll()}                                      
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
const mapStateToProps = function(state) {
    return {
        categories : state.categorieReducer.categories,
        regions : state.regionReducer.regions,
        userDetails : state.userDetailReducer.userDetails
    }
  }
const mapDispatchToProps = function(dispatch) {
    console.log(GET_CATEGORIE);
    return {
        getCategorie: dispatch({type: GET_CATEGORIE}),
        getRegions: dispatch({type: GET_REGION})
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);