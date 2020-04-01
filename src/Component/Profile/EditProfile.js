import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row } from 'reactstrap';
import './editProfile.css';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledAlert } from 'reactstrap';
import Avatar from 'react-avatar-edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'; 
import { UPDATE_USER } from '../Commons/reducers/userDetail/UserDetailActions';
import avatar from '../../Assets/images/man.png';
import { HashLink as Link } from 'react-router-hash-link';
import { NavLink as RRNavLink } from 'react-router-dom';
import { FaRegHeart} from "react-icons/fa";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


class EditProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameInputInvalid: '',
            usernameError: '',

            phone: '',
            phoneInputInvalid: '',
            phoneError: '',

            oldPassword: '',
            oldPasswordError: '',
            oldPasswordInputInvalid: false,

            newPassword: '',
            newPasswordError: '',
            newPasswordInputInvalid: false,

            confirmPassword: '',
            confirmPasswordError: '',
            confirmPasswordInputInvalid: false,

            preview: null,
            src: '',
            user: this.props.userDetails.userDetails
        }

    this.handleUserType = this.handleUserType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUSerInfoPerso = this.updateUSerInfoPerso.bind(this);
    this.updateUSerPassword = this.updateUSerPassword.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.openModal = this.openModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.saveProfilePic = this.saveProfilePic.bind(this)
    this.scrollView = this.scrollView.bind(this)
    }
    handleUserType(event){
        console.log(event.target);
        this.setState({
          annonceType: event.currentTarget.value
          });
      }
    handleInputChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    handleAvatar(event) {
        console.log(event);
    }
    onImageChange(event) {
        console.log(event);
    }
    
    updateUSerInfoPerso() {
        var {username, phone, preview, gender, usernameInputInvalid, phoneInputInvalid } = this.state;
        var currentUser = this.props.userDetails.user;
        this.setState({
            usernameError: null,
            usernameInputInvalid: false,
            phoneError: null,
            phoneInputInvalid: false,
            isOpen: false
        })
        
        if(phone == "") {
            this.setState({phoneError: 'N° de téléphone est requis', phoneInputInvalid : true});
        }
        if(username == "") {
            this.setState({usernameError: "Nom d'utilisateur est requis", usernameInputInvalid : true});
        }
        if(!phoneInputInvalid && !usernameInputInvalid) {
            var data = {
                username,
                phone,
                avatar: preview,
                transaction_type: "change_perso_info"
            }
            this.props.updateUser(currentUser ,data);
        }
    }

    updateUSerPassword() {
        var {oldPassword, newPassword, confirmPassword } = this.state;
        var currentUser = this.props.userDetails.user;
        this.setState({
            oldPasswordError: null,
            oldPasswordInputInvalid: false,
            newPasswordError: null,
            newPasswordInputInvalid: false,
            confirmPasswordError: null,
            confirmPasswordInputInvalid: false,
            isOpen: false
        })
        
        if(oldPassword == "") {
            this.setState({oldPasswordError: 'Ancien mot de passe est requis', oldPasswordInputInvalid : true});
        }
        if(newPassword == "") {
            this.setState({newPasswordError: "Nouveaux mot de passe est requis", newPasswordInputInvalid : true});
        }
        if(confirmPassword == "") {
            this.setState({confirmPasswordError: "Confirmation de mot de passe est requis", confirmPasswordInputInvalid : true});
        }else if(newPassword != confirmPassword) {
            this.setState({confirmPasswordError: "Confirmation de mot de passe ne match pas nouvaux mot de passe", confirmPasswordInputInvalid : true});
        }

        if(!this.state.oldPasswordInputInvalid && !this.state.newPasswordInputInvalid && !this.state.confirmPasswordInputInvalid) {
            var data = {
                oldPassword,
                newPassword,
                confirmPassword,
                transaction_type: "change_password"
            }
            this.props.updateUser(currentUser ,data);
        }
    }

    componentDidMount() {
        var currentUser = this.props.userDetails.user;
        if(currentUser) {
            this.setState({
                username: currentUser.username,
                phone: currentUser.phone,
                avatar: currentUser.avatar
            })
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email.toLowerCase());
        return isValid;
    }
    setEditorRef(editor) {this.editor = editor}

    onClose() {
        this.setState({preview: null})
      }
      
      onCrop(preview) {
          console.log(preview);
        this.setState({preview})
      }
      openModal() {
          this.setState({
              isOpen: true
          })
      }
      handleCloseModal() {
        this.setState({
            isOpen: false,
            preview: null
        });
    }

    saveProfilePic() {
        this.setState({
            isOpen: false
        })
    }

    scrollView(DOMNode) {
        let node = this.refs._change_password;
        if (node) {
            this.refs._change_password.scrollTo({x: 0, y: 0, animated: true}); 
            node.scrollIntoView(true);
        }
    }

    scrollWithOffset(el, offset) {
        const elementPosition = el.offsetTop - offset;
        window.scroll({
          top: elementPosition,
          left: 0,
          behavior: "smooth"
        });
    }

    render() {
        var {isOpen,usernameInputInvalid, phoneInputInvalid } = this.state;
        var user = this.props.userDetails.user;
         
        return(
            <Container>
                <Row className="profile_block">
                    <Col xs="3">
                        <div className="edit_profile_sidebar">
                        <ul>
                            <li>
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#personal-info" scroll={el => this.scrollWithOffset(el, 150)}>Infos personnel</Link>
                            </li>
                            <li ref="_change_password">
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#change-password" scroll={el => this.scrollWithOffset(el, 10)}>Change de passe</Link>
                            </li>
                            <li>
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#change-email" scroll={el => this.scrollWithOffset(el, 0)}>Change email</Link>
                            </li>
                        </ul>
                        </div>
                        
                    </Col>
                    <Col xs="9">
                        {this.props.success != null && this.props.success == true &&
                            <UncontrolledAlert  color="success">
                                {this.props.message}
                            </UncontrolledAlert >
                        }
                        {this.props.success != null && this.props.success == false &&
                            <UncontrolledAlert  color="danger">
                                {this.props.message}
                            </UncontrolledAlert >
                        }
                        <Card id="personal-info">
                        <CardHeader>Mes informations personnel</CardHeader>
                        <CardBody>
                            <Row>
                            <Col xs="12">
                            
                                <CardTitle></CardTitle>
                               
                                    <div className="avatar">
                                        {this.state.preview != null ?
                                        <Row className="profile_pic"><img src={this.state.preview} alt="Preview" /></Row>
                                        :user && user.avatar ?
                                        <Row className="profile_pic"><img src={user.avatar} alt="Preview" /></Row>
                                        :
                                        <Row className="profile_pic">
                                            <div className="image_avatar">
                                                {/* <h1>{user && user.firstname.charAt(0).toUpperCase()}{user && user.lastname.charAt(0).toUpperCase()}</h1> */}
                                                <img src={avatar}></img>
                                            </div>
                                        </Row>
                                        }
                                        <Button color="secondary" onClick={()=> this.openModal()}>Changer la photo</Button>
                                    </div>
                                
                                    {/* <img src={this.state.preview} alt="Preview" /> */}
                                 
                                <FormGroup>
                                    <label>Nom d'utilisateur</label>
                                    <Input  
                                        type="text" onChange={this.handleInputChange} name="username" value={this.state.username}  placeholder="Nom d'utilisateur"
                                        invalid={this.state.usernameInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.usernameError != "" ? <FormText className="error_message"><span>{this.state.usernameError}</span></FormText> : ''}
                                </FormGroup>
                            
                                <FormGroup>
                                <label>Email :</label>
                                    <Input type="text" onChange={this.handleInputChange} value={user && user.email} name="categorie_id" id="exampleSelect" disabled/>
                                </FormGroup>

                                {user && user.type_user == 'professional' &&
                                    <FormGroup>
                                    <label>Nom de l'entreprise :</label>
                                        <Input type="text" onChange={this.handleInputChange} value='Google' name="categorie_id" id="exampleSelect" disabled/>
                                    </FormGroup>
                                }
                                
                                <FormGroup>
                                    <Row>
                                    <Col xs={8}>
                                        <label>Téléphone</label>
                                        <Input  
                                            type="text" onChange={this.handleInputChange} value={this.state.phone} name="phone"  placeholder="Téléphone"
                                            invalid={this.state.phoneInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.phoneError != "" ? <FormText className="error_message"><span>{this.state.phoneError}</span></FormText> : ''}
                                    </Col>
                                    </Row>
                                </FormGroup>
                                
                                <div className="button_block">
                                    <Button className="btn_cancel"   >Annuler</Button>{' '}
                                    <Button className="btn_save" onClick= {() => this.updateUSerInfoPerso()}  >Envoyer</Button>
                                </div>
                                
                                
                            
                                </Col>
                               
                                </Row>
                            </CardBody>
                        </Card>
                       <br/>
                        <Card id="change-password">
                            <CardHeader>Changement de mot de passe </CardHeader>
                            <CardBody>
                                <Row>
                                <Col xs="12">
                                
                                    <CardTitle></CardTitle>
                                    

                                    <FormGroup>
                                        <label>Ancien mot de passe</label>
                                        <Input  
                                            type="password" onChange={this.handleInputChange} name="oldPassword"  placeholder=""
                                            invalid={this.state.oldpasswordInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.oldPasswordError != "" ? <FormText className="error_message"><span>{this.state.oldPasswordError}</span></FormText> : ''}
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Nouveaux mot de passe</label>
                                        <Input  
                                            type="password" onChange={this.handleInputChange} name="newPassword"  placeholder=""
                                            invalid={this.state.newPasswordInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.newPasswordError != "" ? <FormText className="error_message"><span>{this.state.newPasswordError}</span></FormText> : ''}
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Confirme mot de passe</label>
                                        <Input  
                                            type="password" onChange={this.handleInputChange} name="confirmPassword"  placeholder=""
                                            invalid={this.state.confirmPasswordInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.confirmPasswordError != "" ? <FormText className="error_message"><span>{this.state.confirmPasswordError}</span></FormText> : ''}
                                    </FormGroup>

                                    <div className="button_block">
                                        <Button className="btn_cancel"  >Annuler</Button>{' '}
                                        <Button className="btn_save" onClick= {() => this.updateUSerPassword()}  >Envoyer</Button>
                                    </div>
                                    
                                    
                                
                                    </Col>
                                    
                                    </Row>
                                </CardBody>
                        </Card>
                        <br/>
                        <Card id="change-email">
                        <CardHeader>Changement d'email </CardHeader>
                        <CardBody>
                            <Row>
                            <Col xs="12">
                            
                                <CardTitle></CardTitle>
                               

                                <FormGroup>
                                    <label>Email</label>
                                    <Input  
                                        type="email" onChange={this.handleInputchange} name="change_email"  placeholder=""
                                        invalid={false}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {/* {this.state.oldPasswordError != "" ? <FormText className="error_message"><span>{this.state.oldPasswordError}</span></FormText> : ''} */}
                                </FormGroup>

                                <FormGroup>
                                    <label>Confirme email</label>
                                    <Input  
                                        type="email" onChange={this.handleInputchange} name="confirme_email"  placeholder=""
                                        invalid={false}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {/* {this.state.newPasswordError != "" ? <FormText className="error_message"><span>{this.state.newPasswordError}</span></FormText> : ''} */}
                                </FormGroup>

                                <div className="button_block">
                                    <Button className="btn_cancel"   >Annuler</Button>{' '}
                                    <Button className="btn_save" onClick= {() => this.updateUSer()}  >Evnoyer</Button>
                                </div>
                                
                                
                            
                                </Col>
                               
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Modal isOpen={isOpen} >
                        <ModalHeader>Changement photo de profile</ModalHeader>
                        <ModalBody>
                            <div className="modal_body">
                                <Avatar
                                    width={250}
                                    height={250}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                    src={this.state.src}
                                    />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary"  onClick={()=> this.handleCloseModal()}>Annuler</Button>{' '}
                            <Button color="secondary"  onClick={()=> this.saveProfilePic()}>Enregistrer</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        success: state.userDetailReducer.success,
        message: state.userDetailReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        updateUser: (user, field) => dispatch({type: UPDATE_USER, payload: {user, field}})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);