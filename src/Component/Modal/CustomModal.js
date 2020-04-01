import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button } from 'reactstrap';
import {   Form, FormGroup, Label, Input, FormText ,Container,  FormFeedback  } from 'reactstrap';
import { connect } from 'react-redux';
import { CONTACT_SELLER } from '../Commons/reducers/Mailing/SendMailActions';
import './customModal.css';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            annonce: [],
            phone: '',
            message: '',
            phoneInputInvalid: false,
            messageInputInvalid: false,
            phoneError: null,
            messageError: null
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.contacOwner = this.contacOwner.bind(this);
        this.handleInputchange = this.handleInputchange.bind(this);
    }

    handleCloseModal() {
        this.props.closeModal(false);
    }
    handleInputchange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
    }
   
    contacOwner(annonce, user) {
        var {message, messageInputInvalid } = this.state;
        this.setState({
            messageError: null,
            messageInputInvalid: false
        })
        
        if(message == "") {
            this.setState({messageError: 'Message est requis', messageInputInvalid : true});
        }

        if(!messageInputInvalid) {
           this.props.contactSeller(annonce, user, message);
        }
        
    }

    useEffect(){
        this.setState({
            isOpen: this.props.success
        })
      };

    render() {
        var {contactSeller, userDetails, title, isOpen, annonce } = this.props;
        return(
            <Modal isOpen={isOpen} >
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input  
                            type="textarea" className="message_owner" rows="5" onChange={this.handleInputchange} name="message"  placeholder="Message"
                            invalid={this.state.messageInputInvalid}
                        />
                        {/* <FormFeedback tooltip></FormFeedback> */}
                        {this.state.messageError != "" ? <FormText className="error_message"><span>{this.state.messageError}</span></FormText> : ''}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> this.handleCloseModal()}>Annuler</Button>{' '}
                    <Button color="secondary" className="btn_save" onClick={()=> this.contacOwner(annonce, userDetails)}>Envoyer</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        success: state.sendMailReducer.success
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        contactSeller : (annonce, client, message) => dispatch({
            type: CONTACT_SELLER, 
            payload: {
                annonce,
                client,
                message
            }})
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);