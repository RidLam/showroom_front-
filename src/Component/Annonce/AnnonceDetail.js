import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
const queryString = require('query-string');
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import './Annonce.css';
import './annonce-responsive.css';
import "react-image-gallery/styles/css/image-gallery.css";
import Avatar from '@material-ui/core/Avatar';
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapPolygon from '../../maps/MapPolygon';
import MapCircle from '../../maps/MapCircle';
import map from '../../Assets/images/france.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, UncontrolledAlert  } from 'reactstrap';
import CustomModal from '../Modal/CustomModal';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import './comment_section.css';
import { GET_ANNONCE_BY_ID } from '../Commons/reducers/annonce/MyAnnonceActions';
import { SEND_QUESTION, SEND_REPLY } from '../Commons/reducers/question/QuestionActions';
import Comments from '../Comments/Comments';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';




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
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.getUser = this.getUser.bind(this);

        var  _id = this.props.match.params.id;
        this.props.getAnnonceById(_id);
        this.getUser();
    }
    
    
    handleCloseModal(isOpen) {
        this.setState({
            isOpen: isOpen
        })
    }
    getUser() {
        var uuid = localStorage.getItem('id_session');
        if(uuid) {
          this.props.getUSerDetail({uuid});
        }
      }
    mouseOver(event) {
        console.log(event)
    }
    getShape(polygonArray){
         var jsonData = JSON.parse(polygonArray);
         var geoShape = {lat: jsonData[0], lng: jsonData[1]};

        return geoShape;
      }

      contactSeller() {
          if(Object.keys(this.props.userDetails).length > 0) {
            this.setState({
                isOpen: true
            })
          }else {
            this.props.history.push({
                pathname: '/auth/login'
              })
          }
          
      }
        getQuestion(value) {
            var annonce = this.props.myAnnonce;
            var data = {};
            data['question'] = value;
            data['user_uuid'] = '2a125025-2e40-11ea-ba92-5048494f4e43';
            data['annonce_uuid'] = annonce.id;

        this.props.sendQuestion(data);

        }
        getResponse(res) {
            var annonce = this.props.myAnnonce;
            var reply = {};
            var data = {};
            reply['question_uuid'] = res.user_uuid;
            reply['response'] = res.reply;
            reply['user_uuid'] = '2a125025-2e40-11ea-ba92-5048494f4e43';

            data['reply'] = reply;
            data['annonce_uuid'] = annonce.id;

            this.props.sendReply(data);
        }
        
        componentDidMount() {
            this.setState({
                isOpen: this.props.success
            })
        }

    render() {
        
        const  {myAnnonce, questions, isAuthenticated}  = this.props;
        var coords;
        var isCoords = false;
        if(myAnnonce && myAnnonce.commune && myAnnonce.commune.geo_point) {
            coords = this.getShape(myAnnonce.commune.geo_point);
        }
        if(coords) {
            var isCoords = Object.keys(coords).length > 0 ? true : false;
        }
        const base_url = 'http://localhost:3000';
        
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
                        <BreadcrumbItem tag="span">{myAnnonce.title}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                {this.props.success &&
                    <UncontrolledAlert  color="success">
                        {this.props.message}
                    </UncontrolledAlert >
                }
                <Row >

                    <Col xs={9} className="annonce-detail-image-preview">
                   <Row>
                        <Col xs={10}>
                        <div className="annonce-detail-title">
                            <div className="annonce-title">
                                <h4>{myAnnonce.title} Mercedes classe C 250 AMG</h4>
                            </div>
                            <div className="annonce-date">
                                <h6>15/12/2019 à 21h12</h6>
                            </div>
                        </div>
                        </Col> 
                        <Col xs={2} >
                        <div className="annonce-price">
                                <h3>{myAnnonce.price}€</h3>
                            </div>
                        </Col>
                        </Row>
                        {myAnnonce.images && myAnnonce.images.length > 0 ?
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
                        :
                        <div className="no_image">
                        </div>
                        }
                    
                    </Col>
                    <Col xs={3}>
                    <div>
       
                            <div className="wrapper">
                            
                            <div className="profile">
                                <div className="cover">
                                  <div className="avatar">
                                  <Avatar>H</Avatar>
                                  <Avatar>M</Avatar>
                                  </div>
                                </div>
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
                <Comments
                        questions= {questions}
                        getQuestion= {this.getQuestion}
                        handleReply={this.getResponse}
                        isAuthenticated= {isAuthenticated}
                        history= {this.props.history}
                    />
                    
                <CustomModal
                    isOpen={this.state.isOpen}
                    title="Contact vendeur"
                    annonce={myAnnonce}
                    closeModal={this.handleCloseModal}
                />
                <div className="bottom_space"></div>
            </Container>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        myAnnonce: state.annonceReducer.myAnnonce,
        questions: state.annonceReducer.annonceQuestions,
        isAuthenticated : state.userDetailReducer.isAuthenticated,
        success: state.sendMailReducer.success,
        message: state.sendMailReducer.message,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
       contactSeller: details => dispatch({type: CONTACT_SELLER, payload: details}),
       getAnnonceById: id => dispatch({type: GET_ANNONCE_BY_ID, payload: id}),
       sendQuestion: question => dispatch({type: SEND_QUESTION, payload: question}),
       sendReply: data => dispatch({type: SEND_REPLY, payload: data}),
       getUSerDetail : user => dispatch({type: GET_USERDETAIL, action: user})
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnonceDetail);