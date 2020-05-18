import React, { Component} from 'react';
import './App.css';
import Home from '../Home/Home';
import Header from '../Commons/Header/Header';
import Footer from '../Commons/Footer/Footer';
import { Switch, Route, Redirect  } from 'react-router-dom';
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
import EditProfile from '../Profile/EditProfile';
import MyAnnonce from '../mesAnnonce/MyAnnonce';
import PrivateRoute from '../Commons/helper/PrivateRoute';
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from '../Auth/resetPassword/ResetPassword';
import { isAuthenticated } from '../Auth/isAuthenticated/IsAuthenticated';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../Store/Store';
import { SortComponent } from '../Home/SortComponent';
import Header1 from '../Commons/Header/Header1';
library.add(faEnvelope, faKey, faSlidersH, faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt, fab);




class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        shape : [],
        user: {},
        isAuthenticated: false
    }
    this.getUser = this.getUser.bind(this);
    
    this.getUser();
}
componentDidCatch(error, errorInfo) {
  // You can also log the error to an error reporting service
  console.log(error);
  console.log(errorInfo);
}
  UNSAFE_componentWillUpdate(nexProps, nextState) {
    console.log(nexProps)
  }

  UNSAFE_componentWillReceiveProps(nexProps, nextState) {
    console.log(nexProps)
    this.getUser();
  }
  getUser() {
    var user = window.sessionStorage.getItem('user');
    var token = window.sessionStorage.getItem('token');
    if(user && token){
      this.setState({
        isAuthenticated: true,
        user : JSON.parse(user)
      })
    }
  
    return user;
  }
  getCurrentPath() {
    return window.location.pathname == '/annonces/search' ? true: false;
  }
  render() {
   var { user, isAuthenticated } = this.state;
   var showMobileFilter = this.getCurrentPath(); 
  //  const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isAuthenticated ? (
  //     <Component {...props} />
  //     ) : (
  //     <Redirect
  //       to={{
  //       pathname: "auth/login"
  //       }}
  //     />
  //     )
  //     }
  //   />
  //   );
    return(
      <div>
        <Header1 user= {user} isAuthenticated={isAuthenticated} token={"test"}/>
        <div className="container_top"></div>
          <Switch>
                <Route exact exact path="/" component={Home}/>
                <Route exact path="/newAnnonce" component={NewAnnonce}/>
                <Route exact path="/annonces/search" component={Categorie}/>
                <Route exact path="/annonce/:id" component={AnnonceDetail}/>
                <Route exact path="/auth/register" component={Register}/>
                <Route exact path="/auth/login" component={Login}/>
                <Route exact path="/store/:username" component={Store}/>
                <Route exact path="/favoris" component={MyFavorite}/>
                <Route exact path="/recoverPassword" component={ForgetPassword}/>
                <Route exact path="/noresult" component={NoResultFound}/>
                <Route exact path="/profile" component={EditProfile}/>
                <Route exact path="/mesAnnonces" component={MyAnnonce}/>
                <Route exact path="/auth/resetPassword/:uuid" component={ResetPassword}/>
                <Route exact path="/notResultFound" component={NoResultFound}/>
                <Route  component={NotFound}/>
            </Switch>
            {/* <div className="container_bottom"></div> */}
        <Footer/>
      </div>
      
    )
  }
}
const mapStateToProps = function(state) {
  return {
      userDetails : state.userDetailReducer.userDetails,
      isAuthenticated : state.userDetailReducer.isAuthenticated
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
      getUserDetail : user => dispatch({type: GET_USERDETAIL, action: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
