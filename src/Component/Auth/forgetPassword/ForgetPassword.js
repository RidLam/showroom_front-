import React , { Component } from 'react';
import './forgetPAssword.css';
import { FaFacebookF } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as userReducer from '../login/UserReducer';
import Alert from '@material-ui/lab/Alert';
import ForgetPasswordForm from './ForgetPasswordForm';



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
        const { recoverPassword, success, message } = this.props;
        return(
            <div className="reset_password_container">
                <div className="floatleft_reset_password">
                
                    <div className="reset_password_left">
                    {success == false &&
                         <Alert variant="filled" severity="error">
                            {message}
                        </Alert>
                    }
                    {success == true && 
                        <Alert variant="filled" severity="success">
                            {message}
                        </Alert>
                    }
                        <div className="reset_password_form">
                            <ForgetPasswordForm 
                                recoverPassword={recoverPassword}
                            />
                             <div className="forget_password">
                                <a href="/auth/login">Page login</a>
                            </div>
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
        success: state.userReducer.success,
        message: state.userReducer.message
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        recoverPassword : (user) => dispatch({type: 'API_CALL', payload : userReducer.forgetPassword(user)}),
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);