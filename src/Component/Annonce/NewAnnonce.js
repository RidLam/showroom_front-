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
import MapCircle from '../../maps/MapCircle';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadAsyncSelect from '../Commons/Select/LoadAsyncSelect';
import { connect } from 'react-redux';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';



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
             coords: '',
             options: [],
             currentCoords: '',
             hideFields : false
            };
         this.handleLocationChange = this.handleLocationChange.bind(this);
         this.handleInputChange = this.handleInputChange.bind(this);
         this.chosenCommune = this.chosenCommune.bind(this);
         this.getPolygon = this.getPolygon.bind(this);
         this.handleFileChange = this.handleFileChange.bind(this);
         this.addAnnonce = this.addAnnonce.bind(this);
         this.getLocation = this.getLocation.bind(this);
         this.success = this.success.bind(this);
         this.getUser = this.getUser.bind(this);

        // this.getUser();
         navigator.geolocation.getCurrentPosition(this.success, this.error);
         //this.props.getCategorie();

    }

  
    handleInputChange(event) {
        var name = event.target.name;
        var data = event.target.value;
        if(name == 'categorie_id') {
            if(data == 1 || data == 7) {
                this.setState({hideFields: true})
            }else {
                this.setState({hideFields: false})
            }
        }
        this.setState({[name]: data})
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
     
    handleLocationChange(selected) {
        console.log(selected);
        var location = JSON.parse(selected.geo_point);
        var coords = {lat: location[0], lng: location[1]};
        this.setState({coords: coords});
    }
    success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        var coords = {lat: latitude, lng: longitude};
        this.setState({
            currentCoords: coords
        })
      }
      error() {
        console.log('Unable to retrieve your location');
      }

    // componentDidMount() {
    //     // navigator.geolocation.getCurrentPosition(this.success, this.error);
    //     // axios.get(`http://localhost:3000/categories/getAll`)
    //     // .then(res => {
    //     //     this.setState({
    //     //         categories : res.data 
    //     //         });
    //     // }).catch(error => {
    //     //     console.error(error);
    //     // })
    // }
    getLocation(myLocation) {
        console.log(myLocation);
        var coords = {lat: myLocation.centre.coordinates[1], lng: myLocation.centre.coordinates[0]};
        this.setState({coords: coords});
    }

    getUser() {
        var uuid = localStorage.getItem('id_session');
        if(uuid) {
          this.props.getUserDetail({uuid});
        }
      }
    

    render() {
        const mapView = () =>{
         return (
            <div className="map-view">
                <img src={map}/>
            </div>
        )
         }
        var { categories } = this.props;
         var {shape, coords,communes, currentCoords, hideFields} = this.state;
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
                            <Row>
                            <Col xs={6}>
                            
                                <CardTitle></CardTitle>
                                <Form>
                                <FormGroup>
                                    <label>Titre de l'annonce :</label>
                                    <Input type="text" onChange={this.handleInputChange} name="title" id="title_id" placeholder="" />
                                </FormGroup>
                            
                                <FormGroup>
                                <label>Categories :</label>
                                    <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                        <option hidden></option>
                                        {categories && categories.map(item => {
                                            return ( <option value={item.id}>{item.name}</option>)
                                        })}
                                        </Input>
                                </FormGroup>
                                <FormGroup>
                                <label>Description :</label>
                                    <Input type="textarea" rows="5" onChange={this.handleInputChange} name="description" id="exampleText" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                <Row>
                                    <Col xs={8}>
                                        <label>Prix :</label>
                                        <Input type="number" onChange={this.handleInputChange} name="price" id="prix" placeholder="" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs={8}>
                                             <label>Téléphone :</label>
                                            <Input type="text"  onChange={this.handleInputChange} name="price" id="prix" placeholder="" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                             Masquer le numéro de téléphone dans l'annonce
                                    </Label>
                                </FormGroup>
                            
                                </Form>
                                </Col>
                                <Col xs={6} style={{display: hideFields ? 'none' : 'block' }}>
                            
                                <CardTitle></CardTitle>
                                <Form>
                                <label>Date d'achat :</label>
                                <FormGroup>
                                <DatePicker
                                    placeholderText=""
                                    isClearable
                                    //selected={this.state.startDate}
                                    //onChange={this.handleChange}
                                />
                                </FormGroup>
                            
                                <FormGroup>
                                <label>Facture disponible:</label>
                                    <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                        <option >Disponible</option>
                                        <option >Non disponible</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                <label>Etat de produit:</label>
                                    <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                        <option></option>
                                        <option >Neuf</option>
                                        <option >Bon etat</option>
                                        <option >Etat moyen</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                <label>Garantie :</label>
                                <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                        <option></option>
                                        <option >Oui</option>
                                        <option >Non</option>
                                    </Input>
                                </FormGroup>
                            
                                </Form>
                                </Col>
                                </Row>
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
                                    <LoadAsyncSelect
                                        options={communes}
                                        selectedOption={this.handleLocationChange}
                                        currentLocation={this.getLocation}
                                    />
                                </Col>
                                <Col xs="6">
                                    <div className="map">
                                        <div className="map_container">
                                            {shape != '' ?
                                                <MapPolygon
                                                    shape= {shape}
                                                    height="300px"
                                                    width="500px"
                                                />
                                                :coords != '' ?
                                                <MapCircle
                                                    coords= {coords}
                                                    height="300px"
                                                    width="500px"
                                                />
                                                :currentCoords != '' ?
                                                    <MapCircle
                                                        coords= {currentCoords}
                                                        height="300px"
                                                        width="500px"
                                                    />
                                                    :
                                                    'Error we cannot get you location'
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

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        categories : state.categorieReducer.categories,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        logout : () => dispatch({type: LOGOUT_USER}),
        getUserDetail : user => dispatch({type: GET_USERDETAIL, action: user}),
        getCategorie: dispatch({type: GET_CATEGORIE}),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnonce);