import React, { Component} from 'react';
import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Commons/Header/Header';
import Footer from './Component/Commons/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import './Assets/Css/index.css';
import NewAnnonce from './Component/Annonce/NewAnnonce';
import Categorie from './Component/Categorie/Categorie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faSlidersH ,faSortDown, faSortUp, faSearch, faTrashAlt, faSearchLocation, faShareAltSquare, faHeart, faImage, faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import AnnonceDetail from './Component/Annonce/AnnonceDetail';

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
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/newAnnonce" component={NewAnnonce}/>
              <Route path="/categories" component={Categorie}/>
              <Route path="/annonce/:id" component={AnnonceDetail}/>
          </Switch>
        <Footer/>
      </div>
      
    )
  }
}

export default App;
