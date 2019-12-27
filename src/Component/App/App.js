import React, { Component} from 'react';
import './App.css';
import Home from '../Home/Home';
import Header from '../Commons/Header/Header';
import Footer from '../Commons/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import '../../Assets/Css/index.css';
import NewAnnonce from '../Annonce/NewAnnonce';
import Categorie from '../Categorie/Categorie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faSlidersH ,faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import AnnonceDetail from '../Annonce/AnnonceDetail';
import Register from '../Auth/Register/Register';
import Login from '../Auth/login/Login';
import Store from '../Store/Store';
import MyFavorite from '../Categorie/MyFavorite';
import axios from 'axios';
import { connect } from 'react-redux';
import NotFound from '../notFound/404';
import ForgetPassword from '../Auth/forgetPassword/ForgetPassword';
import NoResultFound from '../notFound/NoResultFound';

library.add(faEnvelope, faKey, faSlidersH, faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt, fab);




class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        shape : []
    }
}
  
  render() {
   var { userDetails } = this.props;
    return(
      <div>
        <Header userDetails= {userDetails}/>
        <div className="body">
          <Switch>
                <Route exact exact path="/" component={Home}/>
                <Route exact path="/newAnnonce" component={NewAnnonce}/>
                <Route exact path="/categories" component={Categorie}/>
                <Route exact path="/annonce/:id" component={AnnonceDetail}/>
                <Route exact path="/auth/register" component={Register}/>
                <Route exact path="/auth/login" component={Login}/>
                <Route exact path="/store/:username" component={Store}/>
                <Route exact path="/favoris" component={MyFavorite}/>
                <Route exact path="/recoverPassword" component={ForgetPassword}/>
                <Route exact path="/noresult" component={NoResultFound}/>
                <Route  component={NotFound}/>
            </Switch>
        </div>
        <Footer/>
      </div>
      
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

export default connect(mapStateToProps)(App);
