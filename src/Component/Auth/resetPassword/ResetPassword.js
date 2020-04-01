import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row, FormFeedback, UncontrolledAlert  } from 'reactstrap';
import './resetPassword.css';
import login_picture from '../../../Assets/images/connexion.jpg';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { RESET_PASSWORD } from '../../Commons/reducers/Mailing/SendMailActions';



class ResetPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {
            annonceType: '',
            newPassword: '',
            confirmePassword: '',
            message: null,
            newPasswordError: null,
            newPasswordInputInvalid: false,
            confirmePasswordError: null,
            confirmePasswordInputInvalid: false,
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
        var uuid = this.props.match.params.uuid;
        var { newPassword, confirmePassword, newPasswordInputInvalid , confirmePasswordInputInvalid} = this.state;
        this.setState({
            newPasswordError: null,
            newPasswordInputInvalid: false,
            confirmePasswordError: null,
            confirmePasswordInputInvalid: false,
        })
        if(newPassword == "") {
            this.setState({newPasswordError: 'Mot de passe  est requis', newPasswordInputInvalid : true});
        }
        if(confirmePassword == "") {
            this.setState({confirmePasswordError: 'Confirmation de mot de passe est requis', confirmePasswordInputInvalid : true});
        }
        if(newPassword != confirmePassword) {
            this.setState({confirmePasswordError: 'Le mot de passe est pas le meme', confirmePasswordInputInvalid : true});
        }
        
        if(!newPasswordInputInvalid && !confirmePasswordInputInvalid) {
            var obj = {uuid, password: newPassword, confirmePassword};
            console.log(obj);
            this.props.recoverPassword(obj);
            
        }
        
    }
    
    render() {
        const icon = <FaFacebookF color="#fff" size="1.2em"/>;
        return(
            <div className="change_password_container">
			{this.props.userDetails && this.props.userDetails.success &&
					this.props.history.push('/')
				}
                <div className="floatleft_change_password">
                {this.props.success &&
                    <UncontrolledAlert  color="success">
                        {this.props.message}
                    </UncontrolledAlert >
                }
                    <div className="change_password_left">
                    <div className="register_form">
                                    

                                    <FormGroup>
                                        <label>Nouveaux mot de passe</label>
                                        <Input  
                                            type="password" onChange={this.handleInputchange} name="newPassword"  placeholder=""
                                            invalid={this.state.newPasswordInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.newPasswordError != "" ? <FormText className="error_message"><span>{this.state.newPasswordError}</span></FormText> : ''}
                                    </FormGroup>

                                    <FormGroup>
                                        <label>Confirme mot de passe</label>
                                        <Input  
                                            type="password" onChange={this.handleInputchange} name="confirmePassword"  placeholder=""
                                            invalid={this.state.confirmePAsswordInputInvalid}
                                        />
                                        {/* <FormFeedback tooltip></FormFeedback> */}
                                        {this.state.confirmePasswordError != "" ? <FormText className="error_message"><span>{this.state.confirmePasswordError}</span></FormText> : ''}
                                    </FormGroup>
                                    

                                    <FormGroup  className="login_botton">
                                        <Button className="btn_save" type="button" onClick={() => this.getMyPassword()}>Envoyer</Button>
                                    </FormGroup>
                                    <div className="forget_password">
                                        <a href="#">Page login</a>
                                    </div>
                                
                                </div>
                    </div>
                    
                </div> 
                <div className="floatright_change_password">
                        <div className="change_password_image">
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
        recoverPassword : newPassword => dispatch({type: RESET_PASSWORD, payload: newPassword})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);