import React from 'react';
import categorieSlid from '../../Assets/images/categorie-vetement.jpg'
import './AnnonceCard.css';

export const HeadSlider = ({}) => {
    return(
        <div id="head-slider">
            <img src={categorieSlid}></img>
            <div id="head-slider-title">
                <strong>All Categories</strong>
                <p>Il y a actuellement <span>90</span> en ligne.</p>
            </div>
        </div>
    )
}