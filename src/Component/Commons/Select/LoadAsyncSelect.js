import React , { Component , useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
   } from 'reactstrap';
import './select.css';
import axios from 'axios';
import { MdMyLocation, MdKeyboardArrowDown } from "react-icons/md";

class LoadAsyncSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSelect: false,
            splitButtonOpen: false,
            communes: [],
            commune : '',
            lat:'',
            lng:'',
            departement_id: '',
            coords: '',
            commune_id:''
        }
        this.displaySelect = this.displaySelect.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.getSelectedOption = this.getSelectedOption.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);
        this.success = this.success.bind(this);
    }
    displaySelect() {
        this.setState({
            openSelect: !this.state.openSelect
        })
    }
    handleLocationChange(event) {
        var indata ;
        var code_postal = '';
        var commune_name = '';
        if(event.target) {
            indata = event.target.value;
            this.setState({
                commune: event.target.value
            })
        }
        
        if(isNaN(indata)) {
            commune_name = indata;
        }else {
            code_postal = indata;
        }
        var data = {code_postal: code_postal, commune_name: commune_name}
        if(event.target.value != "") {
            
            axios.get(`http://localhost:3000/communes/getById`, {params: {code: code_postal, name: commune_name}})
            .then(res => {
                this.setState({
                    communes : res.data 
                    });
            }).catch(error => {
                console.error(error);
            })

    
        
        }else {
            this.setState({communes:[]})
        }
    }
    getSelectedOption(option) {
        var label = option.nom_complet + '(' + option.code_postal + ')';
        this.setState({commune: label, openSelect: false, communes: []});
        this.props.selectedOption(option);
    }
    success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        var coords = {lat: latitude, lng: longitude};
            axios.get(`http://localhost:3000/communes/getByCode`, {params: coords})
            .then(res => {
                var data = res.data[0];
                this.props.currentLocation(data);
                this.setState({
                    commune: data.nom + " , " + data.codesPostaux[0],
                    lat: coords.lat,
                    lng: coords.long ,
                    coords: coords,
                    commune_id : data.code_INSEE,
                    departement_id : data.codeDepartement, 
                    });
            }).catch(error => {
                console.error(error);
            })
      }
      error() {
        console.log('Unable to retrieve your location');
      }
    getMyLocation() {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }

    render() {
        
        var {openSelect, communes, commune} = this.state;
        return(
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    {/* <Button onClick={() => this.getMyLocation()}><MdMyLocation color="" size="1.2em"/></Button> */}
                    </InputGroupAddon>
                    <Input  
                        placeholder="Ville ou code postal"
                        value={commune}
                        onChange={this.handleLocationChange}
                        onFocus={() => this.displaySelect()}
                        onBlur={() => this.displaySelect()} 
                        />
                    <InputGroupAddon addonType="append">
                    {/* <Button color="success"><MdKeyboardArrowDown color="" size="1.2em"/></Button> */}
                    </InputGroupAddon>
                    {communes.length > 0 &&
                        <div tabIndex={-1} role="menu" aria-hidden="false" className="dropdown-menu show">
                            {communes.map(commune => {
                                return (<li key={commune.id} onClick={() => this.getSelectedOption(commune)}>{commune.nom_complet}({commune.code_postal})</li>)
                                }) 
                            
                            }
                        </div>
                        // :openSelect && !communes.length ?
                        // <div tabIndex={-1} role="menu" aria-hidden="false" className="dropdown-menu show">
                        //     <li>No data to load</li>
                        // </div>
                        // : null
                    }
                </InputGroup>
                   
                </div>
        )
    }
}


export default LoadAsyncSelect;