import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import './AnnonceDetail.css';
import './annonce-responsive.css';
import "react-image-gallery/styles/css/image-gallery.css";
import './comment_section.css';
import Detail from './annonceDetail/Detail';
import Loading from '../Commons/loading/Loading';
import * as annonceReducer from './AnnonceReducer';

class AnnonceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonce : {},
            isOpen: false,
            annonceExist: false,
            coords : {}
        }

        this.getShape = this.getShape.bind(this);
        this.closeOpenModal = this.closeOpenModal.bind(this);
        this.userStore = this.userStore.bind(this);
    }
    
    UNSAFE_componentWillMount() {
        const id  = this.props.match.params.id;
        if(id) { this.props.getAnnonceById(id); }
    }
    
    closeOpenModal() {
        this.setState({isOpen: !this.state.isOpen })
    }
    
   
    getShape(polygonArray){
         var jsonData = JSON.parse(polygonArray);
         var geoShape = {lat: jsonData[0], lng: jsonData[1]};
        return geoShape;
      }
    componentDidMount() {
        this.setState({isOpen: this.props.success })
    }
    
    userStore(user) {
        const { history } = this.props;
        if(user) { 
            history.push('/store/' + user.username + '/' + user.id );
        }
    }

    render() {
        
        const  {annonce, contactUSer, success, message, messageSent, messageSentFunc}  = this.props;
        const { isOpen } = this.state;

        return(
            Object.keys(annonce).length > 0 ?
                <Detail  
                    annonce={annonce}
                    contactUSer={contactUSer}
                    messageSent={messageSent}
                    message={message}
                    success={success}
                    closeOpenModal={this.closeOpenModal}
                    isOpen={isOpen}
                    messageSentFunc={messageSentFunc}
                    userStore={this.userStore}
                />
            :
                <Loading />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        annonce: state.annonceReducer.annonce,
        success: state.sendMailReducer.success,
        message: state.sendMailReducer.message,
        messageSent: state.annonceReducer.isMessageSent
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
       getAnnonceById: (data) => dispatch({type: 'API_CALL', payload : annonceReducer.getAnnonceById(data)}),
       contactUSer: (data) => dispatch({type: 'API_CALL', payload : annonceReducer.contactUSer(data)}),
       getAnnonceOfUser: (data) => dispatch({type: 'API_CALL', payload : annonceReducer.getAnnonceOfUser(data)}),
       messageSentFunc : () => dispatch({ type: "MESSAGE_SENT_SUCCESS", payload: null })

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnonceDetail);