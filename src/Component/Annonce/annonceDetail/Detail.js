import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from './Breadcrumb';
import moment from 'moment';
import ImageSliderCard from './ImageSliderCard';
import { Row, Col, Container } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const  Detail = ({ annonce, contactUSer, messageSent, message, success, closeOpenModal, isOpen, messageSentFunc, userStore }) => {
  const classes = useStyles();

  return (
    <Container className="annonce-detail">
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                {annonce && 
                    <Breadcrumb 
                        annonce={annonce}
                    />
                }
            </Grid>
            <Grid item xs={12} md={9}>
                    {message  &&
                        <Alert variant="filled" severity={success ? "success" : "error"}>
                            {message}
                        </Alert>
                    }
                {annonce && 
                    <ImageSliderCard 
                        annonce={annonce}
                    />
                }
            </Grid>
            <Grid item xs={12} md={3}>
                <SideBar 
                    annonce={annonce}
                    contactUSer={contactUSer}
                    messageSent={messageSent}
                    closeOpenModal={closeOpenModal}
                    isOpen={isOpen}
                    messageSentFunc={messageSentFunc}
                    userStore={userStore}
                />
            </Grid>
            <Grid item xs={9} sm={9}>
                {annonce.description}
            </Grid>
            <Grid item xs={9} sm={9}>
            test
            </Grid>
        </Grid>
    </Container>
  );
}


export default  Detail;