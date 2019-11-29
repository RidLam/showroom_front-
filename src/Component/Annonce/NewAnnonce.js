import React , { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MapPolygon from '../../maps/MapPolygon';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
import axios from 'axios';
import ImagesUpload from './ImagesUpload';
import '../../Assets/Css/upload.images.css';
import map from '../../Assets/images/france.png';
import './Annonce.css';


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
             departement_id: ''
            };
         this.handleLocationChange = this.handleLocationChange.bind(this);
         this.handleInputChange = this.handleInputChange.bind(this);
         this.chosenCommune = this.chosenCommune.bind(this);
         this.getPolygon = this.getPolygon.bind(this);
         this.handleFileChange = this.handleFileChange.bind(this);
         this.addAnnonce = this.addAnnonce.bind(this);
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
        data.append('type_annonce', 'professional');
        data.append('commune_id', commune_id);
        data.append('categorie_id', categorie_id);
        data.append('departement_id', departement_id);
        data.append('region_id', region_id);

        for(var i = 0 ; i < images.length; i++) {
            data.append('files', images[i]);
        }
        
        
        console.log(data);
        axios.post(`http://localhost:3000/upload`, data)
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
        axios.get(`http://localhost:3000/departement`, {params: {id: commune.code_departement}})
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
        var jsonData = JSON.parse(polygonArray);
        var data = jsonData[0];
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
            
            axios.post(`http://localhost:3000/communes`, {data})
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
        axios.get(`http://localhost:3000/categories`)
        .then(res => {
            this.setState({
                categories : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        const mapView = () =>{
         return (
            <div className="map-view">
                <span>Type and chose your location ,to display it on the map</span>
                <img src={map}/>
            </div>
        )
         }
        

        return(
            <Container className="add_annonce">
                <Row>
                    <Col xs="12">
                    <Card>
                        <CardHeader>Annonce Info</CardHeader>
                        <CardBody>
                        <CardTitle>Annonce Details</CardTitle>
                            <Form>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Titre</Label>
                                <Col sm={7}>
                                <Input type="text" onChange={this.handleInputChange} name="title" id="title_id" placeholder="Title de l'annonce" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleSelect" sm={2}>Select</Label>
                                <Col sm={7}>
                                <Input type="select" onChange={this.handleInputChange} name="categorie_id" id="exampleSelect">
                                    <option hidden>Select categorie</option>
                                    {this.state.categories && this.state.categories.map(item => {
                                        return ( <option value={item.id}>{item.name}</option>)
                                    })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleText" sm={2}>Description</Label>
                                <Col sm={7}>
                                <Input type="textarea" onChange={this.handleInputChange} name="description" id="exampleText" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePassword" sm={2}>Prix</Label>
                                <Col sm={4}>
                                <Input type="number" onChange={this.handleInputChange} name="price" id="prix" placeholder="Prix" />
                                </Col>
                            </FormGroup>
                           
                            </Form>
                        </CardBody>
                    </Card>
                    
                    </Col>
                  
                    </Row>
                    <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>Location</CardHeader>
                            <CardBody>
                            <CardTitle>Select your location from list</CardTitle>
                            <Row>
                                <Col xs="6">
                                <Form>
                                    
                                    <FormGroup row>
                                        <Label for="locationselect" name="commune" sm={4}>Type et selectionner la localisation</Label>
                                        <Col sm={8}>
                                           <Input type="text" 
                                           value={this.state.commune}
                                           onChange={this.handleLocationChange} name="commune" id="title_id" placeholder="Title de l'annonce" autoComplete="off" />
                                           <div className="commune-list">
                                            {this.state.communes && this.state.communes.map(item => {
                                                return(
                                                    <li className="" onClick={() => this.chosenCommune(item)}>{item.name}, {item.code}</li>
                                                )
                                            })}
                                            </div>
                                        </Col>
                                    </FormGroup>

                                    

                                    <FormGroup row>
                                        <Label for="examplePassword" sm={4}>Adresse</Label>
                                        <Col sm={8}>
                                        <Input type="text" onChange={this.handleInputChange} name="adresse" id="adresseid" placeholder="Type ton adresse" />
                                        </Col>
                                    </FormGroup>
                                    </Form>
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
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>Upload Images</CardHeader>
                            <CardBody>
                            <CardTitle>Select max three images</CardTitle>
                            
                                <ImagesUpload
                                    getFiles= {this.handleFileChange}
                                    />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style = {{paddingTop: " 15px"}}>
                    <Col className="text-right">
                    <Button color="danger" style= {{marginRight : "10px"}}>Annuler</Button>
                    <Button onClick={() => this.addAnnonce()} color="primary">Envoyer</Button>
                    </Col>
                    
                </Row>
                
            </Container>
        )
    }
}

export default NewAnnonce;