import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row } from 'reactstrap';
import './register.css';
import regiter_picture from '../../../Assets/images/inscription.jpg';
import { REGISTER_USER } from '../../Commons/reducers/userDetail/UserDetailActions';


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
            type: '',
            company: '',
            emailInputInvalid: '',
            firstnameInputInvalid: '',
            lastnameInputInvalid: '',
            usernameInputInvalid: '',
            passwordInputInvalid: '',
            siretInputInvalid: '',
            typeInputInvalid: '',
            companyInputInvalid: '',
            emailError: '',
            firstnameError: '',
            lastnameError: '',
            usernameError: '',
            passwordError: '',
            siretError: '',
            typeError: '',
            companyError: '',
            isValid: null
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
        var {password, email,firstname, lastname,password,siret,username, type, company, isValid, emailInputInvalid, passwordInputInvalid, firstnameInputInvalid,lastnameInputInvalid,siretInputInvalid,typeInputInvalid } = this.state;
        this.setState({
            emailError: null,
            passwordError: null,
            firstnameError: null,
            lastnameError: null,
            usernameError: null,
            siretError: null,
            typeError: null,
            companyError: null,
            firstnameInputInvalid:false,
            lastnameInputInvalid: false,
            usernameInputInvalid: false,
            siretInputInvalid: false,
            emailInputInvalid: false,
            passwordInputInvalid: false,
            typeInputInvalid: false,
            companyInputInvalid: false,
            isValid: true

        })
        if(email == "") {
            this.setState({emailError: 'Email est requis', emailInputInvalid : true, isValid: false});
        }else if(!this.validateEmail(email)) {
            this.setState({emailError: 'Email est invalid', emailInputInvalid : true, isValid: false});
        }
        if(password == "") {
            this.setState({passwordError: 'Password est requis', passwordInputInvalid : true, isValid: false});
        }
        if(firstname == "") {
            this.setState({firstnameError: 'Prénom est requis', firstnameInputInvalid : true, isValid: false});
        }
        if(lastname == "") {
            this.setState({lastnameError: 'Nom est requis', lastnameInputInvalid : true, isValid: false});
        }
        if(username == "") {
            this.setState({usernameError: "Nom d'utilisateur est requis", usernameInputInvalid : true, isValid: false});
        }
        if(type == "") {
            this.setState({typeError: "Type d'utilisateur est requis", typeInputInvalid : true, isValid: false});
        }
        if(type == "professional" && company == "") {
            this.setState({companyError: "Nom d'entreprise est requis", companyInputInvalid : true, isValid: false});
        }
        if(type == "professional" && siret == "") {
            this.setState({siretError: 'N° siret est requis', siretInputInvalid : true, isValid: false});
        }
        var newUSer = {type, firstname, lastname,email,password, username};
        if(type) {
            newUSer = { ...newUSer, company, siret};
        }
        if(isValid) {
           this.props.register(newUSer);
        }
        
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email.toLowerCase());
        return isValid;
    }
    render() {
        var {emailInputInvalid, passwordInputInvalid, firstnameInputInvalid,lastnameInputInvalid,siretInputInvalid,usernameInputInvalid, typeInputInvalid, companyInputInvalid } = this.state;

        return(
            <div className="login_container">
			{this.props.userDetails && this.props.userDetails.success &&
					this.props.history.push('/')
				}
	<div className="floatleft">

		<div className="login_left">
			<div className="register_form">
                        {/* <FormGroup row>
                                <Col sm={4}>
                                    <Label for="exampleEmail">Vous etes:  :</Label>
                                </Col>
                                <Col sm={6}>
                                <FormGroup tag="fieldset">
                                    <Row>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleUserType} value="particulier" type="radio" name="radio1"/>{' '}
                                                Particulier
                                             :</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleUserType} value="professional" type="radio" name="radio1" />{' '}
                                                Professionnel
                                             :</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    </FormGroup>
                                </Col>
                            </FormGroup> */}

                            {/* <FormGroup>
                                <label>Vous etes  :</label>
                                <Input  
                                    type="select" name="type" onChange={this.handleInputChange}
                                    invalid={typeInputInvalid}
                                >
                                    <option hidden>Selectionner le type</option>
                                    <option value="individual">Particulier</option>
                                    <option value="professional">Professional</option>
                                    </Input>
                                
                                {this.state.typeError != "" ? <FormText className="error_message"><span>{this.state.typeError}</span></FormText> : ''}
                            </FormGroup> */}

                            {/* {this.state.type == 'professional' && 
                                <FormGroup>
                                    <label>N° siret :</label>
                                    <Input  
                                        type="text" onChange={this.handleInputChange} name="siret" id="title_id" placeholder="N° siret"
                                        invalid={siretInputInvalid}
                                    />
                                    
                                    {this.state.siretError != "" ? <FormText className="error_message"><span>{this.state.siretError}</span></FormText> : ''}
                                </FormGroup>
                            } */}
                            {/* {this.state.type == 'professional' && 
                                <FormGroup>
                                    <label>Nom de l'entreprise :</label>
                                    <Input  
                                        type="text" onChange={this.handleInputChange} name="company" id="title_id" placeholder="Nm de l'entreprise"
                                        invalid={companyInputInvalid}
                                    />
                                    
                                    {this.state.companyError != "" ? <FormText className="error_message"><span>{this.state.companyError}</span></FormText> : ''}
                                </FormGroup>
                            } */}
                                <FormGroup>
                                    <label>Nom :</label>
                                    <Input  
                                        type="text" name="lastname" onChange={this.handleInputChange}  placeholder="Nom"
                                        invalid={lastnameInputInvalid}
                                    />
                                    
                                    {this.state.lastnameError != "" ? <FormText className="error_message"><span>{this.state.lastnameError}</span></FormText> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <label>Prénom :</label>
                                    <Input  
                                        type="text" name="firstname" onChange={this.handleInputChange}  placeholder="Prénom"
                                        invalid={firstnameInputInvalid}
                                    />
                                    
                                    {this.state.firstnameError != "" ? <FormText className="error_message"><span>{this.state.firstnameError}</span></FormText> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <label>Email :</label>
                                    <Input  
                                        type="email" name="email" onChange={this.handleInputChange}  placeholder="Email"
                                        invalid={emailInputInvalid}
                                    />
                                    
                                    {this.state.emailError != "" ? <FormText className="error_message"><span>{this.state.emailError}</span></FormText> : ''}
                                </FormGroup>
        
                        <FormGroup>
                            <div className="register_botton">
                            <Button className="btn_save" onClick={() => this.addUSer()}>Envoyer</Button>
                            </div>
                        </FormGroup>
                    </div>
			</div>

		</div>
		<div className="floatright">
			<div className="register_image">
			</div>
		</div>
	</div> 
        )
    }
}

const mapStateToProps = function(state) {
    return {
        inserted : state.userDetailReducer.inserted,
        message: state.userDetailReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        register : user => dispatch({type: REGISTER_USER, payload: user})
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);