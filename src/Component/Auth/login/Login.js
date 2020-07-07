import React , { Component } from 'react';
import { Button, FormGroup  } from 'reactstrap';
import './login.css';
import FacebookLogin from 'react-facebook-login';
import { FaFacebookF } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';



import axios from 'axios';
import { connect } from 'react-redux';
import * as userReducer from './UserReducer';
import { validate } from './ValidateForm';
import LoginForm from './LoginForm';
import Alert from '@material-ui/lab/Alert';







class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            form: {
                name: 'loginForm',
                errors: {},
                values: {},
                isValid: false
            },
            values :{}
            
        }

    this.responseFacebook = this.responseFacebook.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formValues = this.formValues.bind(this);
    }

    handleLoginSubmit(values) {
        if(Object.keys(values).length) {
            var user = {email: values.email, password: values.password};
            this.props.login(user);
        }else {
            console.log("error");
        }
    }
   
   
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        var myValues = this.formValues(name, value);
        var errors = validate(myValues);
        
        this.setState(prevState => ({
            form: {                  
                ...prevState.form,    
                values: myValues,
                errors: errors       
            }
        }))
    }
    

    UNSAFE_componentWillUpdate(nexProps, nextState) {
        console.log(nexProps);
        if(nexProps.isAuthenticated) {
             window.location.href = "/";
        }
       
      }

      formValues(fieldName, value) {
        var values = this.state.values;
        values[fieldName] = value;

        // if(isRequired &&  !value) {
        //     form.errors[fieldName] = {empty: true, invalid: true};
        //     form.values[fieldName] = null;
        //     form.isValid = false;
        // }else if(value) {
        //     if(pattern) {
        //         //var regex =  RegExp(pattern, 'g')
        //         var isMatched = new RegExp(pattern).test(value);
        //         if(isMatched) {
        //             form.values[fieldName] =  value;
        //             form.errors[fieldName] = {empty: false, invalid: false}
        //             form.isValid =  true;
        //         }else {
        //             form.values[fieldName] =  value;
        //             form.errors[fieldName] = {empty: false, invalid: true}
        //             form.isValid =  false;
        //         }
        //     }else {
        //         form.values[fieldName] =  value;
        //         form.errors[fieldName] = {empty: false, invalid: false}
        //         form.isValid =  true;
        //     }
        // }

        return values;
       
      }

      
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
        const {login, success, message } = this.props;
        return(
            <div className="login_container">
            {this.props.userDetails && this.props.userDetails.success &&
            this.props.history.push('/')
            }
            <div className="floatleft">
                <div className="login_left">
                {success == false &&
                     <Alert variant="filled" severity="error">
                         {message}
                     </Alert>
                }
                    <div className="login_form">
                       <LoginForm
                            login={login}
                       />
                        <div className="forget_password">
                            <a href="/auth/forget-password">Mot de passe oublié?</a>
                        </div>
                        <div className="or_facebook">
                            <p>Ou</p>
                        </div>
                        <FormGroup className="facebook_login">
                            <FacebookLogin appId="482248032399115" autoLoad={false}icon={icon}size="small" fields="name,email,picture,first_name,last_name" textButton="Facebook" onClick={this.responseFacebook}callback={() => this.responseFacebook}
                                />
                            </FormGroup>
                            <FormGroup className="btn_create_account">
                                <Link exact  to="/auth/register">
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
        success: state.userReducer.success,
        message: state.userReducer.message,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        login: (user) => dispatch({type: 'API_CALL', payload : userReducer.login(user)}),
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);