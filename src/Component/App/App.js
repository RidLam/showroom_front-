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
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from '../Auth/resetPassword/ResetPassword';
import { isAuthenticated } from '../Auth/isAuthenticated/IsAuthenticated';
import { GET_USERDETAIL } from '../Commons/reducers/userDetail/UserDetailActions';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../Store/Store';
import { SortComponent } from '../Home/SortComponent';
library.add(faEnvelope, faKey, faSlidersH, faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt, fab);




class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        shape : []
    }
    this.getUser = this.getUser.bind(this);
    
    this.getUser();
}

  getUser() {
    var uuid = localStorage.getItem('id_session');
    if(uuid) {
      this.props.getUserDetail({uuid});
    }
  }
  componentDidMount() {
    
}
  render() {
   var { userDetails, isAuthenticated } = this.props;
   const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
      <Component {...props} />
      ) : (
      <Redirect
        to={{
        pathname: "auth/login"
        }}
      />
      )
      }
    />
    );
    return(
      <div>
        <Header userDetails= {userDetails}/>
        <div className="container_top"></div>
          <Switch>
                <Route exact exact path="/" component={Home}/>
                <PrivateRoute exact path="/newAnnonce" component={NewAnnonce}/>
                <Route exact path="/annonces/search" component={Categorie}/>
                <Route exact path="/annonce/:id" component={AnnonceDetail}/>
                <Route exact path="/auth/register" component={Register}/>
                <Route exact path="/auth/login" component={Login}/>
                <PrivateRoute exact path="/store/:username" component={Store}/>
                <Route exact path="/favoris" component={MyFavorite}/>
                <Route exact path="/recoverPassword" component={ForgetPassword}/>
                <Route exact path="/noresult" component={NoResultFound}/>
                <PrivateRoute exact path="/profile" component={EditProfile}/>
                <PrivateRoute exact path="/mesAnnonces" component={MyAnnonce}/>
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
