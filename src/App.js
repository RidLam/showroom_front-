import React, { Component} from 'react';
import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Commons/Header/Header';
import Footer from './Component/Commons/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import './Assets/Css/index.css';
import NewAnnonce from './Component/Annonce/NewAnnonce';
import {Container, Row, Col } from 'reactstrap';
import Categorie from './Component/Categorie/Categorie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faSlidersH ,faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import AnnonceDetail from './Component/Annonce/AnnonceDetail';
import Register from './Component/Auth/Register/Register';
import Login from './Component/Auth/login/Login';
import Store from './Component/Store/Store';
import MyFavorite from './Component/Categorie/MyFavorite';

library.add(faEnvelope, faKey, faSlidersH, faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt, fab);




class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        shape : []
    }
}
  
  render() {
   
    return(
      <div>
        <Header/>
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
            </Switch>
        </div>
        <Footer/>
      </div>
      
    )
  }
}

export default App;
