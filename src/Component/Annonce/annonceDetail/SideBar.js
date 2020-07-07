import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import card from '../../../Assets/images/categories/jeux.jpg';
import profile from '../../../Assets/images/profile/pf1.jpg';
import ContactModal from './ContactModal';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function clicked() {
    props.clicked('test data');
}

export default function SideBar({ annonce, contactUSer, messageSent, closeOpenModal, isOpen, messageSentFunc, userStore }) {
  const classes = useStyles();
  var [openModal, setOpenModal] = useState(false);
  const contactSeller = () =>{
    messageSent = false;
    closeOpenModal();
  }

  return (
    <div className="sidebar">
        <div className="sidebar-header">
            <div className="sidebar-image">
              <img src={card}></img>
              <div className="sidebar-profile">
                <img src={profile}></img>
              </div>
            </div>
        </div>
        <div className="sidebar-body">
            <div className="sidebar-profile-name">
              <h5><a onClick={() => userStore(annonce.user)}>{annonce.user.username}</a></h5>
            </div>
            <div className="sidebar-btn-contact">
              <Button onClick={() => contactSeller()} color="primary">Envoyer un email</Button>
            </div>
            <div className="sidebar-btn-favoris">
              <Button className="btn btn-save" color="primary">Add to favoris</Button>
            </div>
        </div>
        <div className="sidebar-footer">

        </div>
        <ContactModal 
          annonce={annonce}
          contactUSer={contactUSer}
          messageSent={messageSent}
          closeOpenModal={closeOpenModal}
          isOpen={isOpen}
          messageSentFunc={messageSentFunc}

        />
    </div>
  );
}
