import React , { Component } from 'react';
import './404.css';
import kid_crying from '../../Assets/images/kid_crying.png';
import { Container,Col, Row, Button} from 'reactstrap';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return(
            <Container>
                <div className="page_not_found_countainer">
                <Row>
                    <Col xs={6}>
                        <div className="not_found_text_container">
                            <div className="not_found_text_content">
                                <strong>OOOPS! PAGE INTROUVABLE</strong><br/>
                                <Button className="btn_save"> Retour à la page d'accueil</Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                    <div className="bg_page_not_found"> 
          
                    </div>
                    </Col>
                </Row>
                </div>
                
            </Container>
           
        )
    }
}

export default NotFound;


