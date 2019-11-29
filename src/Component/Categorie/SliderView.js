import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slideView.css";
import paca from '../../Assets/images/paca.png';
import pays_de_la_loire from '../../Assets/images/pays-de-la-loire.png';
import corse from '../../Assets/images/corse.png';
import outre_mer from '../../Assets/images/outre-mer.png';
import bretagne from '../../Assets/images/bretagne.png';


class SliderView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item : [1,2,3,4,5,6,7,8,9]
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      pauseOnHover: true,
      autoplay: false
    };
    return (
      <div className="">
        <h2> Latest annonces</h2>
        <Slider {...settings}>

          {this.state.item.map(item => {
            return(
              <div className="wrapper">
                <div className="card radius shadowDepth1">
                  <div className="card__image border-tlr-radius">
                    <img src={paca} alt="image" className="border-tlr-radius" />
                  </div>
                  <div className="card__content card__padding">
                    <div className="card__share">
                      <div className="card__social">  
                        <a className="share-icon facebook" href="#"><span className="fa fa-facebook" /></a>
                        <a className="share-icon twitter" href="#"><span className="fa fa-twitter" /></a>
                        <a className="share-icon googleplus" href="#"><span className="fa fa-google-plus" /></a>
                      </div>
                      <a id="share" className="share-toggle share-icon" href="#" />
                    </div>
                    <article className="card__article">
                      <h4><a href="#">titre de l'annonce</a></h4>
                      <p>Info annonce and adresse</p>
                    </article>
                  </div>
                  <div className="card__action">
                    <div className="card__author">
                    
                      <div className="card__author-content">
                        By <a href="#">user name</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
          })}
          
        </Slider>
      </div>
    );
  }
}


export default SliderView;