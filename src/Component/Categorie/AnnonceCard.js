import React , { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';
import { FaRegHeart, FaHeart} from "react-icons/fa";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import noImage from '../../Assets/images/no-image.png';
import './AnnonceCard.css';
import moment from 'moment';
const styles = (theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
      },
      
      cover: {
        width: 151,
      },
      item: {
        padding: 15
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      favorite: {
          cursor: 'pointer',
          marginTop: theme.spacing(1),
          marginRight: theme.spacing(2),
          color: '#bb225a'
      }
  });
class AnnonceCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            annonces: this.props.annonces,
            favorite: {}
        }
        this.showDetail = this.showDetail.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nexProps, nextstate) {
        if(nexProps.annonces.length) {
            this.setState({
                annonces: nexProps.annonces
            })
        }
    }
    showDetail(annonce){
        this.props.history.push('/annonce/' + annonce.id, {annonce: annonce});
    }

    render() {
        const { annonces, classes } = this.props;
        const base = 'http://localhost:3000';
        return(
            annonces.map(annonce => 
                    <div id="item-card">
                    <div id="item-picture">
                        {!annonce.images.length ?  
                            <img id="item-without-picture" src={noImage} />
                            : 
                            <img id="item-with-picture" src={base + annonce.images[0].path} />
                        }
                        {!annonce.images.length ? null : 
                            <span ><FontAwesomeIcon icon="image"/> {annonce.images.length}</span>
                        }
                    </div>
                    <div id="item-details">
                    <div id="item-details-header">
                            <div id="title">
                                 <a onClick={() => this.showDetail(annonce)}>{annonce.title} How do I find my M mobile domain? </a>
                            </div>
                            <div id="favorite">
                                {1==1 ?
                                    <FaHeart onClick={() =>this.handleFavorite(annonce, 'delete')} color="#bb225a" size="1.5em"/> :  <FaRegHeart onClick={() =>this.handleFavorite(annonce, 'add')} color="#bb225a" size="1.5em"/>
                                }
                            </div>
                    </div>
                    <div id="item-details-price">
                        {annonce.price}€
                    </div>
                    <div id="item-details-categorie">
                            categorie
                    </div>
                    <div id="item-details-location">
                            Paris (75017)
                    </div>
                    <div id="item-details-date">
                            21/09/2020 à 16:56
                    </div>
                    </div>
                </div>
                )
        ) 
    }
}

export default withStyles(styles)(AnnonceCard);;