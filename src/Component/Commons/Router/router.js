import React , { Component } from 'react';
import Home from '../../Home/Home';
import NewAnnonce from '../../Annonce/NewAnnonce';
import { Router , Route } from 'react-router-dom';
import Categorie from '../../Categorie/Categorie';
import AnnonceDetail from '../../Annonce/AnnonceDetail';



class router extends Component {
    

    render() {
        return (
            <di>
                <Router>
                    <Route exact path="/" component={Home}/>
                    <Route path="/newAnnonce" component={NewAnnonce}/>
                    <Route path="/categories" component={Categorie}/>
                </Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/newAnnonce" component={NewAnnonce}/>
                    <Route path="/categories" component={Categorie}/>
                    <Route path="annonce/detail" component={AnnonceDetail}/>
                </Switch>
            </di>
        )
    }
}


export default router;