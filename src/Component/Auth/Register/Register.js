import React , { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row } from 'reactstrap';
import './register.css';
import regiter_picture from '../../../Assets/images/inscription.jpg';



class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            annonceType: ''
        }

    this.handleAnnonceType = this.handleAnnonceType.bind(this);
    }
    handleAnnonceType(event){
        console.log(event.target);
        this.setState({
          annonceType: event.currentTarget.value
          });
      }
    render() {
        return(
                <Row className="body_container">
                    <Col xs={1}></Col>
                    <Col xs={3} className="register_left">
                    <Form className="register_form">
                        <FormGroup row>
                                <Col sm={4}>
                                    <Label for="exampleEmail">Vous etes: </Label>
                                </Col>
                                <Col sm={6}>
                                <FormGroup tag="fieldset">
                                    <Row>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleAnnonceType} value="particulier" type="radio" name="radio1"/>{' '}
                                                Particulier
                                            </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup check>
                                            <Label check>
                                                <Input onChange= {this.handleAnnonceType} value="professional" type="radio" name="radio1" />{' '}
                                                Professionnel
                                            </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            {this.state.annonceType == 'professional' && 
                                <FormGroup row>
                                    <Col sm={12}>
                                    <Input type="text" onChange={this.handleInputChange} name="title" id="title_id" placeholder="N° siret" />
                                    </Col>
                                </FormGroup>
                            }
                        <FormGroup row>
                            <Col sm={12}>
                            <Input type="text" name="lastname"  placeholder="Nom" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                            <Input type="text" name="firstnamename"  placeholder="Prénom" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                            <Input type="text" name="email"  placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                            <Input type="text" name="username"  placeholder="Nom d'utilisateur" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                            <Input type="text" name="password"  placeholder="Mot de passe" />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                            <div className="register_botton">
                            <Button>Envoyer</Button>
                            </div>
                        </FormGroup>
                    </Form>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={7}>
                        <div className="register_image">
                            <img src={regiter_picture}></img>
                        </div>
                    </Col>
                </Row>
        )
    }
}


export default Register;