import React, { Component } from 'react';
import  {Row, Col, InputGroup, InputGroupAddon, Button, Input, FormGroup, Label, InputGroupText  } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import './searchForm.css';
import { GET_REGION } from '../Commons/reducers/region/RegionActions';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';
import { GET_DEPARTEMENT_BY_ID } from '../Commons/reducers/depertement/DepartementActions';
import { SEARCH_ANNONCE } from '../Commons/reducers/annonce/MyAnnonceActions';




class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAdvancedSearch : false,
            regions: [],
            categories: [],
            departements: [],
            title: '',
            categorie: '',
            region:'',
            departement:'',
            minPrice:'',
            maxPrice: '',
            sortby:'',
            filter: {}
            
        }
        this.handleAdvancedSearch = this.handleAdvancedSearch.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search(value){
        var params = '';
        if(value.title) {
            if(params == '') {
                params += '?title=' + value.title;
            }else {
                params += '&title=' + value.title;
            }
        }
        if(value.categorie && value.categorie.id) {
            if(params == '') {
                params += '?categorie=' + value.categorie.id;
            }else {
                params += '&categorie=' + value.categorie.id;
            }
        }
        if(value.departement) {
            if(params == '') {
                params += '?departement=' + value.departement;
            }else {
                params += '&departement=' + value.departement;
            }
        }
        if(value.minPrice) {
            if(params == '') {
                params += '?minPrice=' + value.minPrice;
            }else {
                params += '&minPrice=' + value.minPrice;
            }
        }
        if(value.maxPrice) {
            if(params == '') {
                params += '?maxPrice=' + value.maxPrice;
            }else {
                params += '&maxPrice=' + value.maxPrice;
            }
        }
        if(value.sortby) {
            if(params == '') {
                params += '?sortby=' + value.sortby;
            }else {
                params += '&sortby=' + value.sortby;
            }
        }
        this.props.history.push('/annonces/search' + params);
        this.props.getFilterValue(value);
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        if(name == "categorie") {
            value = this.props.categories[value - 1];
        }
        this.setState({
            [name]: value,
            filter: {
                ...this.state.filter,
                [name]: value
            }
        })
    }
   
    advancedSearch() {
        this.setState({
            displayAdvancedSearch : !displayAdvancedSearch
        })
    }
    handleAdvancedSearch(event) {
        var checked = event.target.checked;
        this.setState({
            displayAdvancedSearch : checked
        })
    }
    
    handleRegionChange(event) {
        var region_id = event.target.value;
        this.props.getDepartementById(region_id);
    }

    render() {
        var { regions , categories, departements} = this.props;
        var { filter } = this.state;
        return(
           <div className="search-container">
               <Row className="filter-row">
                    <Col xs={1}>
                   </Col>
                    <Col xs={4}>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="title" 
                                onChange={this.handleChange}
                                id="title" 
                                placeholder="Que recherchez-vous ?"/>
                        </FormGroup>
                   </Col>
                   <Col xs={4}>
                   <FormGroup>
                        <Input 
                            type="select"
                            id="categorie" 
                            name="categorie"                                        
                            onChange= {this.handleChange}
                            placeholder="Categorie">
                            <option>Toutes les categories</option>
                                {categories && categories.map((item, index) => {
                                    return(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                   </Col>
                   <Col xs={2} className="search-btn">
                        <Button onClick={() => this.search(filter)}>Lancere la recherche</Button>
                   </Col>
               </Row>
                    <Row className="filter-row">
                        <Col xs={1}>
                        </Col>
                        <Col xs={2}>
                                <FormGroup>
                                    <Input 
                                        type="select"
                                        id="region" 
                                        name="region"                                        
                                        onChange= {this.handleRegionChange}
                                        placeholder="Region">
                                        <option>Toutes region</option>
                                            {regions && regions.map(region => {
                                                return(
                                                    <option key={region.id} value={region.code}>{region.name}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup>
                        </Col>
                        <Col xs={2}>
                                <FormGroup>
                                    <Input 
                                        type="select"
                                        id="departement" 
                                        name="departement"                                        
                                        onChange= {this.handleChange}
                                        placeholder="departement">
                                        <option>Toutes les departement</option>
                                            {departements && departements.map(item => {
                                                return(
                                                    <option key={item.id} value={item.departement_code}>{item.departement_name}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup>
                        </Col>
                        <Col xs={2}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                </InputGroupAddon>
                                <Input 
                                    type="number" 
                                    name="minPrice" 
                                    onChange={this.handleChange}
                                    id="minPrice" 
                                    placeholder="Prix min" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>€</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col xs={2}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    </InputGroupAddon>
                                    <Input 
                                        type="number" 
                                        name="maxPrice" 
                                        onChange={this.handleChange}
                                        id="maxPrice" 
                                        placeholder="Prix max" />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>€</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                        </Col>
                        <Col xs={2}>
                                <FormGroup>
                                    <Input 
                                        type="select" 
                                        name="sortby" 
                                        onChange={this.handleChange}
                                        id="sortby" 
                                        placeholder="Trier par">
                                        <option hidden>Trier par:</option>
                                        <option >Toutes</option>
                                        <option value="price">Prix</option>
                                        <option value="newest">Nouveaux</option>
                                        <option value="bestMatch">Best match</option>
                                    </Input>
                                </FormGroup>
                        </Col>
                    </Row>
                    
           </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        categories : state.categorieReducer.categories,
        regions : state.regionReducer.regions,
        departements: state.departementReducer.departements
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        getCategorie: dispatch({type: GET_CATEGORIE}),
        getRegions: dispatch({type: GET_REGION}),
        getDepartementById: id => dispatch({type: GET_DEPARTEMENT_BY_ID, payload: id}),
        getAnnonces: params => dispatch({type: SEARCH_ANNONCE, payload: params})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);