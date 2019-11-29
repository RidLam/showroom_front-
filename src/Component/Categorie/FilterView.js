import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './categorie-filter.css'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';



 
class  FilterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: true,
            price: 0
        };
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.setState({isToggle: !this.state.isToggle});
      }
      
    render() {
        return (
            <div className ="filter">
            
                <div className="filter-title">
                    Filter & categorie
                    <span className="sort-down"><FontAwesomeIcon icon="sliders-h"/></span>
                </div>
                <div className="categorie-list">
                    <div className="categorie-filter"><p onClick={() => this.handleClick()}>Categories
                        <span  className="sort-down">
                        <FontAwesomeIcon
                            icon={this.state.isToggle ? "sort-up" : "sort-down"}
                        /></span>
                        </p>
                    </div>
                    <div className="categorie-filter-list" style= {{display: this.state.isToggle ? "block" : "none"}}>
                        <li>Service <span className="result-number">(435)</span></li>
                        <li>Vêtements et Chaussures <span className="result-number">(435)</span></li>
                        <li>Soins et toilette <span className="result-number">(435)</span></li>
                        <li>Evil &amp; jeux <span className="result-number">(435)</span></li>
                        <li>Siège &amp; poussettes <span className="result-number">(435)</span></li>
                        <li>Ameublement <span className="result-number">(435)</span></li>
                        <li>Offre d'emploi <span className="result-number">(435)</span></li>
                    </div>
                </div>
                <div className="categorie-price">
                    <div className="categorie-filter"><p onClick={() => this.handleClick()}>Price
                        <span  className="sort-down">
                        <FontAwesomeIcon
                            icon="sort-down"
                        /></span>
                        </p>
                    </div>
                    <div className="categorie-filter-price" style= {{display: this.state.isToggle ? "block" : "none"}}>
                            <p>Price : {this.state.price}</p>
                            <InputRange
                                maxValue={2000}
                                minValue={0}
                                step= {10}
                                aria-controls= "both"
                                draggableTrack={true}
                                allowSameValues={true}
                                value={this.state.price}
                                onChange={value => this.setState({ price: value })} />
                            
                    
                    </div>
                </div>
                <div className="categorie-location">
                    <div className="categorie-filter"><p onClick={() => this.handleClick()}>Location
                        <span  className="sort-down">
                        <FontAwesomeIcon
                            icon="sort-down"
                        /></span>
                        </p>
                    </div>
                </div>
                <div className="filter-location-input">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <Button><FontAwesomeIcon icon="search-location" color="blue" /></Button>
                        </InputGroupAddon>
                        <Input />
                    </InputGroup>
                </div>
                
            </div>
            
        );
    }
}


export default FilterView;
