import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row, FormFeedback  } from 'reactstrap';
import './login.css';
import login_picture from '../../../Assets/images/connexion.jpg';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_USERDETAIL } from '../../Commons/reducers/userDetail/UserDetailActions';



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            annonceType: '',
            email: '',
            password: '',
            message: null,
            emailError: null,
            passwordError: null,
            emailInputInvalid: false,
            passwordInputInvalid: false
        }

    this.handleAnnonceType = this.handleAnnonceType.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.log_in = this.log_in.bind(this);
    }
    handleAnnonceType(event){
        console.log(event.target);
        this.setState({
          annonceType: event.currentTarget.value
          });
    }
    handleInputchange(event) {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    log_in() {
        var {password, email, emailInputInvalid, passwordInputInvalid } = this.state;
        this.setState({
            emailError: null,
            passwordError: null,
            emailInputInvalid: false,
            passwordInputInvalid: false
        })
        if(email == "") {
            this.setState({emailError: 'Email est requis', emailInputInvalid : true});
        }else if(!this.validateEmail(email)) {
            this.setState({emailError: 'Email est invalid', emailInputInvalid : true});
        }
        if(password == "") {
            this.setState({passwordError: 'Password est requis', passwordInputInvalid : true});
        }
        if(!emailInputInvalid && !passwordInputInvalid) {
            var user = {email: email, password: password};
            this.props.login(user);
            
            // axios.post(`http://localhost:3000/auth/login`, {email: email, password: password})
            // .then(res => {
            //     console.log(res.data);
            //     if(res.data.success) {
                    
            //     }else {
            //         this.setState({
            //             message: res.data.message
            //         })
            //     }
            // })
            // .catch(error => {console.log(error); })
        }
        
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email.toLowerCase());
        return isValid;
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
        return(
                <Row className="body_container">
                    {this.props.userDetails && this.props.userDetails.success &&
                        this.props.history.push('/')
                    }
                    <Col xs={1}></Col>
                    <Col xs={3} className="register_left">
                    <div className="register_form">
                        

                        <FormGroup>
                            <Input  
                                type="email" onChange={this.handleInputchange} name="email"  placeholder="Email"
                                invalid={this.state.emailInputInvalid}
                            />
                            {/* <FormFeedback tooltip></FormFeedback> */}
                            {this.state.emailError != "" ? <FormText className="error_message"><span>{this.state.emailError}</span></FormText> : ''}
                        </FormGroup>

                        <FormGroup>
                            <Input  
                                type="password" onChange={this.handleInputchange} name="password"  placeholder="Mot de passe"
                                invalid={this.state.passwordInputInvalid}
                            />
                            {/* <FormFeedback tooltip></FormFeedback> */}
                            {this.state.passwordError != "" ? <FormText className="error_message"><span>{this.state.passwordError}</span></FormText> : ''}
                        </FormGroup>

                        <FormGroup  className="login_botton">
                            <Button type="button" onClick={() => this.log_in()}>Se connecter</Button>
                        </FormGroup>
                        <div className="forget_password">
                            <a href="/recoverPassword">Mot de passe oublié?</a>
                        </div>
                        <p>Ou</p>
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
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={7}>
                        <div className="register_image">
                            <img src={login_picture}></img>
                        </div>
                    </Col>
                </Row>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        login : user => dispatch({type: GET_USERDETAIL, payload: user})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);