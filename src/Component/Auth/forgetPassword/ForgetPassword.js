import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row, FormFeedback ,UncontrolledAlert } from 'reactstrap';
import './forgetPAssword.css';
import login_picture from '../../../Assets/images/connexion.jpg';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { RESET_PASSWORD } from '../../Commons/reducers/Mailing/SendMailActions';



class ForgetPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {
            annonceType: '',
            email: '',
            message: null,
            emailError: null,
            emailInputInvalid: false,
        }

    this.handleAnnonceType = this.handleAnnonceType.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
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
    getMyPassword() {
        var { email, emailInputInvalid } = this.state;
        this.setState({
            emailError: null,
            emailInputInvalid: false,
        })
        if(email == "") {
            this.setState({emailError: 'Email est requis', emailInputInvalid : true});
        }else if(!this.validateEmail(email)) {
            this.setState({emailError: 'Email est invalid', emailInputInvalid : true});
        }
        
        if(!emailInputInvalid) {
            this.props.recoverPassword(email);
            
        }
        
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email.toLowerCase());
        return isValid;
    }
    
    render() {
        const icon = <FaFacebookF color="#fff" size="1.2em"/>;
        return(
            <div className="reset_password_container">
			{this.props.userDetails && this.props.userDetails.success &&
					this.props.history.push('/')
                            }
                <div className="floatleft_reset_password">
                
                    <div className="reset_password_left">
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
                        <div className="reset_password_form">
                            <FormGroup>
                                <Input  
                                    type="email" onChange={this.handleInputchange} name="email"  placeholder="Email"
                                    invalid={this.state.emailInputInvalid}
                                />
                                {/* <FormFeedback tooltip></FormFeedback> */}
                                {this.state.emailError != "" ? <FormText className="error_message"><span>{this.state.emailError}</span></FormText> : ''}
                            </FormGroup>

                            

                            <FormGroup  className="login_botton">
                                <Button type="button" className="btn_save" onClick={() => this.getMyPassword()}>Réinitialiser le mot de passe</Button>
                            </FormGroup>
                        
                        </div>
                    </div>
                </div> 
                <div className="floatright_reset_password">
                        <div className="reset_password_image">
                        </div>
                    </div>
            </div> 
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        success: state.sendMailReducer.success,
        message: state.sendMailReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        recoverPassword : email => dispatch({type: RESET_PASSWORD, payload: email})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);