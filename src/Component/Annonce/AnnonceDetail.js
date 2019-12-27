import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const queryString = require('query-string');
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import './Annonce.css';
import './annonce-responsive.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapPolygon from '../../maps/MapPolygon';
import MapCircle from '../../maps/MapCircle';
import map from '../../Assets/images/france.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import CustomModal from '../Modal/CustomModal';
import { FaRegHeart, FaHeart} from "react-icons/fa";





class AnnonceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonce : {},
            isOpen: false,
            annonceExist: false,
            coords : {}
        }
        this.mouseOver = this.mouseOver.bind(this);
        this.getShape = this.getShape.bind(this);
        this.contactSeller = this.contactSeller.bind(this);
    }
    componentDidMount(){
        var  _id = this.props.match.params.id;
        axios.get(`http://localhost:3000/annonces/getById`, {params: {id: _id}})
        .then(res => {
            var coords = this.getShape(res.data[0].commune.geo_point);
            this.setState({
                annonce : res.data[0] ,
                annonceExist : true,
                coords: coords
                });
                console.log(res)
        }).catch(error => {
            console.error(error);
        })
        
    }
    
    
    mouseOver(event) {
        console.log(event)
    }
    getShape(polygonArray){
         var jsonData = JSON.parse(polygonArray);
         var geoShape = {lat: jsonData[0], lng: jsonData[1]};

        // var data = jsonData[0];
        // for(var i =0; i< data.length;i++) {
        //     var item = data[i];
        //     var obj = {};
        //     obj['lat'] = item[1];
        //     obj['lng'] = item[0];
        //     geoShape.push(obj)
            
        // }
        return geoShape;
      }

      contactSeller() {
          this.setState({
              isOpen: true
          })
      }

    render() {
        const  myAnnonce  = this.state.annonce;
        var {coords} = this.state;
        var isCoords = Object.keys(coords).length > 0 ? true : false;
        const base_url = 'http://localhost:3000';
        console.log(myAnnonce)
        const mapView = () =>{
            return (
               <div className="map-view">
                   <span>Type and chose your location ,to display it on the map</span>
                   <img src={map}/>
               </div>
           )
            }
        return(
            <Container className="annonce-detail">
                <Row>
                    <Breadcrumb tag="nav" listTag="div" className="breadcrump">
                        <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#">{myAnnonce.commune && myAnnonce.commune.commune_name}</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#">{myAnnonce.categorie && myAnnonce.categorie.name}</BreadcrumbItem>
                        <BreadcrumbItem tag="span">{myAnnonce && myAnnonce.title}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                  
                <Row >

                    <Col xs={9} className="annonce-detail-image-preview">
                   <Row>
                        <Col xs={10}>
                        <div className="annonce-detail-title">
                            <div className="annonce-title">
                                <h4>{ myAnnonce.title} Mercedes classe C 250 AMG</h4>
                            </div>
                            <div className="annonce-date">
                                <h6>15/12/2019 à 21h12</h6>
                            </div>
                        </div>
                        </Col> 
                        <Col xs={2} >
                        <div className="annonce-price">
                                <h3>{ myAnnonce.price}€</h3>
                            </div>
                        </Col>
                        </Row>
                    <ImageGallery 
                        thumbnailPosition="bottom"
                        //sizes="500w"
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={true}
                        items={
                            myAnnonce.images && myAnnonce.images.length && myAnnonce.images.map(function(image) {
                                return{
                                        original: base_url + image.path,
                                        thumbnail: base_url + image.path
                                    }
                            })
                        } />
                    </Col>
                    <Col xs={3}>
                    <div>
       
                            <div className="wrapper">
                            <div className="top-icons">
                                <i className="fas fa-long-arrow-alt-left" />
                                <i className="fas fa-ellipsis-v" />
                                <i className="far fa-heart" />
                            </div>
                            <div className="profile">
                                <img src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w" className="thumbnail" />
                                <div className="check"><i className="fas fa-check" /></div>
                                <h4 className="name"><a href="/store/user"><strong>{myAnnonce.user && myAnnonce.user.username}</strong> </a><span>PRO</span></h4>
                                <Button id="favorite_btn" size="sm" block>Visiter la boutique</Button>

                                <Button onClick={() => this.contactSeller()}   id="contact_btn" size="sm" block>Contacter le vendeur</Button>
                                <Button id="favorite_btn" size="sm" block><FaRegHeart className="favorite_detail" onClick={() =>this.handleFavorite(annonce, 'delete')} color="#bb225a" size="1.3em"/>Ajouter au favoris</Button>
                            </div>
                            
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row className="annonce-detail-description">
                    <Col md={9}>
                        <div className="product_description">
                        <h4 className="title has_border">Description</h4>
                        <p>{myAnnonce.description}</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        
                    </Col>
                </Row>
                <Row className="annonce-detail-description">
                    <Col md={9}>
                       <Row>
                           <Col xs={6}>
                               <div>
                                   <label>Date d'achat :</label>
                                   <h6>12/12/2019</h6>
                               </div>
                           </Col>
                           <Col xs={6}>
                               <div>
                                   <label>Facture :</label>
                                   <h6>Oui</h6>
                               </div>
                           </Col>
                       </Row>
                       <Row>
                           <Col xs={6}>
                               <div>
                                   <label>Garantie :</label>
                                   <h6>Non</h6>
                               </div>
                           </Col>
                           <Col xs={6}>
                               <div>
                                   <label>Etat de produit :</label>
                                   <h6>Tres bon etat</h6>
                               </div>
                           </Col>
                       </Row>
                    </Col>
                    <Col md={3}>
                        
                    </Col>
                </Row>
                <Row >
                    <Col md={9}>
                    <div className="map_frame">
                        <h4 className="title has_border">Localisation</h4>
                            {isCoords ?
                                <MapCircle
                                    coords= {coords}
                                    height="300px"
                                    width="700px"
                                />
                                :
                                mapView()
                                
                            }
                        </div>
                    </Col>
                    <Col md={3}>
                       
                    </Col>
                </Row>
                <Row className="annonce-detail-profile1">
                    <Col xs={9}>
                    <div className="related_product">
                        
                        </div>
                    </Col>
                    <Col xs={3}>
                   
                    </Col>
                </Row>
                    <CustomModal
                        isOpen={this.state.isOpen}
                        title="Contact vendeur"
                    />
            </Container>
        )
    }
}


export default AnnonceDetail;