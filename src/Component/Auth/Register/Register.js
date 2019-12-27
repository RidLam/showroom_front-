import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row } from 'reactstrap';
import './register.css';
import regiter_picture from '../../../Assets/images/inscription.jpg';



class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            siret: '',
            emailInputInvalid: '',
            firstnameInputInvalid: '',
            lastnameInputInvalid: '',
            usernameInputInvalid: '',
            passwordInputInvalid: '',
            siretInputInvalid: '',
            emailError: '',
            firstnameError: '',
            lastnameError: '',
            usernameError: '',
            passwordError: '',
            siretError: '',
        }

    this.handleUserType = this.handleUserType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUSer = this.addUSer.bind(this);
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
    addUSer() {
        var {password, email,firstname, lastname,password,siret,username, emailInputInvalid, passwordInputInvalid, firstnameInputInvalid,lastnameInputInvalid,siretInputInvalid } = this.state;
        this.setState({
            emailError: null,
            passwordError: null,
            firstnameError: null,
            lastnameError: null,
            usernameError: null,
            siretError: null,
            firstnameInputInvalid:false,
            lastnameInputInvalid: false,
            usernameInputInvalid: false,
            siretInputInvalid: false,
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
        if(firstname == "") {
            this.setState({firstnameError: 'Prénom est requis', firstnameInputInvalid : true});
        }
        if(lastname == "") {
            this.setState({lastnameError: 'Nom est requis', lastnameInputInvalid : true});
        }
        if(siret == "") {
            this.setState({siretError: 'N° siret est requis', siretInputInvalid : true});
        }
        if(username == "") {
            this.setState({usernameError: "Nom d'utilisateur est requis", usernameInputInvalid : true});
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email.toLowerCase());
        return isValid;
    }
    render() {
        var {emailInputInvalid, passwordInputInvalid, firstnameInputInvalid,lastnameInputInvalid,siretInputInvalid,usernameInputInvalid } = this.state;

        return(
                <Row className="body_container">
                    <Col xs={1}></Col>
                    <Col xs={3} className="register_left">
                    <div className="register_form">
                        <FormGroup row>
                                <Col sm={4}>
                                    <Label for="exampleEmail">Vous etes: </Label>
                                </Col>
                                <Col sm={6}>
                                <FormGroup tag="fieldset">
                                    <Row>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleUserType} value="particulier" type="radio" name="radio1"/>{' '}
                                                Particulier
                                            </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleUserType} value="professional" type="radio" name="radio1" />{' '}
                                                Professionnel
                                            </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            {this.state.annonceType == 'professional' && 
                                <FormGroup>
                                    <Input  
                                        type="text" onChange={this.handleInputChange} name="siret" id="title_id" placeholder="N° siret"
                                        invalid={siretInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.siretError != "" ? <FormText className="error_message"><span>{this.state.siretError}</span></FormText> : ''}
                                </FormGroup>
                            }
                                <FormGroup>
                                    <Input  
                                        type="text" name="lastname" onChange={this.handleInputChange}  placeholder="Nom"
                                        invalid={lastnameInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.lastnameError != "" ? <FormText className="error_message"><span>{this.state.lastnameError}</span></FormText> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <Input  
                                        type="text" name="firstname" onChange={this.handleInputChange}  placeholder="Prénom"
                                        invalid={firstnameInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.firstnameError != "" ? <FormText className="error_message"><span>{this.state.firstnameError}</span></FormText> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <Input  
                                        type="email" name="email" onChange={this.handleInputChange}  placeholder="Email"
                                        invalid={emailInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.emailError != "" ? <FormText className="error_message"><span>{this.state.emailError}</span></FormText> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <Input  
                                        type="text" name="username" onChange={this.handleInputChange}  placeholder="Nom d'utilisateur"
                                        invalid={usernameInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.usernameError != "" ? <FormText className="error_message"><span>{this.state.usernameError}</span></FormText> : ''}
                                </FormGroup>

                                <FormGroup>
                                    <Input  
                                        type="password" name="password" onChange={this.handleInputChange}  placeholder="Mot de passe"
                                        invalid={passwordInputInvalid}
                                    />
                                    {/* <FormFeedback tooltip></FormFeedback> */}
                                    {this.state.passwordError != "" ? <FormText className="error_message"><span>{this.state.passwordError}</span></FormText> : ''}
                                </FormGroup>
        
                        <FormGroup>
                            <div className="register_botton">
                            <Button onClick={() => this.addUSer()}>Envoyer</Button>
                            </div>
                        </FormGroup>
                    </div>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={7}>
                        <div className="register_image">
                            <img src={regiter_picture}></img>
                        </div>
                    </Col>
                </Row>
        )
    }
}


export default Register;