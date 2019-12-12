import React, { Component } from 'react';
import  {Row, Col, InputGroup, InputGroupAddon, Button, Input, FormGroup, Label, InputGroupText  } from 'reactstrap';
import axios from 'axios';
import './searchForm.css';



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
        this.props.getFilterValue(value);
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
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
            displayAdvancedSearch : !this.state.displayAdvancedSearch
        })
    }
    handleAdvancedSearch(event) {
        var checked = event.target.checked;
        this.setState({
            displayAdvancedSearch : checked
        })
    }
    componentDidMount() {
        // axios.get(`http://localhost:3000/regions`)
        // .then(res => {
        //     this.setState({
        //         regions : res.data 
        //         });
        // }).catch(error => {
        //     console.error(error);
        // })
        axios.get(`http://localhost:3000/categories/getAll`)
        .then(res => {
            this.setState({
                categories : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
    }
    handleRegionChange(event) {
        var region = event.target.value;
        if(region != null) {
            axios.get(`http://localhost:3000/departements/getById`, {params: {id: region}})
            .then(res => {
                this.setState({
                    departements : res.data 
                    });
            }).catch(error => {
                console.error(error);
            })
        }
    }

    render() {
        var { regions } = this.props;
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
                            <option hidden>Categories</option>
                                {this.state.categories && this.state.categories.map(categorie => {
                                    return(
                                        <option value={categorie.id}>{categorie.name}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                   </Col>
                   <Col xs={2} className="search-btn">
                        <Button onClick={() => this.search(this.state.filter)}>Lancere la recherche</Button>
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
                                        <option hidden>Select region</option>
                                            {regions && regions.map(region => {
                                                return(
                                                    <option value={region.code}>{region.name}</option>
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
                                        <option hidden>Select departement</option>
                                            {this.state.departements && this.state.departements.map(item => {
                                                return(
                                                    <option value={item.code}>{item.name}</option>
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
                                        <option hidden>Trier par :</option>
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


export default SearchForm;