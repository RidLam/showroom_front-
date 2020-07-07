import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './Categorie.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import SearchForm from './SearchForm';
import * as categorieReducer from './CategorieReducer';
import * as homeReducer from '../Home/HomeReducer';
import * as annonceReducer from '../Annonce/AnnonceReducer';
import AnnonceCard from './AnnonceCard';
import { HeadSlider } from './HeadSlider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from '../Commons/loading/Loading';


const queryString = require('query-string');
const moment = require('moment');
moment.locale('fr');


class Categorie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            isFavorite: false,
            categorieSlide : 'categorie-vetement.jpg',
            categorieSlideName: 'All catégorie',
            regions: [],
            categories: [],
            favorite: []
        }
        this.annonceDetail = this.annonceDetail.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.filterValue = this.filterValue.bind(this);
        this.searchAnnonce = this.searchAnnonce.bind(this);


        this.searchAnnonce();
        // if(myFavorite) {
        //     myFavorite = JSON.parse(myFavorite);
        //     for(var fav in myFavorite) {
        //         favoriteArr.push(myFavorite[fav].id);
        //     }
        //     this.setState({
        //         favorite: favoriteArr
        //     })
        // }
    }

    UNSAFE_componentWillMount() {
        this.props.getAllCategories();
        this.props.getAllRegions();
        this.props.getAllAnnonces();
    }

    searchAnnonce() {
        var query = queryString.parse(location.search);
        var param = {};
        for(var par in query) {
            if(query[par] != '') {
                param[par] = query[par];
            }
        }
        this.props.getAnnonces();
    }
    
    annonceDetail(annonce) {
        console.log("clicked");
      
            this.props.history.push({
                pathname: '/annonce/' + annonce.id,
                state: { myAnnonce: annonce }
              })

    }
    handleFavorite(annonce, type) {
        var myFavorite = {};
        var newFavorite = [];
        if(type == 'add') {
            var myFavorite = localStorage.getItem('myFavorite');
            myFavorite = JSON.parse(myFavorite);
            if(myFavorite == undefined){
                myFavorite = {};
                myFavorite[annonce.id] = annonce;
            }else{
                myFavorite[annonce.id] = annonce;
                for(var fav in myFavorite) {
                    newFavorite.push(myFavorite[fav].id);
                }
            }
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite));
        }else {
            var myFavorite = localStorage.getItem('myFavorite');
            myFavorite = JSON.parse(myFavorite);
            delete myFavorite[annonce.id];
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite));
            for(var fav in myFavorite) {
                newFavorite.push(myFavorite[fav].id);
            }
        }
        
        // this.setState({
        //     favorite : newFavorite
        // })
    }
    filterValue(value) {
        if(Object.keys(value).length) {
            this.props.annonceAdvancedSearch(value);
        }
    }

    render() {
        const { regions, annonces, categories, search, getCommunesById, communes, openFilter, closeFilterFunc, annonceAdvancedSearch } = this.props;
        //var annonces = [];
        return(
            <Fragment>
            <CssBaseline />
            <HeadSlider/>
            <SearchForm spacing={2}
                getFilterValue={this.filterValue}
                regions= {regions}
                categories={categories}
                history= {this.props.history}
                search={annonceAdvancedSearch}
                getCommunesById={getCommunesById}
                communes={communes}
                openFilter={openFilter}
                closeFilterFunc={closeFilterFunc}
            />
            <Container style={{position: openFilter ? 'fixed': ''}}>
                <Grid container >
                    <Grid item xs={12} sm={7}>
                        {annonces.length > 0 ?
                                <AnnonceCard annonces={annonces} {...this.props}/>
                                :
                                <Loading />
                            }
                    </Grid>
                <Grid item xs={12} sm={5}></Grid>
                </Grid>
            </Container>
            </Fragment>
            // <div className="body_container">
            //     <div className="categorie-slide">
            //         <img src={base_urrl + "/images/categorieSlides/" + categorieSlide}></img>
            //         <div className="categorie-slide-title">
            //             <span>
            //                 <strong>{categorieSlideName}</strong>
            //                     <p>Il y a actuellement <span>{annonces && annonces.length}</span> en ligne.</p>
            //             </span>
            //         </div>
            //     </div>
               
                
        )
    }
}

const mapStateToProps = function(state) {
    return {
        categories : state.homeReducer.categories,
        regions : state.homeReducer.regions,
        annonces: state.annonceReducer.annonces,
        communes: state.annonceReducer.communes,
        openFilter: state.commonReducer.openFilter
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        getAllCategories: () =>  dispatch({type: 'API_CALL', payload : homeReducer.getCategories()}),
        getAllRegions: () => dispatch({type: 'API_CALL', payload : homeReducer.getRegions()}),
        getAnnonces: () => dispatch({type: 'API_CALL', payload : categorieReducer.getAnnonces()}),
        annonceAdvancedSearch: (data) => dispatch({type: 'API_CALL', payload : annonceReducer.annonceAdvancedSearch(data)}),
        getAllAnnonces: () => dispatch({type: 'API_CALL', payload : annonceReducer.getAllAnnonces()}),
        getCommunesById: data => dispatch({type: 'API_CALL', payload : annonceReducer.getCommunesById(data)}),
        closeFilterFunc: () => dispatch({type: 'CLOSE_MOBILE_FILTER', payload: null})
      }

    }

export default connect(mapStateToProps, mapDispatchToProps)(Categorie);