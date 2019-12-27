import React , { Component } from 'react';
import './noResultFound.css';
import notFound from '../../Assets/images/baby_crying.png';

class NoResultFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var text = "Vous avez pas encore des favoris";
        return(
           <div className="no_result">
               <div className="content">
                    <img src={notFound}></img>
                    <h3>{text}</h3>
               </div>
           </div>
        )
    }
}

export default NoResultFound;