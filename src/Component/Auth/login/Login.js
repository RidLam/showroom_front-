import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row, FormFeedback  } from 'reactstrap';
import './login.css';
import login_picture from '../../../Assets/images/connexion.jpg';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import * as userReducer from './UserReducer';





class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {},
            emailValid: null,
            passwordValid: null,
            isValid: true,
            formValid: null
        }

    this.responseFacebook = this.responseFacebook.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit(event, errors, values) {
        if(!errors.length) {
            var user = {email: values.email, password: values.password};
            this.props.login(user);
        } 
    }
    
    

    // UNSAFE_componentWillUpdate(nexProps, nextState) {
    //     console.log(nexProps);
    //     if(nexProps.isAuthenticated) {
    //          window.location.href = "/";
    //     }
       
    //   }

    //   validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let emailValid = this.state.emailValid;
    //     let passwordValid = this.state.passwordValid;
    //     let isValid = this.state.isValid;
      
    //     switch(fieldName) {
    //       case 'email':
    //         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    //         fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
    //         isValid =  false;
    //         break;
    //       case 'password':
    //         passwordValid = value.length >= 6;
    //         fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
    //         isValid =  false;
    //         break;
    //       default:
    //         break;
    //     }
    //     this.setState({formErrors: fieldValidationErrors,
    //                     emailValid: emailValid,
    //                     passwordValid: passwordValid,
    //                     isValid: this.validateForm()
    //                   }, this.validateForm);
    //   }

      
    redirectToLogin() {
         return <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}></Redirect>
    }
    
      UNSAFE_componentWillReceiveProps(nexProps, nextState) {
        console.log(nexProps)
        if(nexProps.isAuthenticated) {
            window.sessionStorage.setItem("user", JSON.stringify(nexProps.user));
            window.sessionStorage.setItem("token", JSON.stringify({token: nexProps.token, refreshToken: nexProps.refreshToken}));
            window.location.href = '/';
        }
      }
   
   
    responseFacebook(response){
        var email = response.email;
        var first_name = response.first_name;
        var last_name = response.last_name;
        const data = new FormData();
        data.append('email', email);
        console.log(response);
        axios.post(`http://localhost:3000/users/getByEmail`, {email: email})
        .then(res => {
            if(res.data.length == 0) {
                
                axios.post('http://localhost:3000/users/add', {first_name: first_name, last_name: last_name, email: email})
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {throw error})
            }
        }).catch(error => {
            console.error(error);
        })
    console.log(response);
    }

    render() {
        const icon = <FaFacebookF color="#fff" size="1.2em"/>;
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return(
            <div className="login_container">
                {this.props.userDetails && this.props.userDetails.success &&
                        this.props.history.push('/')
                    }
                <div className="floatleft">
               
                    <div className="login_left">
                                <div className="login_form">
                                <AvForm onSubmit={this.handleLoginSubmit}>
                                <AvGroup>
                                <AvInput name="email" type="email" label="" required placeholder="Email"/>
                                    <AvFeedback>Email est requis</AvFeedback>
                                </AvGroup>
                                <AvGroup>
                                    <AvInput name="password" type="password" required placeholder="Mot de passe"/>
                                    <AvFeedback>Password est requis</AvFeedback>
                                </AvGroup>
                                
                                <FormGroup>
                                    <Button className="btn_save">Se connecter</Button>
                                </FormGroup>
                                </AvForm>

                               
                            <div className="forget_password">
                                <a href="/recoverPassword">Mot de passe oublié?</a>
                            </div>
                            <div className="or_facebook">
                                <p>Ou</p>
                            </div>
                            <FormGroup  className="facebook_login">
                            <FacebookLogin
                                appId="482248032399115"
                                autoLoad={false}
                                icon={icon}
                                size="small"
                                fields="name,email,picture,first_name,last_name"
                                textButton="Facebook"
                                onClick={this.responseFacebook}
                                callback={() => this.responseFacebook}
                                />
                            
                        </FormGroup>
                        <FormGroup  className="btn_create_account">
                                <Link  exact  to="/auth/register">
                                    <Button>Creer un compte </Button>
                                </Link>
                        </FormGroup>
                        </div>
                        </div>
                
                </div>
                <div className="floatright">
                    <div className="login_image">
                    </div>
                </div>
            </div>   
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user : state.userReducer.user,
        isAuthenticated : state.userReducer.isAuthenticated,
        token : state.userReducer.token,
        refreshToken : state.userReducer.refreshToken,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        login: (user) => dispatch({type: 'API_CALL', payload : userReducer.login(user)}),
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);