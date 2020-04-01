import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { Button, ButtonGroup } from 'reactstrap';
import './myAnnonces.css';
import { GET_MYANNONCE } from '../Commons/reducers/annonce/MyAnnonceActions';
import NoResultFound from '../notFound/NoResultFound';
import { FaRegEye } from 'react-icons/fa';

class MyAnnonce extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var user = this.props.userDetails.user;
        if(user) {
            this.props.getMyAnnonces(user.id);
        }
    }

    render() {
        var myAnnonces = this.props.myAnnonces;
        var base_url = "http://localhost:3000/";
        
        

          const CustomColumn = (rowData) => <span>
            <img src="https://picsum.photos/100/100"></img>
          </span>;
          const CustomColumnView = (rowData) => <div><span>89</span> <FaRegEye color="#000" size="1.2em"/></div>;
          const CustomColumnAction = (row) => <div className="myannonce_btn_block"><ButtonGroup>
            <Button className="btn_save">Supperimer</Button>
        </ButtonGroup></div>
        return(
          <div className="myAnnonce_block">
             <div className="categorie-slide">
                    <div className="categorie-slide-title">
                        <span>
                            <strong>Mes annonces</strong>
                            <p>Vous avez  <span>{myAnnonces && myAnnonces.length}</span> annonces.</p>
                        </span>
                    </div>
                </div>
            <Container>
                
                {myAnnonces && myAnnonces.length > 0  &&
                  <Griddle 
                    data={myAnnonces}
                    useGriddleStyles={true}
                    tableClassName="table" 
                    showFilter={false}
                    showSettings={false} 
                  >
                    <RowDefinition>
                      <ColumnDefinition id="id" title="Image"  customComponent={CustomColumn} />
                      <ColumnDefinition id="title" />
                      <ColumnDefinition id="decsription" />
                      <ColumnDefinition id="Nombre de vue" title="Nombre de vue"  customComponent={CustomColumnView}/>
                      <ColumnDefinition id="Actions" customComponent={CustomColumnAction} />
                    </RowDefinition>
                  </Griddle>
                }
                {myAnnonces && !myAnnonces.length &&
                    <NoResultFound
                        text="Vous avez pas des annonces"
                    />
                }
            </Container>
          </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        myAnnonces : state.annonceReducer.myAnnonces,
        userDetails : state.userDetailReducer.userDetails
    }
  }
const mapDispatchToProps = function(dispatch) {
    return {
        getMyAnnonces: user_id => dispatch({type: GET_MYANNONCE, action: {user_id}}),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAnnonce);