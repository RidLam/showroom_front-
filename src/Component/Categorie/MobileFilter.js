import React , { Component } from 'react';
import {Container , Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './MobileFilter.css';
import LoadAsyncSelect from '../Commons/Select/LoadAsyncSelect';


class MobileFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="mobile-filter">
                
                    <div className="mobile-filter-fields">
                    <Container>
                    <Form>
                        <Row>
                            <div className="filter-field">
                                <FormGroup>
                                    <Input type="text" name="email" id="exampleEmail" placeholder="Que chercher vous ?" />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="filter-field">
                                <FormGroup>
                                    <Label for="exampleEmail">Catégorie</Label>
                                    <Input type="select">
                                        <option>Default Select</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="filter-field">
                                <FormGroup>
                                    <Label for="exampleEmail">Localisation</Label>
                                  <LoadAsyncSelect/>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label for="exampleEmail">Prix min :</Label>
                                <Input type="number" name="email" id="exampleEmail" placeholder="Prix min" />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label for="exampleEmail">Prix max :</Label>
                                <Input type="number" name="email" id="exampleEmail" placeholder="Prix max" />
                            </FormGroup>
                        </Row>
                        <Row>
                            <div className="filter-field">
                                <FormGroup>
                                    <Label for="exampleEmail">Trier par :</Label>
                                    <Input type="select">
                                        <option>Default Select</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </Row>
                    </Form>
                        </Container>
                    </div>
                    <div className="mobile-filter-footer">
                            <Button className="btn btn-save">Search</Button>
                    </div>
                    
                
            </div>
        )
    }
}


export default MobileFilter;

