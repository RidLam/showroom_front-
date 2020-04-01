import React , {Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logo from '../../../Assets/images/logo.png';
import './footer.css';


class Footer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <footer className="container-fluid bg-light">
                <div className="divider-space-sm" />
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className="footer_left">
                                    <div className="logo-footer">

                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="footer_right">
                                    <h6><a routerlink="mentions">Mentions légales</a> | <a routerlink="rgpd">Données Personnelles</a></h6>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                <div className="divider-space-sm" />
            </footer>
        )
    }
}


export default Footer;