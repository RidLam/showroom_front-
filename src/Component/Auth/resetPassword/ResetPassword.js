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
import ResetPasswordForm from './ResetPasswordForm';
import Alert from '@material-ui/lab/Alert';
import * as userReducer from '../login/UserReducer';



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
        const { changePassword, message, success, match } = this.props;
        return(
            <div className="change_password_container">
                <div className="floatleft_change_password">
                    <div className="change_password_left">
                    {message && message != undefined &&
                        <Alert variant="filled" severity={success ? "success" : "error"}>
                            {message}
                        </Alert>
                    }
                    <div className="register_form">
                        <ResetPasswordForm
                            changePassword={changePassword}
                            match={match}
                        />   

                                
                        <div className="forget_password">
                            <a href="/auth/login">Page login</a>
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
        userDetails : state.userReducer.userDetails,
        success: state.userReducer.success,
        message: state.userReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        changePassword : (user) => dispatch({type: 'API_CALL', payload : userReducer.resetPassword(user)})
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);