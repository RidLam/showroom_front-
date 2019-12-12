import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button } from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({
            isOpen :false
        })
    }
    componentWillReceiveProps(nexProps) {
        if(nexProps.isOpen != this.props.isOpen) {
            this.setState({
                isOpen : this.props.isOpen
            })
        }
    }

    render() {

        var {title, isOpen} = this.state
        return(
            <Modal isOpen={isOpen} >
                <ModalHeader>Contact vendeur</ModalHeader>
                <ModalBody>
                    <p>Contact form</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> this.closeModal()}>Annuler</Button>{' '}
                    <Button color="secondary" onClick={()=> this.closeModal()}>Envoyer</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default CustomModal;