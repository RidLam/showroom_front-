
import React , { Component } from 'react';
import moment from 'moment';

import './Categorie.css';

class CategorieContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annonces: [],
            favorite: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nexProps, nextState) {
        if(nexProps.annonces) {
            this.setState({
                annonces: nextProps.annonces
            })
        }
    }

    render() {
        return(
            <div className="tab-pane" id="tab6">
                        <div className="sch-product-list">

                            {annonces.length > 0 && annonces.map(annonce =>{
                                return(
                                    <div className="list-annonce">
                                        <div className="sch-product-item">
                                            <Row>
                                                <Col xs={4}>
                                                        {annonce.images.length ?
                                                          <div className="sch-product-images">
                                                              <img className="sch-img-1" src={base_urrl + annonce.images[0].path} />
                                                                <div className="sch-product-new-label">
                                                                <span>
                                                                {annonce.images.length} <FontAwesomeIcon icon="image"/> 
                                                                </span>
                                                                </div>
                                                          </div>
                                                        :
                                                        <div className="sch-product-images">
                                                            <img className="sch-img-1" src={noImage} />
                                                        </div>  
                                                        }
                                                </Col>
                                                <Col xs={8}>
                                                <div className="sch-product-info">
                                                        <Row>
                                                            <Col xs={9}>
                                                                <div className="sch-title">
                                                                  <a onClick={() => this.annonceDetail(annonce)}>{annonce.title}</a> 
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div className="sch-favorite">
                                                                   {this.state.favorite.indexOf(annonce.id) >= 0 ?
                                                                     <FaHeart onClick={() =>this.handleFavorite(annonce, 'delete')} size="1.1em"/> :  <FaRegHeart onClick={() =>this.handleFavorite(annonce, 'add')} size="1.2em"/> 
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="sch-price">
                                                            {annonce.price} €
                                                        </div>
                                                        <div className="sch-name-description">
                                                            <Row>
                                                            <span>
                                                                {annonce.commune.nom_complet} | {annonce.commune.code_postal}
                                                                </span>
                                                            </Row>
                                                            <Row>
                                                                <div className="sch-description">
                                                                    {annonce.categorie.name} 
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div className="sch-description">
                                                                    {moment(annonce.createdAt).format('l')} à {moment(annonce.createdAt).format('LT')}
                                                                </div>
                                                            </Row>
                                                        </div>
                                                    
                                                    </div>
                                                </Col>
                                            </Row>
                                        
                                        
                                        </div>
                                    </div>
                                )
                            })}
                            {/* {annonces && annonces.length == 0 && 
                            this.props.history.push('/notResultFound')
                            } */}
                            
                        
                    </div>
                </div>
        )
    }
}

export default CategorieContainer;