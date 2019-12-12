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





class AnnonceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonce : {},
            isOpen: false
        }
        this.mouseOver = this.mouseOver.bind(this);
        this.getPolygon = this.getPolygon.bind(this);
        this.contactSeller = this.contactSeller.bind(this);
    }
    componentDidMount(){


        
    }
    componentDidUpdate(prevProps) {
        var  _id = this.props.match.params.id;
        axios.get(`http://localhost:3000/getAnnoneById`, {params: {id: _id}})
        .then(res => {
            this.setState({
                annonce : res.data 
                });
        }).catch(error => {
            console.error(error);
        })
    }
    mouseOver(event) {
        console.log(event)
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

      contactSeller() {
          this.setState({
              isOpen: true
          })
      }

    render() {
        const { myAnnonce } = this.props.location.state;
        const base_url = 'http://localhost:3000';
        console.log(myAnnonce)
        var shape = this.getPolygon(myAnnonce.commune.geo_polygon);
       
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
                        <BreadcrumbItem tag="a" href="#">{myAnnonce.commune.name}</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#">{myAnnonce.categorie.name}</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">{myAnnonce.title}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                  
                <Row >
                    <Col xs={9} className="annonce-detail-image-preview">
                    <div className="image_preview">
                        <ImageGallery 
                            thumbnailPosition="left"
                            sizes="500w"
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showNav={false}
                            items={
                                myAnnonce.images.length && myAnnonce.images.map(function(image) {
                                    return{
                                            original: base_url + image.path,
                                            thumbnail: base_url + image.path
                                        }
                                })
                            } />
                    </div>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col xs={8}>
                        <div className="annonce-detail-title">
                                        <h4>{myAnnonce.title} addition to that descriptio title</h4>
                                    </div>
                        </Col> 
                        <Col xs={3}>
                                <div className="annonce-detail-price">
                                        <h3>{myAnnonce.price}€</h3>
                                    </div>
                        </Col>
                        </Row>
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
                                <h3 className="name"><a href="/store/user"> {myAnnonce.user.username}</a></h3>
                                <p className="title">Javascript Developer</p>
                                <Button onClick={() => this.contactSeller()} color="primary"  id="contact_btn" size="sm" block>Contacter le vendeur</Button>
                                <Button color="secondary" id="favorite_btn" size="sm" block>Ajouter au favorie</Button>
                            </div>
                            
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row className="annonce-detail-description">
                    <Col md={8}>
                        <div className="product_description">
                        <h4 className="title has_border">Description</h4>
                        <p>{myAnnonce.description}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="map_frame">
                        <h4 className="title has_border">Localization</h4>
                            {shape ?
                                <MapPolygon
                                    shape= {shape}
                                    height="200px"
                                    width="300px"
                                />
                                :
                                mapView()
                                
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="annonce-detail-profile1">
                    <Col xs={8}>
                    <div className="related_product">
                        <h4 className="title has_border">Autres annonces du vendeur</h4>
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-12">
                            <div className="product_box">
                                <div className="prd_img">
                                <a href="#"><img src="" /></a>
                                </div>
                                <div className="prd_details">
                                <h4><span><a href="#">Title de l'annonce</a></span></h4>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-12">
                            <div className="product_box">
                                <div className="prd_img">
                                <a href="#"><img src="" /></a>
                                </div>
                                <div className="prd_details">
                                <h4><span><a href="#">Title de l'annonce</a></span></h4>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-12">
                            <div className="product_box">
                                <div className="prd_img">
                                <a href="#"><img src="" /></a>
                                </div>
                                <div className="prd_details">
                                <h4><span><a href="#">Title de l'annonce</a></span></h4>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-12">
                            <div className="product_box">
                                <div className="prd_img">
                                <a href="#"><img src="" /></a>
                                </div>
                                <div className="prd_details">
                                <h4><span><a href="#">Title de l'annonce</a></span></h4>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </Col>
                    <Col xs={4}>
                   
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