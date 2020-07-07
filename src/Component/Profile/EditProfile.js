import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
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
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import * as userReducer from '../Auth/login/UserReducer';


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

import EditProfileInfoPerso from './EditProfileInfoPerso';
import EditProfileEmail from './EditProfileEmail';
import EditProfilePassword from './EditProfilePassword';


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
            user: {}
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
        var currentUser = {};
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
        var currentUser = {};
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
        var currentUser = {};
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
        var user = {};
         var { changeEmail, changeInfo, changePassword, message, success } = this.props;
        return(
            <Container maxWidth="lg" className="edit-profile">
                <Grid container spacing={6}>
                <Grid item xs={12} sm={3}>
                    <div className="edit_profile_sidebar">
                        <ul>
                            <li>
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#personal-info" scroll={el => this.scrollWithOffset(el, 150)}>Infos personnel</Link>
                            </li>
                            <li ref="_change_password">
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#change-password" scroll={el => this.scrollWithOffset(el, 60)}>Change de passe</Link>
                            </li>
                            <li>
                                <Link activeClassName="active" tag={RRNavLink} to="/profile#change-email" scroll={el => this.scrollWithOffset(el, 0)}>Change email</Link>
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} sm={7} style={{marginBottom: '5%'}}>
                    {message  &&
                        <Alert variant="filled" severity={success ? "success" : "error"}>
                            {message}
                        </Alert>
                    }
                    <EditProfileInfoPerso 
                        changeInfo={changeInfo}
                    />
                    <EditProfilePassword 
                        changePassword={changePassword}
                    />
                    <EditProfileEmail 
                        changeEmail={changeEmail}
                    />
                </Grid>
               
            </Grid>
            </Container>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        success: state.userReducer.success,
        message: state.userReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        updateUser: (user, field) => dispatch({type: UPDATE_USER, payload: {user, field}}),
        changeEmail: email => dispatch({type: 'API_CALL', payload : userReducer.changeEmail(email)}),
        changePassword: user => dispatch({type: 'API_CALL', payload : userReducer.changePassword(user)}),
        changeInfo: user => dispatch({type: 'API_CALL', payload : userReducer.changeInfo(user)}),

      }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);