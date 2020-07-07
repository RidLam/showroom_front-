import React, { Component } from 'react';
import { connect } from 'react-redux';
import './store.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'reactstrap';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import noImage from '../../Assets/images/no-image.png';
import profile_pic from '../../Assets/images/profile/pf1.jpg';
import * as annonceReducer from '../Annonce/AnnonceReducer';
import AnnonceCard from '../Categorie/AnnonceCard';

const moment = require('moment');
moment.locale('fr');


class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            isFavorite: false,
            regions: [],
            categories: [],
        }
        this.annonceDetail = this.annonceDetail.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.filterValue = this.filterValue.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { id }  = this.props.match.params;
        if(id) { this.props.getAnnonceOfUser(id); }
    }
    
    annonceDetail(annonce) {
        console.log("clicked");
      
            this.props.history.push({
                pathname: '/annonce/' + annonce.id,
                state: { myAnnonce: annonce }
              })

    }
    handleFavorite() {
        this.setState({
            isFavorite : !this.state.isFavorite
        })
    }
    filterValue(value) {
        console.log(value);
    }

    render() {
        const base_urrl = "http://localhost:3000";
        const { userAnnonces } = this.props;
        return(
            <div className="body_container">
                <div className="store-slide">
                    <div className="store-slide-profile">
                        <div className="profile_avatar">
                            <img src={profile_pic}></img>
                        </div>
                        <div className="profile_avatar">
                            <h4>Username</h4>
                        </div>
                    </div>
                </div>
             <div className="container">
               {userAnnonces &&
                    <AnnonceCard 
                        annonces={userAnnonces}
                    />
               }
            </div>
            </div>    
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userAnnonces: state.annonceReducer.userAnnonces,
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
       getAnnonceOfUser: (data) => dispatch({type: 'API_CALL', payload : annonceReducer.getAnnonceOfUser(data)}),

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);