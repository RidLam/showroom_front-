import React , { Component } from 'react';
import './noResultFound.css';
import kid_crying from '../../Assets/images/kid_crying.jpg';
import { Container,Col, Row, Button} from 'reactstrap';

class NoResultFound extends Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
    }
    back() {
        this.props.history.push('/annonces/search');
    }

    render() {
        return(
            <Container>
                <div className="">
                <Row>
                    <Col xs={6}>
                        <div className="not_result_found_text_container">
                            <div className="not_result_found_text_content">
                                <strong>Cette article n'est malheureusement pas disponible</strong><br/>
                                <p>Penser à vérifier l'orthographe</p>
                                <Button className="btn_save" onClick={() => this.back()}> Retour à la page recherche</Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                    <div className="bg_page_not_result_found"> 
          
                    </div>
                    </Col>
                </Row>
                </div>
            </Container>
           
        )
    }
}

export default NoResultFound;