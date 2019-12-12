import React , { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, FormText } from 'reactstrap';
import MapPolygon from '../../maps/MapPolygon';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
import axios from 'axios';

import ImagesUpload from './ImagesUpload';
import '../../Assets/Css/upload.images.css';
import map from '../../Assets/images/map.png';
import './Annonce.css';
import { MdMyLocation } from "react-icons/md";



class NewAnnonce extends Component {

    constructor(props) {
        super(props);
         this.state = { 
             communes : [],
             commune : '',
             lat: '',
             lng:'',
             title: '',
             categories: '',
             description: '',
             price: '',
             adresse : '',
             commune_id:'',
             images: [],
             shape : [],
             region_id: '',
             categorie_id:'',
             annonceCreated: false,
             departement_id: '',
            };
         this.handleLocationChange = this.handleLocationChange.bind(this);
         this.handleInputChange = this.handleInputChange.bind(this);
         this.chosenCommune = this.chosenCommune.bind(this);
         this.getPolygon = this.getPolygon.bind(this);
         this.handleFileChange = this.handleFileChange.bind(this);
         this.addAnnonce = this.addAnnonce.bind(this);
         this.getLocation = this.getLocation.bind(this);
    }

  
    handleInputChange(event) {
        var name = event.target.name;
        var data = event.target.value;
        this.setState({[name]: data})
        console.log(this.state);
    }

    addAnnonce() {
        var {title, description, price, commune_id, categorie_id, adresse, images, departement_id, region_id} = this.state;
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('adresse', adresse);
        data.append('user_id', 1);
        data.append('type_annonce', '');
        data.append('commune_id', commune_id);
        data.append('categorie_id', categorie_id);
        data.append('departement_id', departement_id);
        data.append('region_id', region_id);

        for(var i = 0 ; i < images.length; i++) {
            data.append('files', images[i]);
        }
        
        
        axios.post(`http://localhost:3000/annonces/add`, data)
            .then(res => {
                this.setState({
                    annonceCreated : res.data 
                    });
            }).catch(error => {
                console.error(error);
            })
    }
   
    chosenCommune(commune) {
        var com = commune.name +','+ commune.code;
        var latlong = JSON.parse(commune.geo_point);
        var geoshape = this.getPolygon(commune.geo_polygon);
        this.setState({
            commune: com,
            lat: latlong[0],
            lng: latlong[1] ,
            shape : geoshape,
            communes : [],
            commune_id : commune.id,
            departement_id : commune.code_departement,
        })
        axios.get(`http://localhost:3000/departements/getById`, {params: {id: commune.code_departement}})
            .then(res => {
                console.log(res.data);
                this.setState({
                    region_id : res.data[0].code_region
                    });
            }).catch(error => {
                console.error(error);
            })
        
      }
      getPolygon(polygonArray){
        var geoShape = [];
        //var jsonData = JSON.parse(polygonArray);
        var data = polygonArray[0];
        for(var i =0; i< data.length;i++) {
            var item = data[i];
            var obj = {};
            obj['lat'] = item[1];
            obj['lng'] = item[0];
            geoShape.push(obj)
            
        }
        return geoShape;
      }

    handleFileChange(files) {
        
        this.setState({ images: this.state.images.concat(files[0])})

          console.log(this.state.images);
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

    componentDidMount() {
        axios.get(`http://localhost:3000/categories/getAll`)
        .then(res => {
            this.setState({
                categories : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
    }
    getLocation() {
        navigator.geolocation.watchPosition(position => {
            var coords = {lat: position.coords.latitude, long: position.coords.longitude};
            axios.get(`http://localhost:3000/communes/getByCode`, {params: coords})
            .then(res => {
                var data = res.data[0];
                var geoshape = this.getPolygon(data.contour.coordinates);
                this.setState({
                    commune: data.nom + " , " + data.codesPostaux[0],
                    lat: coords.lat,
                    lng: coords.long ,
                    shape : geoshape,
                    commune_id : data.code,
                    departement_id : data.codeDepartement, 
                    });
            }).catch(error => {
                console.error(error);
            })
        })
    }
    

    render() {
        const mapView = () =>{
         return (
            <div className="map-view">
                <img src={map}/>
            </div>
        )
         }
        

        return(
            <Container className="">
                <Row className="title_block">
                    <div className="add_annonce_title">
                        
                    </div>
                </Row>
                <Row className="add_annonce_block">
                    <Col xs="12">
                    <Card>
                        <CardHeader>Votre annonce</CardHeader>
                        <CardBody>
                            <Col xs={9}>
                            
                        <CardTitle></CardTitle>
                            <Form>
                            <FormGroup row>
                                <Col sm={7}>
                                <Input type="text" onChange={this.handleInputChange} name="title" id="title_id" placeholder="Titre de l'annonce" />
                                </Col>
                            </FormGroup>
                           
                            <FormGroup row>
                                <Col sm={7}>
                                <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                    <option hidden>Categorie</option>
                                    {this.state.categories && this.state.categories.map(item => {
                                        return ( <option value={item.id}>{item.name}</option>)
                                    })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={7}>
                                <Input type="textarea" onChange={this.handleInputChange} name="description" id="exampleText" placeholder="Description" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={4}>
                                <Input type="number" onChange={this.handleInputChange} name="price" id="prix" placeholder="Prix" />
                                </Col>
                            </FormGroup>
                           
                            </Form>
                            </Col>
                        </CardBody>
                    </Card>
                    
                    </Col>
                  
                    </Row>
                <Row className="add_annonce_block">
                    <Col xs="12">
                        <Card>
                            <CardHeader>Localisation</CardHeader>
                            <CardBody>
                            <CardTitle></CardTitle>
                            <Row>
                                <Col xs="6">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <Button onClick={() => this.getLocation()}><MdMyLocation color="" size="1.2em"/></Button>
                                        </InputGroupAddon>
                                        <Input type="text" 
                                                    value={this.state.commune}
                                                    onChange={this.handleLocationChange} name="commune" id="title_id" placeholder="Ville ou code postal" autoComplete="off" />
                                    </InputGroup>
                                    <div className="commune-list">
                                        {this.state.communes && this.state.communes.map(item => {
                                            return(
                                                <li className="" onClick={() => this.chosenCommune(item)}>{item.name}, {item.code}</li>
                                            )
                                        })}
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="map">
                                        <div className="map_container">
                                            {this.state.shape != ''?
                                            <MapPolygon 
                                                shape= {this.state.shape}
                                                height="300px"
                                                width="500px"
                                                />
                                                :
                                                mapView()
                                            }
                                        </div>
                                        </div>
                                </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="add_annonce_block">
                    <Col xs="12">
                        <Card>
                            <CardHeader>Vos photos</CardHeader>
                            <CardBody>
                            <CardTitle></CardTitle>
                            
                                <ImagesUpload
                                    getFiles= {this.handleFileChange}
                                    />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="add_annonce_block">
                    <Col className="text-right botton_block">
                        <Button className="btn_send" onClick={() => this.addAnnonce()}>Envoyer</Button>
                    </Col>
                    
                </Row>
                
            </Container>
        )
    }
}

export default NewAnnonce;