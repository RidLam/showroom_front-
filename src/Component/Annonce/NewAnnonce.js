import React, { Component } from 'react';
import axios from 'axios';
import '../../Assets/Css/upload.images.css';
import './Annonce.css';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { GET_CATEGORIE } from '../Commons/reducers/categorie/CategorieActions';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';
import {Container, Paper } from '@material-ui/core';
import * as homeReducer from '../Home/HomeReducer';
import * as annonceReducer from './AnnonceReducer';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText } from 'reactstrap';
import AddAnnonceForm from './AddAnnonceForm';





class NewAnnonce1 extends Component {

    constructor(props) {
        super(props);
         this.state = { 
            
            };
         
         this.handleFileChange = this.handleFileChange.bind(this);
         this.success = this.success.bind(this);
         this.getUser = this.getUser.bind(this);


    }


    handleFileChange(files) {
        this.setState({ images: this.state.images.concat(files[0])})
    }
   
    UNSAFE_componentWillMount() {
        this.props.getAllCategories();
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.success) {
            setTimeout(() => {
                window.location.href = "/annonce/search"
              }, 3000)
        }
    }

    render() {
        const { categories, communes, getCommunesById, addAnnonce } = this.props;
        return(
            <Container  maxWidth="md" className="new-annonce-container">
                <AddAnnonceForm
                    categories={categories}
                    getCommunesById={getCommunesById}
                    communes={communes}
                    addAnnonce={addAnnonce}
                    files= {[]}
                />
            </Container>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        categories : state.homeReducer.categories,
        communes : state.annonceReducer.communes,
        success : state.annonceReducer.success,
        message : state.annonceReducer.message,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        logout : () => dispatch({type: LOGOUT_USER}),
        getUserDetail : user => dispatch({type: GET_USERDETAIL, action: user}),
        getAllCategories: () => dispatch({type: 'API_CALL', payload : homeReducer.getCategories()}),
        getCommunesById: data => dispatch({type: 'API_CALL', payload : annonceReducer.getCommunesById(data)}),
        addAnnonce: data => dispatch({type: 'API_CALL', payload : annonceReducer.addAnnonce(data)}),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnonce1);